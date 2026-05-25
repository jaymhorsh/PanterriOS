'use client';

import { useMemo, useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';

import { TableSkeleton } from '@/components/shared/loader/TableSkeleton';
import { ReUseAbleTable } from '@/components/shared/reusableTable';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAnalyticsInvestmentScore } from '@/hook/analytics';
import { InvestmentScore } from '@/interface';
import { cn } from '@/lib/utils';

type CityKey = 'Lagos' | 'Abuja' | 'Port Harcourt';
type DemandLevel = 'Low' | 'Medium' | 'High' | 'Very High';
type RiskLevel = 'Low' | 'Medium' | 'High';

interface SubmarketRankingRow {
  id: string;
  rank: number;
  submarket: string;
  sample: string;
  investmentScore: number;
  expectedRoi: number;
  riskLevel: RiskLevel;
  demand: DemandLevel;
}

const cityTabs: CityKey[] = ['Lagos', 'Abuja', 'Port Harcourt'];

const demandBadgeClasses: Record<DemandLevel, string> = {
  Low: 'border-[#FECACA] bg-[#FEF2F2] text-[#DC2626]',
  Medium: 'border-[#FDE68A] bg-[#FFFBEB] text-[#CA8A04]',
  High: 'border-[#BFDBFE] bg-[#EFF6FF] text-[#2563EB]',
  'Very High': 'border-[#ABF5C8] bg-[#ECFDF3] text-[#16A34A]',
};

const riskBadgeClasses: Record<RiskLevel, string> = {
  Low: 'border-[#ABF5C8] bg-[#ECFDF3] text-[#16A34A]',
  Medium: 'border-[#FDE68A] bg-[#FFFBEB] text-[#CA8A04]',
  High: 'border-[#FECACA] bg-[#FEF2F2] text-[#DC2626]',
};

function MetricBadge({ label, tone }: { label: string; tone: string }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        'rounded-md px-3 py-1 text-sm font-medium shadow-none',
        tone,
      )}
    >
      {label}
    </Badge>
  );
}

function normalizeRiskLevel(value: string): RiskLevel {
  if (value === 'Low' || value === 'Medium' || value === 'High') {
    return value;
  }

  return 'Medium';
}

function normalizeDemandLevel(value: string): DemandLevel {
  if (value === 'Low' || value === 'Medium' || value === 'High') {
    return value;
  }

  if (
    value.toLowerCase() === 'very high' ||
    value.toLowerCase() === 'very_high'
  ) {
    return 'Very High';
  }

  return 'Medium';
}

function resolvePaginationValue(
  primary?: number,
  fallback?: number,
  defaultValue = 1,
) {
  if (typeof primary === 'number' && primary > 0) return primary;
  if (typeof fallback === 'number' && fallback > 0) return fallback;
  return defaultValue;
}

export function SubmarketRankings() {
  const [activeCity, setActiveCity] = useState<CityKey>('Lagos');
  const [page, setPage] = useState(1);

  const { data, isLoading } = useAnalyticsInvestmentScore({
    page,
    per_page: 10,
    city: activeCity,
  });

  const rows = useMemo<SubmarketRankingRow[]>(() => {
    const scores = data?.data ?? [];

    return scores.map((item: InvestmentScore, index) => ({
      id: item._id,
      rank: item.rank ?? index + 1,
      submarket: item.subMarket,
      sample: item.sampleAsset,
      investmentScore: typeof item.rank === 'number' ? item.rank : index + 1,
      expectedRoi: item.expectedReturnMax,
      riskLevel: normalizeRiskLevel(item.riskLevel),
      demand: normalizeDemandLevel(item.demandLevel),
    }));
  }, [data?.data]);

  const pagination = data?.meta?.pagination;
  const currentPage = resolvePaginationValue(
    pagination?.currentPage,
    Number(pagination?.current_page),
    page,
  );
  const totalPages = resolvePaginationValue(
    pagination?.totalPages,
    undefined,
    1,
  );
  const totalItems = resolvePaginationValue(
    pagination?.totalItems,
    pagination?.total_count,
    rows.length,
  );
  const limit = resolvePaginationValue(
    pagination?.limit,
    pagination?.per_page,
    10,
  );

  const columns = useMemo<ColumnDef<SubmarketRankingRow>[]>(
    () => [
      {
        accessorKey: 'rank',
        header: 'Rank',
        cell: ({ row }) => (
          <span className="font-medium text-[#111827]">
            {row.original.rank}
          </span>
        ),
      },
      {
        accessorKey: 'submarket',
        header: 'Submarket',
        cell: ({ row }) => (
          <span className="font-medium text-[#111827]">
            {row.original.submarket}
          </span>
        ),
      },
      {
        accessorKey: 'sample',
        header: 'Sample',
        cell: ({ row }) => (
          <span className="text-[#111827]">{row.original.sample}</span>
        ),
      },
      {
        accessorKey: 'investmentScore',
        header: 'Investment Score',
        cell: ({ row }) => (
          <span className="font-medium text-[#111827]">
            {row.original.investmentScore}
          </span>
        ),
      },
      {
        accessorKey: 'expectedRoi',
        header: 'Expected ROI',
        cell: ({ row }) => (
          <span className="text-[#111827]">
            {row.original.expectedRoi.toFixed(1)}%
          </span>
        ),
      },
      {
        accessorKey: 'riskLevel',
        header: 'Risk Level',
        cell: ({ row }) => (
          <MetricBadge
            label={row.original.riskLevel}
            tone={riskBadgeClasses[row.original.riskLevel]}
          />
        ),
      },
      {
        accessorKey: 'demand',
        header: 'Demand',
        cell: ({ row }) => (
          <MetricBadge
            label={row.original.demand}
            tone={demandBadgeClasses[row.original.demand]}
          />
        ),
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: () => (
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="h-9 w-9 rounded-lg border border-transparent text-[#111827] hover:bg-[#F8FAFC]"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="h-9 w-9 rounded-lg border border-transparent text-[#FF2A2A] hover:bg-[#FFF1F1]"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ),
      },
    ],
    [],
  );

  return (
    <section className="space-y-6">
      <div className="overflow-hidden rounded-lg border border-[#DDE3EA] bg-white shadow-sm">
        <div className="flex flex-col gap-5 border-b border-[#E6EBF2] px-6 py-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold tracking-[-0.03em] text-[#0F172A] ">
              {activeCity} Submarket Performance Rankings
            </h2>
            <p className=" text-[#64748B]">
              Ranked by transaction volume and growth potential
            </p>
          </div>

          <div className="inline-flex w-full flex-wrap items-center gap-2 rounded-[20px] border border-[#D9E0E8] bg-white p-1.5 lg:w-auto lg:flex-nowrap">
            {cityTabs.map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => {
                  setActiveCity(city);
                  setPage(1);
                }}
                className={cn(
                  'rounded-lg px-4 py-2  font-medium transition-colors',
                  activeCity === city
                    ? 'border border-[#D8DEE6] bg-[#F8FAFC] text-[#111827] shadow-sm'
                    : 'text-[#6B7280] hover:text-[#111827]',
                )}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        <div className="px-6 py-6">
          {isLoading ? (
            <TableSkeleton rows={5} columns={8} />
          ) : (
            <ReUseAbleTable
              data={rows}
              columns={columns}
              entityName="submarket rankings"
              pagination={{
                currentPage,
                totalPages,
                totalItems,
                limit,
                onPageChange: setPage,
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
}
