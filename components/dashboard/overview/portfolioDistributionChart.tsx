'use client';

import { PortfolioDistributionSkeleton } from '@/components/shared';
import { ChevronDown } from 'lucide-react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { useRetrieveDashboardPortfolioOverview } from '@/hook/dashboard';

export interface PortfolioDistributionItem {
  name: string;
  value: number;
  color: string;
}

const filters = [
  {
    label: 'By Location',
    value: 'location',
  },
  {
    label: 'By Category',
    value: 'category',
  },
  {
    label: 'By Size',
    value: 'size',
  },
];

const chartColors = [
  '#2A61E8',
  '#8B5CE6',
  '#AFAFAF',
  '#FFC23A',
  '#08C74F',
  '#D32027',
];

export function PortfolioDistributionChart() {
  const [selectedFilter, setSelectedFilter] = useState('category');
  const { data, isLoading } = useRetrieveDashboardPortfolioOverview({
    distribution: selectedFilter,
  });

  const chartData: PortfolioDistributionItem[] =
    data?.data.distribution.items.map((item, index) => ({
      name: item.label,
      value: item.value,
      color: chartColors[index % chartColors.length],
    })) ?? [];

  const totalAssets =
    data?.data.summary.totalAssets ??
    chartData.reduce((sum, item) => sum + item.value, 0);

  if (isLoading || !data) {
    return <PortfolioDistributionSkeleton />;
  }

  return (
    <div className="rounded-lg border border-[#E9EDF5] bg-white p-5 l">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-1">
          <h3 className="text-2xl font-bold tracking-[-0.03em] text-[#18233A]">
            {data?.data.summary.title ?? 'Portfolio distribution'}
          </h3>
          <p className=" text-[#6B7A99]">
            {data?.data.summary.subtitle ?? 'Total asset distribution'}
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex w-fit items-center justify-between rounded-lg bg-[#4C5C77] px-7 py-3 text-left text-white shadow-sm "
            >
              <div>
                <div className="text-xs uppercase tracking-[0.16em] text-white/80">
                  Distribution
                </div>
                <div className="mt-1 font-semibold capitalize">
                  by {selectedFilter}
                </div>
              </div>
              <ChevronDown className="" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              {filters.map((filter, i) => (
                <DropdownMenuLabel
                  key={i}
                  onClick={() => setSelectedFilter(filter.value)}
                >
                  {filter.label}
                </DropdownMenuLabel>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="mx-auto mt-4 h-[360px] max-w-[560px] ">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius="64%"
              outerRadius="88%"
              paddingAngle={1.5}
              stroke="#FFFFFF"
              strokeWidth={3}
            >
              {chartData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) => {
                if (typeof value !== 'number') return '';
                return `${((value / totalAssets) * 100).toFixed(1)}%`;
              }}
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;

                const item = payload[0].payload as PortfolioDistributionItem;
                const percentage = ((item.value / totalAssets) * 100).toFixed(
                  1,
                );

                return (
                  <div className="rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 ">
                    <p className="text-xs font-medium uppercase tracking-[0.08em] text-[#98A2B3]">
                      {item.name}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[#18233A]">
                      {item.value} assets
                    </p>
                    <p className="text-sm text-[#155DFC]">
                      {percentage}% share
                    </p>
                  </div>
                );
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="-mt-[260px] flex justify-center ">
        <div className="flex h-[160px] w-[160px] flex-col items-center justify-center rounded-full bg-white text-center sm:h-[190px] sm:w-[190px]">
          <div className="text-lg font-semibold text-[#344054] sm:text-[22px]">
            Total Assets
          </div>
          <div className="mt-2 text-xl lg:text-3xl font-bold leading-none tracking-[-0.04em] text-[#18233A] ">
            {totalAssets}
          </div>
        </div>
      </div>

      <div className="mt-[140px] grid gap-x-10 gap-y-6 sm:grid-cols-2 xl:grid-cols-3">
        {chartData.map((item) => {
          const percentage = totalAssets
            ? ((item.value / totalAssets) * 100).toFixed(1)
            : '0.0';

          return (
            <div key={item.name} className="flex items-center gap-4">
              <span
                className="h-4 w-4 rounded-full"
                style={{ backgroundColor: item.color }}
              />

              <div>
                <div className=" leading-tight text-[#4C6488]">{item.name}</div>
                <div className=" font-bold leading-tight text-[#18233A]">
                  {percentage}%
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
