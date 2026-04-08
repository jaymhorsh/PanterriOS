"use client";

import { useState } from "react";
import { AllTransactions, FinancePageShell } from "@/components/dashboard/finance";
import { type WalletFinanceSummary } from "@/interface";

export default function TransactionsPage() {
  const [summary, setSummary] = useState<WalletFinanceSummary | undefined>();

  return (
    <FinancePageShell
      title="Wallet and Finance"
      subtitle="Manage platform finances and transactions"
      summary={summary}
    >
      <AllTransactions
        onCountChange={(_, nextSummary) => {
          if (nextSummary) setSummary(nextSummary);
        }}
      />
    </FinancePageShell>
  );
}