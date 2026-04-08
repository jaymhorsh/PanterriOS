"use client";

import { useState } from "react";
import { WithdrawalRequests, FinancePageShell } from "@/components/dashboard/finance";
import { type WalletFinanceSummary } from "@/interface";

export default function WithdrawalRequestPage() {
  const [summary, setSummary] = useState<WalletFinanceSummary | undefined>();

  return (
    <FinancePageShell
      title="Wallet and Finance"
      subtitle="Review and process withdrawal requests"
      summary={summary}
    >
      <WithdrawalRequests
        onCountChange={(_, nextSummary) => {
          if (nextSummary) setSummary(nextSummary);
        }}
      />
    </FinancePageShell>
  );
}