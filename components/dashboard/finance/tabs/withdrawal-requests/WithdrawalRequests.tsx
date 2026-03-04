"use client";

import { ReUseAbleTable } from "@/components/shared/reusableTable";
import { DUMMY_WITHDRAWAL_REQUESTS } from "./withdrawalData";
import { withdrawalColumns } from "./withdrawalColumns";

export function WithdrawalRequests() {
  return (
    <div className="w-full border-t border-l border-r rounded-md space-y-6">
      {/* Title and Subtitle */}
      <div className="px-5 pt-3">
        <h2 className="text-xl font-semibold text-gray-900">
          Pending Withdrawal Approvals
        </h2>
        <p className="text-gray-600 text-sm mt-1">
          Track investor yield payments and returns
        </p>
      </div>

      {/* Table */}
      <ReUseAbleTable
        data={DUMMY_WITHDRAWAL_REQUESTS}
        columns={withdrawalColumns}
        entityName="withdrawal requests"
      />
    </div>
  );
}
