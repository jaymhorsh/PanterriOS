"use client";

import { useEffect, useMemo, useState } from "react";
import { ReUseAbleTable } from "@/components/shared/reusableTable";
import { TableSkeleton } from "@/components/shared/loader";
import { withdrawalColumns } from "./withdrawalColumns";
import { useRetrieveWithdrawalApprovals } from "@/hook/wallet-finance";
import { TableFilters } from "@/components/shared/TableFilters";
import {
  type WalletFinanceSummary,
  type WithdrawalApprovalStatusFilter,
  type WithdrawalApprovalRiskProfileFilter,
} from "@/interface";
import { Check, Shield } from "lucide-react";
import { debounce } from "@/utils/helpers";

export function WithdrawalRequests({
  onCountChange,
}: {
  onCountChange?: (count: number, summary?: WalletFinanceSummary) => void;
}) {
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterRisk, setFilterRisk] = useState("all");
  const [page, setPage] = useState(1);

  const debouncedSetSearch = useMemo(
    () => debounce((val: string) => setDebouncedSearchValue(val), 600),
    [],
  );

  const status = filterStatus === "all" ? undefined : filterStatus;
  const riskProfile = filterRisk === "all" ? undefined : filterRisk;

  const { data, isLoading } = useRetrieveWithdrawalApprovals({
    page,
    limit: 20,
    status: status as WithdrawalApprovalStatusFilter,
    riskProfile: riskProfile as WithdrawalApprovalRiskProfileFilter,
    search: debouncedSearchValue || undefined,
  });
  useEffect(() => {
    onCountChange?.(data?.pagination?.totalItems ?? 0, data?.summary);
  }, [data?.pagination?.totalItems, data?.summary, onCountChange]);

  return (
    <div className="w-full space-y-6">
      <TableFilters
        searchValue={searchValue}
        onSearchChange={(val) => {
          setSearchValue(val);
          setPage(1);
          debouncedSetSearch(val);
        }}
        searchPlaceholder="Search by investor, request ID..."
        title="Pending Withdrawal Approvals"
        subtitle="Review and action investor withdrawal requests"
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
              { label: "All Status", value: "all" },
              { label: "Pending", value: "pending" },
              { label: "Processing", value: "processing" },
              { label: "Approved", value: "approved" },
              { label: "Rejected", value: "rejected" },
            ],
          },
          {
            id: "riskProfile",
            label: "All Risk",
            value: filterRisk,
            onChange: (val) => {
              setFilterRisk(val);
              setPage(1);
            },
            icon: <Shield className="h-4 w-4 text-[#6B7280]" />,
            options: [
              { label: "All Risk", value: "all" },
              { label: "Low Risk", value: "low_risk" },
              { label: "Medium Risk", value: "medium_risk" },
              { label: "High Risk", value: "high_risk" },
            ],
          },
        ]}
      />

      {isLoading ? (
        <TableSkeleton rows={6} columns={7} />
      ) : (
        <ReUseAbleTable
          data={data?.data ?? []}
          columns={withdrawalColumns}
          entityName="Withdrawal requests"
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
