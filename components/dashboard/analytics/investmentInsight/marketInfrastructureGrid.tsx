'use client';

import { useMemo, useState } from 'react';
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
} from 'recharts';

import { cn } from '@/lib/utils';

import {
  type InfrastructureProject,
  type MarketShare,
} from '@/interface/analytics';
import { formatCurrencyValue } from '@/utils/helpers';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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

export function MarketInfrastructureGrid({
  MarketShareData,
  InfrastructureData,
  activeCity,
  onCityChange,
}: {
  MarketShareData: MarketShare[];
  InfrastructureData: InfrastructureProject[];
  activeCity?: InfrastructureLocation;
  onCityChange?: (city: InfrastructureLocation) => void;
}) {
  const [localCity, setLocalCity] = useState<InfrastructureLocation>(
    activeCity ?? 'Lagos',
  );

  const currentCity = activeCity ?? localCity;

  const filteredMarketShare = useMemo(
    () => MarketShareData.filter((item) => item.city === currentCity),
    [MarketShareData, currentCity],
  );

  const filteredInfrastructure = useMemo(() => {
    return InfrastructureData.filter((item) => item.city === currentCity).sort(
      (a, b) => b.estimatedValueNgnBillions - a.estimatedValueNgnBillions,
    );
  }, [InfrastructureData, currentCity]);

  const pieChartData = filteredMarketShare.map((item) => ({
    ...item,
    name: item.subMarket,
    value: item.marketShareSelectionPercent,
  }));

  const infrastructureChartData = filteredInfrastructure.map((item) => ({
    ...item,
    value: item.estimatedValueNgnBillions,
    label: formatCurrencyValue(item.estimatedValueNgn),
  }));

  return (
    <section>
      <div className="mx-auto max-w-[85%] md:pt-">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold font-archivo tracking-tight lg:text-4xl">
            Active Infrastructure Projects By City
          </h2>
        </div>

        <div className="grid gap-6 px-2 sm:px-6 lg:grid-cols-2 lg:px-0 ">
          {/* Infrastructure Chart */}
          <Card className="overflow-hidden col-span-2 pt-0 rounded-xl border border-[#E6E6E6] bg-white">
            <div className="border-b border-[#E5E7EB] py-4 px-2">
              <div className=" flex w-full justify-center px-4 sm:px-6 lg:px-0">
                <div className="inline-flex items-end gap-2 rounded-md border border-[#E5E5E5] bg-white p-0.5 text-right">
                  {tabs.map((tab) => {
                    const isActive = currentCity === tab;

                    return (
                      <Button
                        key={tab}
                        type="button"
                        variant="ghost"
                        onClick={() => {
                          setLocalCity(tab);
                          onCityChange?.(tab);
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
              </div>
            </div>

            <div className="h-[620px] w-full py-4 px-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={infrastructureChartData}
                  margin={{
                    top: 10,
                    right: 200,
                    left: 30,
                    bottom: 10,
                  }}
                  barCategoryGap={26}
                >
                  <defs>
                    <linearGradient
                      id="infrastructureBar"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="0"
                    >
                      <stop offset="0%" stopColor="#DBEAFE" />
                      <stop offset="100%" stopColor="#5B8DEF" />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    horizontal={true}
                    vertical={false}
                    stroke="#E5E7EB"
                    strokeDasharray="4 4"
                  />

                  <XAxis
                    type="number"
                    tickLine={false}
                    axisLine={false}
                    tick={{
                      fill: '#9CA3AF',
                      fontSize: 14,
                    }}
                    tickFormatter={(value) => `${value}B`}
                  />

                  <YAxis
                    type="category"
                    dataKey="projectName"
                    width={260}
                    tickLine={false}
                    axisLine={false}
                    tick={{
                      fill: '#8B8B8B',
                      fontSize: 14,
                    }}
                  />

                  <Tooltip
                    cursor={{ fill: 'transparent' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload[0]) {
                        const data = payload[0].payload;
                        return (
                          <div className="rounded-lg border border-[#E5E7EB] bg-white p-3 shadow-lg">
                            <p className="text-sm font-normal text-[#111827]">
                              {data.projectName}
                            </p>
                            <p className="text-sm font-normal text-[#6B7280]">
                              Type:{' '}
                              <span className="font-medium text-[#111827]">
                                {data.projectType}
                              </span>
                            </p>
                            <p className="text-sm font-normal text-[#6B7280]">
                              Value:{' '}
                              <span className="font-medium text-[#2563EB]">
                                {formatCurrencyValue(data.estimatedValueNgn)}
                              </span>
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />

                  <Bar
                    dataKey="value"
                    radius={[0, 8, 8, 0]}
                    fill="url(#infrastructureBar)"
                    barSize={40}
                  >
                    <LabelList
                      dataKey="label"
                      position="right"
                      className="fill-[#2563EB]"
                      fontSize={14}
                      fontWeight={500}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Market Share */}
          <div className="mt-10 space-y-4">
            <div className="inline-flex items-end w-fit gap-2 rounded-md border border-[#E5E5E5] bg-white p-0.5 text-right">
              {tabs.map((tab) => {
                const isActive = currentCity === tab;

                return (
                  <Button
                    key={tab}
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setLocalCity(tab);
                      onCityChange?.(tab);
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
            <Card className="overflow-hidden col-span-2 pt-0 rounded-xl border border-[#E6E6E6] bg-white">
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
                        {pieChartData.map((entry, index) => (
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
                  {filteredMarketShare.map((item, index) => (
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
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MarketInfrastructureGrid;
