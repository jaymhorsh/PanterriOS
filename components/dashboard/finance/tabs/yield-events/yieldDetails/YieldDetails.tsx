"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Check, Home } from "lucide-react";
import {
  PageHead,
  ReUseAbleTable,
  StatCard,
  TableFilters,
} from "@/components/shared";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { InvestmentDetailsSkeleton } from "@/components/shared/loader/InvestmentDetailsSkeleton";
import { debounce, formatCurrency } from "@/utils/helpers";
import { useRetrieveYieldDisbursementLedger } from "@/hook/wallet-finance";
import { yieldDetailsColumns } from "./detailsColumn";

type YieldFilter = "all" | "pending" | "flagged" | "disbursed";

export default function YieldEventDetailPage() {
  const params = useParams();
  const eventId = String(params.id || "");
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  const [filter, setFilter] = useState<YieldFilter>("all");

  const debouncedSetSearch = useMemo(
    () => debounce((value: string) => setDebouncedSearchValue(value), 600),
    [],
  );

  const { data, isLoading } = useRetrieveYieldDisbursementLedger(eventId, {
    search: debouncedSearchValue || undefined,
  });

  const detail = data?.data;
  const statusBreakdown = detail?.statusBreakdown;

  const investors = useMemo(() => {
    const filteredInvestors = detail?.investors ?? [];

    return filteredInvestors.filter((investor) => {
      const matchesFilter = filter === "all" || investor.status === filter;

      return matchesFilter;
    });
  }, [detail?.investors, filter]);

  const stats = [
    {
      label: "Property Name",
      value: detail?.investmentName || "-",
      description: `Event ID: ${detail?.eventId || eventId}`,
      color: "text-gray-900",
    },
    {
      label: "Status",
      value: detail?.status === "partial" ? "Partial" : (detail?.status ?? "-"),
      description: "Yield disbursement status",
      color: "text-gray-900",
    },
    {
      label: "Total Payout",
      value: formatCurrency(detail?.totalPayout ?? 0),
      description: `${detail?.yieldRate ?? 0}% yield rate`,
      color: "text-gray-900",
    },
    {
      label: "Participating Investors",
      value: detail?.totalParticipatingInvestors ?? 0,
      description: "Included in this batch",
      color: "text-gray-900",
    },
  ];

  if (isLoading) {
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
            <BreadcrumbPage>
              {detail?.investmentName || "Yield Event"}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <PageHead
        pageTitle={detail?.investmentName || "Yield Event Details"}
        subTitle={`Yield event ${detail?.eventId || eventId}`}
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
        <TableFilters
          search
          searchValue={searchValue}
          onSearchChange={(value) => {
            setSearchValue(value);
            debouncedSetSearch(value);
          }}
          searchPlaceholder="Search..."
          filters={[
            {
              id: "status",
              label: "All Status",
              value: filter,
              onChange: (value) => setFilter(value as YieldFilter),
              icon: <Check className="h-4 w-4 text-[#6B7280]" />,
              options: [
                {
                  label: `All (${(statusBreakdown?.pending ?? 0) + (statusBreakdown?.flagged ?? 0) + (statusBreakdown?.disbursed ?? 0)})`,
                  value: "all",
                },
                {
                  label: `Pending (${statusBreakdown?.pending ?? 0})`,
                  value: "pending",
                },
                {
                  label: `Flagged (${statusBreakdown?.flagged ?? 0})`,
                  value: "flagged",
                },
                {
                  label: `Disbursed (${statusBreakdown?.disbursed ?? 0})`,
                  value: "disbursed",
                },
              ],
            },
          ]}
        />
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
