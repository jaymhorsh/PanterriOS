"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AllTransactions } from "./tabs/all-transactions/AllTransactions";
import { WithdrawalRequests } from "./tabs/withdrawal-requests/WithdrawalRequests";
import { Reconciliation } from "./tabs/reconciliation/Reconciliation";
import { YieldEvents } from "./tabs/yield-events/YieldEvents";
import { PageHead, StatCard, StatCardSkeleton } from "@/components/shared";
import { Wallet, Users2, TrendingUp, Clock, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { DUMMY_RECONCILIATION_DATA } from "./tabs/reconciliation/data";
import { type WalletFinanceSummary } from "@/interface";
import { FinanceStats } from "./types";
import { InvestorsWallet } from "./tabs/investors-wallet/InvestorsWallet";
import { formatCurrency } from "@/utils/helpers";

const iconMap = {
  Wallet,
  Users: Users2,
  TrendingUp,
  Clock,
};

export function FinanceContainer() {
  const [activeTab, setActiveTab] = useState("all-transactions");
  const [allTransactionsCount] = useState(0);
  const [withdrawalCount] = useState(0);
  const [yieldCount] = useState(0);
  const [investorWalletCount] = useState(0);
  const [summary] = useState<WalletFinanceSummary | undefined>();

  // Badge color mapping for each tab
  const badgeColors: Record<string, string> = {
    "all-transactions": "text-blue-600 bg-blue-100",
    "withdrawal-requests": "text-orange-600 bg-orange-100",
    reconciliation: "text-purple-600 bg-purple-100",
    "yield-events": "text-green-600 bg-green-100",
    "investors-wallet": "text-sky-600 bg-sky-100",
  };

  // Create tabs with dynamic counts
  const tabs = [
    {
      title: "All Transactions",
      value: "all-transactions",
      count: activeTab === "all-transactions" ? allTransactionsCount : 0,
      content: <AllTransactions />,
    },
    {
      title: "Withdrawal Requests",
      value: "withdrawal-requests",
      count: activeTab === "withdrawal-requests" ? withdrawalCount : 0,
      content: <WithdrawalRequests />,
    },

    {
      title: "Reconciliation",
      value: "reconciliation",
      count:
        activeTab === "reconciliation" ? DUMMY_RECONCILIATION_DATA.length : 0,
      content: <Reconciliation />,
    },
    {
      title: "Yield Events",
      value: "yield-events",
      count: activeTab === "yield-events" ? yieldCount : 0,
      content: <YieldEvents />,
    },
    {
      title: "Investors Wallet",
      value: "investors-wallet",
      count: activeTab === "investors-wallet" ? investorWalletCount : 0,
      content: <InvestorsWallet />,
    },
  ];

  const FINANCE_STATS: FinanceStats[] = [
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
      {/* Stats Section */}
      <PageHead
        pageTitle="Wallet and Finance"
        subTitle="Manage platform finances and transactions"
      >
        <Button
          variant={"outline"}
          className="border-black border-2 gap-2 rounded-sm"
        >
          <Download /> Export CSV
        </Button>
      </PageHead>
      <div className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
        {!summary ? (
          <StatCardSkeleton />
        ) : (
          FINANCE_STATS.map((stat, i) => {
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
          })
        )}
      </div>

      {/* Tab Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full ">
        <div className="-mx-1 overflow-x-auto pb-2">
          <TabsList className="inline-flex min-w-max bg-gray-100 border mt-3 mb-5 rounded-md group-data-[orientation=horizontal]/tabs:h-11 border-border h-auto gap-2 px-2 py-1 sm:px-4 w-max">
            {tabs.map((tab, i) => (
              <TabsTrigger
                value={tab.value}
                key={i}
                onClick={() => setActiveTab(tab.value)}
                className="relative flex h-9 items-center gap-2 whitespace-nowrap rounded-md border-0 bg-transparent px-3 py-2 text-sm font-medium text-gray-700 transition-all data-[state=active]:bg-white data-[state=active]:text-black sm:px-4"
              >
                {tab.title}
                {tab.count > 0 && (
                  <Badge
                    className={`rounded-sm px-2 py-1 ${badgeColors[tab.value]}`}
                  >
                    {tab.count}
                  </Badge>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* Tab Content */}
        {tabs.map((tab, i) => (
          <TabsContent key={i} value={tab.value}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
