"use client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { PageHead, StatCard } from "@/components/shared";
import { formatCurrency } from "@/utils/helpers";
import { Wallet, Users2, TrendingUp, Clock, Download } from "lucide-react";
import { type WalletFinanceSummary } from "@/interface";

const iconMap = {
  Wallet,
  Users: Users2,
  TrendingUp,
  Clock,
};

interface FinancePageShellProps {
  title: string;
  subtitle: string;
  summary?: WalletFinanceSummary;
  children: ReactNode;
}

export function FinancePageShell({
  title,
  subtitle,
  summary,
  children,
}: FinancePageShellProps) {
  const stats = [
    {
      label: "Total Balance",
      value: formatCurrency(summary?.totalBalance || 0),
      description: "As of today",
      icon: "Wallet",
      color: "text-gray-900",
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      label: "Active Wallets",
      value: summary?.activeVaults || 0,
      description: "Investor wallets",
      icon: "Users",
      color: "text-gray-900",
      iconColor: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      label: "Total Yields Disbursed",
      value: summary?.totalYieldsDisbursed || 0,
      description: "Year to date",
      icon: "TrendingUp",
      color: "text-gray-900",
      iconColor: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      label: "Pending Withdrawals",
      value: summary?.pendingWithdrawals.amount || 0,
      description: `${summary?.pendingWithdrawals.count || 0} requests`,
      icon: "Clock",
      color: "text-gray-900",
      iconColor: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <div className="w-full space-y-6 px-0">
      <PageHead pageTitle={title} subTitle={subtitle}>
        <Button variant="outline" className="border-black border-2 gap-2 rounded-sm">
          <Download className="h-4 w-4" /> Export CSV
        </Button>
      </PageHead>

      <div className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
        {stats.map((stat, i) => {
          const IconComponent = iconMap[stat.icon as keyof typeof iconMap];

          return (
            <StatCard
              key={i}
              label={stat.label}
              value={stat.value}
              description={stat.description}
              Icon={IconComponent}
              iconColor={stat.iconColor}
              bgColor={stat.bgColor}
              color={stat.color}
            />
          );
        })}
      </div>

      {children}
    </div>
  );
}
