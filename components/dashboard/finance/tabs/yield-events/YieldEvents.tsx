"use client";

import { ReUseAbleTable } from "@/components/shared/reusableTable";
import { DUMMY_TRANSACTIONS } from "../../data";
import { transactionColumns } from "../all-transactions/transactionColumns";

export function YieldEvents() {
  // Filter for yield type transactions
  const yieldData = DUMMY_TRANSACTIONS.filter((t) => t.type === "Yield");

  return (
    <div className="w-full space-y-6">
      <ReUseAbleTable
        data={yieldData}
        columns={transactionColumns}
        entityName="yield events"
      />
    </div>
  );
}
