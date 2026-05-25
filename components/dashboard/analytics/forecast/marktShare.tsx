'use client';
import { Button } from '@/components/ui/button';
import { useAnalyticsOverview } from '@/hook/analytics';
import { cn } from '@/lib/tiptap-utils';
import { useMemo, useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const tabs = ['Lagos', 'Abuja', 'Port Harcourt'] as const;

type InfrastructureLocation = (typeof tabs)[number];

const marketShareColors: Record<string, string> = {
  Residential: '#8A38F5',
  Administrative: '#36A2EB',
  Office: '#FFCE56',
  Retail: '#4bC0C0',
  'Industrial/Warehousing': '#00A63E',
  Hospitality: '#FF9F40',
  Healthcare: '#BB2222',
  Other: '#999999',
};

function getMarketShareColor(subMarket: string, index: number) {
  return marketShareColors[subMarket];
}

export function MarktShare() {
  const { data, isLoading } = useAnalyticsOverview({});
  const [city, setCity] = useState<InfrastructureLocation>('Lagos');

  const MarketShareData = data?.data.marketShare;

  const filteredMarketShare = useMemo(
    () => MarketShareData?.filter((item) => item.city === city),
    [MarketShareData, city],
  );
  const pieChartData = filteredMarketShare?.map((item) => ({
    ...item,
    name: item.subMarket,
    value: item.marketShareSelectionPercent,
  }));
  return (
    <div className="mt-10 space-y-4">
      <div className="inline-flex items-end w-fit gap-2 rounded-md border border-[#E5E5E5] bg-white p-0.5 text-right">
        {tabs.map((tab) => {
          const isActive = city === tab;

          return (
            <Button
              key={tab}
              type="button"
              variant="ghost"
              onClick={() => {
                setCity(tab);
              }}
              className={cn(
                'h-9 rounded-md px-5 text-sm font-medium text-[#767676] hover:bg-transparent',
                isActive &&
                  'border border-[#E7E6EB] bg-[#fafafa] font-semibold text-[#111111] hover:bg-white',
              )}
            >
              {tab}
            </Button>
          );
        })}
      </div>
      <div className="overflow-hidden col-span-2 pt-0 rounded-xl border border-[#E6E6E6] bg-white">
        <div className="px-6 pt-4 ">
          <h3 className="text-2xl font-semibold text-center font-archivo tracking-tight">
            Market Share by Property Type
          </h3>
        </div>

        <div className="px-4 pb-5 pt-2 sm:px-6">
          <div className="mx-auto h-[380px] max-w-[460px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius="48%"
                  outerRadius="80%"
                  paddingAngle={2}
                  stroke="none"
                >
                  {pieChartData?.map((entry, index) => (
                    <Cell
                      key={entry._id ?? `${entry.subMarket}-${index}`}
                      fill={getMarketShareColor(entry.subMarket, index)}
                    />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value, name) => [`${value}%`, name]}
                  contentStyle={{
                    borderRadius: '10px',
                    borderColor: '#E5E7EB',
                    boxShadow: '0 12px 24px rgba(17, 24, 39, 0.08)',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid gap-5 px-2 pt-1 sm:grid-cols-2">
            {filteredMarketShare?.map((item, index) => (
              <div
                key={item._id ?? `${item.subMarket}-${index}`}
                className="flex items-center justify-between gap-10 text-[15px] text-[#1C1C1C]"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    className="h-4 w-4 rounded-full"
                    style={{
                      backgroundColor: getMarketShareColor(
                        item.subMarket,
                        index,
                      ),
                    }}
                  />

                  <span className="truncate text-sm font-normal">
                    {item.subMarket}
                  </span>
                </div>

                <span className="text-sm font-semibold">
                  {item.marketShareSelectionPercent}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
