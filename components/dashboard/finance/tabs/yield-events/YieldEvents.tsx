"use client";

import { useEffect, useMemo, useState } from "react";
import { ReUseAbleTable } from "@/components/shared/reusableTable";
import { transactionColumns } from "../all-transactions/transactionColumns";
import { useYieldDisbursements } from "@/hook/wallet-finance";
import { TableSkeleton } from "@/components/shared/loader";
import {
  type WalletFinanceSummary,
  type WalletFinanceTransaction,
} from "@/interface";

function mapYieldRows(
  data: {
    reference: string;
    investorId: number;
    investorName: string;
    amount: number;
    disbursedDate: string;
    status: string;
  }[],
): WalletFinanceTransaction[] {
  return data.map((item, index) => ({
    id: index + 1,
    reference: item.reference,
    investorId: item.investorId,
    investorName: item.investorName,
    type: "yield",
    amount: item.amount,
    dateTime: item.disbursedDate,
    status: item.status.toLowerCase() as WalletFinanceTransaction["status"],
    description: "Yield disbursement",
  }));
}

export function YieldEvents({
  onCountChange,
}: {
  onCountChange?: (count: number, summary?: WalletFinanceSummary) => void;
}) {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useYieldDisbursements({ page, limit: 20 });

  useEffect(() => {
    onCountChange?.(data?.pagination.totalItems ?? 0, data?.summary);
  }, [data?.pagination.totalItems, data?.summary, onCountChange]);
  
  const yieldRows = useMemo(() => mapYieldRows(data?.data ?? []), [data?.data]);

  return (
    <div className="w-full space-y-6">
      {isLoading ? (
        <TableSkeleton rows={6} columns={7} />
      ) : (
        <ReUseAbleTable
          data={yieldRows}
          columns={transactionColumns}
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
