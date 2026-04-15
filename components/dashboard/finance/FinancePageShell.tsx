"use client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { PageHead, StatCard } from "@/components/shared";
import { formatCurrency } from "@/utils/helpers";
import { Wallet, Users2, TrendingUp, Clock, Download } from "lucide-react";
import { type WalletFinanceSummary } from "@/interface";

interface FinancePageShellProps {
  title: string;
  subtitle: string;
  
  children: ReactNode;
}

export function FinancePageShell({
  title,
  subtitle,
  
  children,
}: FinancePageShellProps) {
  return (
    <div className="w-full space-y-6 px-0">
      <PageHead pageTitle={title} subTitle={subtitle}>
        <Button
          variant="outline"
          className="border-black border-2 gap-2 rounded-sm"
        >
          <Download className="h-4 w-4" /> Export CSV
        </Button>
      </PageHead>

      {children}
    </div>
  );
}
