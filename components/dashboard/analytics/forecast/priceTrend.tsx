'use client';

import { useMemo, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useAnalyticsPriceTrend } from '@/hook/analytics';
import { Button } from '@/components/ui/button';
import { AreaChartSkeleton } from '@/components/shared/loader/chartLoader';

export interface Location {
  city: string;
  area: string[];
}

const locations: Location[] = [
  {
    city: 'Lagos',
    area: [
      'Lekki',
      'Oniru',
      'Victoria Island',
      'Ikoyi',
      'Magodo Phase II',
      'Surulere',
      'Yaba',
      'Ikeja GRA',
    ],
  },
  {
    city: 'Abuja',
    area: [
      'Maitama',
      'Apo',
      'Jabi',
      'Lugbe',
      'Wuse 2',
      'Gwarinpa',
      'Katampe',
      'Utako',
      'Wuye',
    ],
  },
  {
    city: 'Port Harcourt',
    area: [
      'Old GRA',
      'GRA 3',
      'Rumuogba',
      'GRA 1',
      'Elenlewo',
      'GRA 2',
      'Peter Odili',
      'Woji',
      'Presidential Housing',
      'Stadium road',
    ],
  },
];

export default function PriceTrend() {
  const [selectedCity, setSelectedCity] = useState<string>(
    locations?.[0]?.city ?? '',
  );

  const {
    data: vacancyResponse,
    isLoading,
    error,
  } = useAnalyticsPriceTrend({
    page: 1,
    per_page: 30,
    all: false,
    city: selectedCity,
  });

  const chartData = useMemo(() => {
    if (!vacancyResponse?.data.length) {
      return [];
    }

    return vacancyResponse.data.map((point) => ({
      year: `${point.month} ${point.year}`,
      value: point.averageRentInMillions,
      area: point.area,
      city: point.city,
    }));
  }, [vacancyResponse]);

  const [chartHeight, setChartHeight] = useState<number>(480);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    function updateSize() {
      const w = window.innerWidth;
      if (w < 640) {
        setChartHeight(260);
        setIsMobile(true);
      } else if (w < 1024) {
        setChartHeight(340);
        setIsMobile(false);
      } else {
        setChartHeight(480);
        setIsMobile(false);
      }
    }

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8 max-sm:max-w-xs sm:max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-archivo font-bold tracking-tight sm:leading-11 lg:text-4xl">
            The market is filling up, here’s the proof
          </h2>

          <p className="mt-0.5 text-sm font-normal text-[#767676] ">
            Vacancy rates have moved across every area since 2016
          </p>
        </div>

        {/* Chart Container */}
        <div className="rounded-lg border border-gray-200 bg-white">
          {/* Header with Title and Controls */}
          <div className="flex max-sm:flex-col max-sm:gap-4 max-sm:items-start  items-center justify-between border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-[#121212]">
              Vacancy rates across cities
            </h2>

            <div className="inline-flex items-end gap-2 rounded-md border border-[#E5E5E5] bg-white p-0.5 text-right">
              {locations.map((location) => {
                const isActive = selectedCity === location.city;

                return (
                  <Button
                    key={location.city}
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setSelectedCity(location.city);
                    }}
                    className={cn(
                      'h-9 rounded-md px-5 text-sm font-medium text-[#767676] hover:bg-transparent',
                      isActive &&
                        'border border-[#E7E6EB] bg-[#fafafa] font-semibold text-[#111111] hover:bg-white',
                    )}
                  >
                    {location.city}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Chart with Recharts */}
          <div className="px-2 py-10">
            {isLoading && <AreaChartSkeleton />}
            {!isLoading && error && (
              <p className="pb-3 text-center text-sm text-red-500">
                Unable to load chart data.
              </p>
            )}
            {!isLoading && chartData.length === 0 ? (
              <div
                style={{ height: chartHeight }}
                className="flex items-center justify-center"
              >
                <p className="text-center text-sm text-[#6B7280]">
                  No chart data available in {selectedCity}
                </p>
              </div>
            ) : (
              !isLoading &&
              !error &&
              chartData.length > 0 && (
                <div style={{ height: chartHeight }}>
                  <ResponsiveContainer width="100%" height={chartHeight}>
                    <AreaChart
                      data={chartData}
                      margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                    >
                      <defs>
                        <linearGradient
                          id="vacancyFill"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#155DFC"
                            stopOpacity={0.24}
                          />
                          <stop
                            offset="90%"
                            stopColor="#155DFC"
                            stopOpacity={0.02}
                          />
                        </linearGradient>
                      </defs>

                      <CartesianGrid
                        vertical={false}
                        stroke="#EEF2F7"
                        strokeDasharray="4 4"
                      />

                      <XAxis
                        dataKey="year"
                        axisLine={{ stroke: '#E6E9ED' }}
                        padding={{
                          left: isMobile ? 10 : 30,
                          right: isMobile ? 10 : 30,
                        }}
                        tickMargin={5}
                        tickLine={false}
                        tick={{
                          fill: '#000000',
                          fontSize: isMobile ? 11 : 13,
                          fontWeight: 500,
                        }}
                        dy={12}
                      />

                      <YAxis
                        axisLine={{ stroke: '#E6E9ED' }}
                        tickLine={false}
                        width={isMobile ? 60 : 70}
                        tick={{
                          fill: '#000000',
                          fontSize: isMobile ? 11 : 13,
                          fontWeight: 500,
                        }}
                        tickMargin={10}
                        tickFormatter={(value) => `${value}%`}
                      />

                      <Tooltip
                        cursor={{ stroke: '#D0D5DD', strokeDasharray: '4 4' }}
                        content={({ active, payload }) => {
                          if (!active || !payload?.length) {
                            return null;
                          }

                          const item = payload[0].payload as {
                            year: string;
                            value: number;
                            area: string;
                            city: string;
                          };

                          return (
                            <div className="rounded-md border border-[#E5E7EB] bg-white px-3 py-2 shadow-lg">
                              <p className="mb-1 text-[11px] font-medium uppercase tracking-[0.16em] text-[#98A2B3]">
                                {item.city} - {item.area}
                              </p>
                              <p className="text-sm font-semibold text-[#155DFC]">
                                {item.year}
                              </p>
                              <p className="text-sm font-medium text-[#344054]">
                                {item.value}% vacancy rate
                              </p>
                            </div>
                          );
                        }}
                      />

                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#155DFC"
                        strokeWidth={1}
                        fill="url(#vacancyFill)"
                        dot={false}
                        activeDot={{
                          r: 6,
                          fill: '#155DFC',
                          stroke: '#FFFFFF',
                          strokeWidth: 2,
                        }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
