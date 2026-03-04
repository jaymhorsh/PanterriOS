"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AllTransactions } from "./tabs/all-transactions/AllTransactions";
import { WithdrawalRequests } from "./tabs/withdrawal-requests/WithdrawalRequests";
import { Reconciliation } from "./tabs/reconciliation/Reconciliation";
import { YieldEvents } from "./tabs/yield-events/YieldEvents";
import { StatCard } from "@/components/shared";
import { FINANCE_STATS } from "./data";
import { Wallet, Users2, TrendingUp, Clock } from "lucide-react";

const iconMap = {
  Wallet,
  Users: Users2,
  TrendingUp,
  Clock,
};

export function FinanceContainer() {
  const [activeTab, setActiveTab] = useState("all-transactions");

  // Create tabs with dynamic counts
  const tabs = [
    {
      title: "All Transactions",
      value: "all-transactions",
      count: 3,
      content: <AllTransactions  />,
    },
    {
      title: "Withdrawal Requests",
      value: "withdrawal-requests",
      count: 5,
      content: <WithdrawalRequests />,
    },
    {
      title: "Reconciliation",
      value: "reconciliation",
      count: 0,
      content: <Reconciliation />,
    },
    {
      title: "Yield Events",
      value: "yield-events",
      count: 1,
      content: <YieldEvents />,
    },
  ];

  return (
    <div className="w-full space-y-6 px-0">
      {/* Stats Section */}
      <div className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
        {FINANCE_STATS.map((stat, i) => {
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

      {/* Tab Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="inline-flex bg-transparent border rounded-full group-data-[orientation=horizontal]/tabs:h-12 border-border my-4  h-auto gap-2 px-4 w-fit">
          {tabs.map((tab, i) => (
            <TabsTrigger
              value={tab.value}
              key={i}
              onClick={() => setActiveTab(tab.value)}
              className="relative py-2 flex items-center h-8 px-4 text-sm font-medium text-gray-700 rounded-full bg-transparent border-0 transition-all data-[state=active]:bg-gray-900 data-[state=active]:text-white hover:bg-gray-100 data-[state=active]:hover:bg-gray-900 whitespace-nowrap"
            >
              {tab.title}
              {tab.count > 0 && (
                <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-semibold text-white bg-blue-600 rounded-full">
                  {tab.count}
                </span>
              )}
            </TabsTrigger>
          ))}
        </TabsList>

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
