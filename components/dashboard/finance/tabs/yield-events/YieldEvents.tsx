"use client";

import { useEffect, useState } from "react";
import { ReUseAbleTable } from "@/components/shared/reusableTable";
import { useYieldDisbursements } from "@/hook/wallet-finance";
import { TableSkeleton } from "@/components/shared/loader";
import { type WalletFinanceSummary } from "@/interface";
import { yieldColumns } from "./yieldColumns";

export function YieldEvents({
  onCountChange,
}: {
  onCountChange?: (count: number, summary?: WalletFinanceSummary) => void;
}) {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useYieldDisbursements({ page, limit: 20 });
  const tableData =  data?.data ?? [] ;

  useEffect(() => {
    onCountChange?.(
      data?.pagination?.totalItems ?? 0,
      data?.summary,
    );
  }, [
    data?.pagination?.totalItems,
    data?.summary,
    onCountChange,
  ]);

  return (
    <div className="w-full space-y-6">
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
