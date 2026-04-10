"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Home, Search } from "lucide-react";
import { PageHead, ReUseAbleTable, StatCard } from "@/components/shared";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { InvestmentDetailsSkeleton } from "@/components/shared/loader/InvestmentDetailsSkeleton";
import { formatCurrency } from "@/utils/helpers";
import { useRetrieveYieldDisbursementLedger } from "@/hook/wallet-finance";
import {
  DUMMY_YIELD_EVENT_DETAILS,
  getYieldEventDetailById,
} from "@/components/dashboard/finance/tabs/yield-events/detail-data";
import { cn } from "@/lib/utils";
import { yieldDetailsColumns } from "./detailsColumn";

type YieldFilter = "all" | "pending" | "flagged" | "disbursed";

export default function YieldEventDetailPage() {
  const params = useParams();
  const eventId = String(params.id || "");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<YieldFilter>("all");

  const { data, isLoading } = useRetrieveYieldDisbursementLedger(eventId);

  const detail = data?.data ?? getYieldEventDetailById(eventId) ?? DUMMY_YIELD_EVENT_DETAILS;

  const investors = useMemo(() => {
    return detail.investors.filter((investor) => {
      const matchesSearch =
        investor.investorName.toLowerCase().includes(search.toLowerCase()) ||
        investor.disbursementCode.toLowerCase().includes(search.toLowerCase());

      const matchesFilter = filter === "all" || investor.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [detail.investors, search, filter]);

  const stats = [
    {
      label: "Property Name",
      value: detail.investmentName,
      description: `Event ID: ${detail.eventId}`,
      color: "text-gray-900",
    },
    {
      label: "Status",
      value: detail.status === "partial" ? "Partial" : detail.status,
      description: "Yield disbursement status",
      color: "text-gray-900",
    },
    {
      label: "Total Payout",
      value: formatCurrency(detail.totalPayout),
      description: `${detail.yieldRate}% yield rate`,
      color: "text-gray-900",
    },
    {
      label: "Participating Investors",
      value: detail.totalParticipatingInvestors,
      description: "Included in this batch",
      color: "text-gray-900",
    },
  ];

  const filters: Array<{ value: YieldFilter; label: string; count: number }> = [
    {
      value: "all",
      label: "All",
      count:
        detail.statusBreakdown.pending +
        detail.statusBreakdown.flagged +
        detail.statusBreakdown.disbursed,
    },
    {
      value: "pending",
      label: "Pending",
      count: detail.statusBreakdown.pending,
    },
    {
      value: "flagged",
      label: "Flagged",
      count: detail.statusBreakdown.flagged,
    },
    {
      value: "disbursed",
      label: "Disbursed",
      count: detail.statusBreakdown.disbursed,
    },
  ];

    if (isLoading && !data) {
      return (
        <div className="w-full h-[80%] space-y-6">
          <InvestmentDetailsSkeleton />
        </div>
      );
    }

  return (
    <div className="w-full space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-1"
              >
                <Home className="h-4 w-4" />
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/finance/yield-events">Yield Events</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{detail.investmentName}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <PageHead
        pageTitle={detail.investmentName}
        subTitle={`Yield event ${detail.eventId}`}
      >
        <Button variant="outline" className="gap-2">
          Export CSV
        </Button>
      </PageHead>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            description={stat.description}
            color={stat.color}
          />
        ))}
      </div>

      <div className="rounded-xl bg-white space-y-4">
        {/* filter */}
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-2 rounded-md border bg-white px-3 py-2 lg:max-w-md w-full">
            <Search className="h-4 w-4 text-slate-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search investor or yield code..."
              className="h-8 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {filters.map((item) => {
              const active = filter === item.value;

              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setFilter(item.value)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors",
                    active
                      ? "border-slate-300 bg-slate-100 text-slate-900"
                      : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50",
                  )}
                >
                  {item.label}
                  <span className="rounded-full bg-white px-2 py-0.5 text-xs text-slate-600">
                    {item.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        {/* Table */}
        <div>
          <ReUseAbleTable
            columns={yieldDetailsColumns}
            data={investors}
            entityName="yield investors"
          />
        </div>
      </div>
    </div>
  );
}
