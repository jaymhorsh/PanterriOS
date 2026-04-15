"use client";

import { useMemo, useState } from "react";
import { ReUseAbleTable } from "@/components/shared/reusableTable";
import { useYieldDisbursements } from "@/hook/wallet-finance";
import { TableSkeleton } from "@/components/shared/loader";
import { type RetrieveYieldDisbursementsQuery } from "@/interface";
import { yieldColumns } from "./yieldColumns";
import { TableFilters } from "@/components/shared";
import { Check } from "lucide-react";
import { debounce } from "@/utils/helpers";

export function YieldEvents() {
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [page, setPage] = useState(1);

  const debouncedSetSearch = useMemo(
    () => debounce((val: string) => setDebouncedSearchValue(val), 600),
    [],
  );

  const status =
    filterStatus === "all"
      ? "all"
      : (filterStatus as NonNullable<RetrieveYieldDisbursementsQuery["status"]>);

  const { data, isLoading } = useYieldDisbursements({
    page,
    limit: 20,
    status,
    search: debouncedSearchValue || undefined,
  });

  const tableData = data?.data ?? [];

  return (
    <div className="w-full space-y-6">
      <TableFilters
        searchValue={searchValue}
        onSearchChange={(val) => {
          setSearchValue(val);
          setPage(1);
          debouncedSetSearch(val);
        }}
        searchPlaceholder="Search by event ID or property name..."
        title="Yield Disbursement Events"
        subtitle="Track investment yield disbursement and returns"
        filters={[
          {
            id: "status",
            label: "All Status",
            value: filterStatus,
            onChange: (val) => {
              setFilterStatus(val);
              setPage(1);
            },
            icon: <Check className="h-4 w-4 text-[#6B7280]" />,
            options: [
              { label: "All", value: "all" },
              { label: "Pending", value: "pending" },
              { label: "Disbursed", value: "disbursed" },
            ],
          },
        ]}
      />

      {isLoading ? (
        <TableSkeleton rows={6} columns={7} />
      ) : (
        <ReUseAbleTable
          data={tableData}
          columns={yieldColumns}
          entityName="yield events"
          pagination={
            data?.pagination
              ? {
                  currentPage: data.pagination.currentPage,
                  totalPages: data.pagination.totalPages,
                  totalItems: data.pagination.totalItems,
                  limit: data.pagination.limit,
                  onPageChange: setPage,
                }
              : undefined
          }
        />
      )}
    </div>
  );
}
