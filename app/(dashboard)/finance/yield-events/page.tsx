"use client";

import { useState } from "react";
import { FinancePageShell, YieldEvents } from "@/components/dashboard/finance";
import { type WalletFinanceSummary } from "@/interface";

export default function YieldEventPage() {
  const [summary, setSummary] = useState<WalletFinanceSummary | undefined>();

  return (
    <FinancePageShell
      title="Wallet and Finance"
      subtitle="Track investor yield disbursement events"
      summary={summary}
    >
      <YieldEvents
        onCountChange={(_, nextSummary) => {
          if (nextSummary) setSummary(nextSummary);
        }}
      />
    </FinancePageShell>
  );
}
