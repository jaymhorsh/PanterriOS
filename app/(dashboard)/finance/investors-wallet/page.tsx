"use client";

import { useState } from "react";
import { FinancePageShell, InvestorsWallet } from "@/components/dashboard/finance";
import { type WalletFinanceSummary } from "@/interface";

export default function InvestorWalletPage() {
  const [summary, setSummary] = useState<WalletFinanceSummary | undefined>();

  return (
    <FinancePageShell
      title="Wallet and Finance"
      subtitle="View investor wallet balances and statuses"
      summary={summary}
    >
      <InvestorsWallet
        onCountChange={(_, nextSummary) => {
          if (nextSummary) setSummary(nextSummary);
        }}
      />
    </FinancePageShell>
  );
}
