"use client";

import { useEffect, useMemo, useState } from "react";
import { ReUseAbleTable } from "@/components/shared/reusableTable";
import { transactionColumns } from "./transactionColumns";
import { TableFilters } from "@/components/shared/TableFilters";
import {
  Calendar,
  Clock,
  Check,
  Wallet,
  Users2,
  TrendingUp,
} from "lucide-react";
import {
  type WalletFinanceSummary,
  type WalletFinanceTimeRangeFilter,
  type WalletFinanceTransactionStatusFilter,
  type WalletFinanceTransactionTypeFilter,
} from "@/interface";
import { StatCard, StatCardSkeleton, TableSkeleton } from "@/components/shared";
import { useRetrieveWalletFinance } from "@/hook/wallet-finance";
import { debounce, formatCurrency } from "@/utils/helpers";

export function AllTransactions() {
  const [search, setSearch] = useState("");

  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filterType, setFilterType] =
    useState<WalletFinanceTransactionTypeFilter>("all");
  const [filterStatus, setFilterStatus] =
    useState<WalletFinanceTransactionStatusFilter>("all");
  const [filterTime, setFilterTime] =
    useState<WalletFinanceTimeRangeFilter>("all_time");
  const [page, setPage] = useState(1);

  const debouncedSetSearch = useMemo(
    () => debounce((val: string) => setDebouncedSearch(val), 600),
    [],
  );
  const { data, isLoading } = useRetrieveWalletFinance({
    page,
    limit: 10,
    type: filterType === "all" ? undefined : filterType,
    status: filterStatus === "all" ? undefined : filterStatus,
    timeRange: filterTime === "all_time" ? undefined : filterTime,
    search: debouncedSearch || undefined,
  });

  const transactionsData = data?.data;

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
    debouncedSetSearch(value);
  };
  const iconMap = {
    Wallet,
    Users: Users2,
    TrendingUp,
    Clock,
  };

  const stats = [
    {
      label: "Total Balance",
      value: formatCurrency(transactionsData?.summary?.totalBalance || 0),
      description: "As of today",
      icon: "Wallet",
      color: "text-gray-900",
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      label: "Active Vaults",
      value: transactionsData?.summary?.activeVaults || 0,
      description: "Investor vaults",
      status: "Active",
      icon: "Users",
      color: "text-gray-900",
      iconColor: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      label: "Total Yields Disbursed",
      value: transactionsData?.summary?.totalYieldsDisbursed || 0,
      description: "Year to date",
      icon: "TrendingUp",
      color: "text-gray-900",
      iconColor: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      label: "Pending Withdrawals",
      value: transactionsData?.summary?.pendingWithdrawals.amount || 0,
      description: `${transactionsData?.summary?.pendingWithdrawals.count || 0} requests`,
      icon: "Clock",
      color: "text-gray-900",
      iconColor: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
        {isLoading ? (
          <StatCardSkeleton />
        ) : (
          stats.map((stat, i) => {
            const IconComponent = iconMap[stat.icon as keyof typeof iconMap];

            return (
              <StatCard
                key={i}
                label={stat.label}
                value={stat.value}
                description={stat.description}
                status={stat.status}
                Icon={IconComponent}
                iconColor={stat.iconColor}
                bgColor={stat.bgColor}
                color={stat.color}
                loading={isLoading}
              />
            );
          })
        )}
      </div>
      <TableFilters
        searchValue={search}
        onSearchChange={handleSearchChange}
        searchPlaceholder="Search..."
        title="All Transactions"
        subtitle="Track all financial transactions"
        filters={[
          {
            id: "type",
            label: "All Types",
            value: filterType,
            onChange: (value) =>
              setFilterType(value as WalletFinanceTransactionTypeFilter),
            icon: <Calendar className="h-4 w-4 text-[#6B7280]" />,
            options: [
              { label: "All Types", value: "all" },
              { label: "Deposits", value: "deposit" },
              { label: "Withdrawals", value: "withdrawal" },
              { label: "Investments", value: "investment" },
              { label: "Yields", value: "yield" },
              { label: "Investment Opt Out", value: "investment_opt_out" },
            ],
          },
          {
            id: "status",
            label: "All Status",
            value: filterStatus,
            onChange: (value) =>
              setFilterStatus(value as WalletFinanceTransactionStatusFilter),
            icon: <Check className="h-4 w-4 text-[#6B7280]" />,
            options: [
              { label: "All Status", value: "all" },
              { label: "Completed", value: "completed" },
              { label: "Pending", value: "pending" },
              { label: "Processing", value: "processing" },
              { label: "Approved", value: "approved" },
              { label: "Rejected", value: "rejected" },
              { label: "Failed", value: "failed" },
            ],
          },
          {
            id: "time",
            label: "All Time",
            value: filterTime,
            onChange: (value: string) =>
              setFilterTime(value as WalletFinanceTimeRangeFilter),
            icon: <Clock className="h-4 w-4 text-[#6B7280]" />,
            options: [
              { label: "All Time", value: "all_time" },
              { label: "Today", value: "today" },
              { label: "This Week", value: "this_week" },
              { label: "This Month", value: "this_month" },
            ],
          },
        ]}
      />
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <ReUseAbleTable
          data={transactionsData?.data ?? []}
          columns={transactionColumns}
          entityName="transactions"
          pagination={
            transactionsData?.pagination
              ? {
                  currentPage: transactionsData.pagination.currentPage,
                  totalPages: transactionsData.pagination.totalPages,
                  totalItems: transactionsData.pagination.totalItems,
                  limit: transactionsData.pagination.limit,
                  onPageChange: setPage,
                }
              : undefined
          }
        />
      )}
    </div>
  );
}
