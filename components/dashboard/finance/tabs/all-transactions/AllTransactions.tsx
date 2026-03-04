"use client";

import { useMemo, useState } from "react";
import { ReUseAbleTable } from "@/components/shared/reusableTable";
import { DUMMY_TRANSACTIONS } from "../../data";
import { transactionColumns } from "./transactionColumns";
import { Transaction } from "../../types";
import { TableFilters } from "@/components/shared/TableFilters";
import { Calendar, Clock, Check } from "lucide-react";

function filterTransactions(
  transactions: Transaction[],
  searchValue?: string,
  filterType?: string,
  filterStatus?: string,
  filterTime?: string,
): Transaction[] {
  return transactions.filter((transaction) => {
    // Search filter
    if (searchValue && searchValue.trim()) {
      const lowerSearch = searchValue.toLowerCase();
      const matchesSearch =
        transaction.reference.toLowerCase().includes(lowerSearch) ||
        transaction.investor.toLowerCase().includes(lowerSearch) ||
        transaction.formattedAmount.toLowerCase().includes(lowerSearch);
      if (!matchesSearch) return false;
    }

    // Type filter
    if (filterType && filterType !== "all") {
      if (transaction.type !== filterType) return false;
    }

    // Status filter
    if (filterStatus && filterStatus !== "all") {
      if (transaction.status !== filterStatus) return false;
    }

    // Time filter (simple date-based filtering)
    if (filterTime && filterTime !== "all") {
      const today = new Date();
      const txnDate = new Date(transaction.date);

      switch (filterTime) {
        case "today":
          return txnDate.toDateString() === today.toDateString();
        case "week":
          const weekAgo = new Date(today);
          weekAgo.setDate(weekAgo.getDate() - 7);
          return txnDate >= weekAgo;
        case "month":
          const monthAgo = new Date(today);
          monthAgo.setMonth(monthAgo.getMonth() - 1);
          return txnDate >= monthAgo;
        default:
          return true;
      }
    }

    return true;
  });
}

export function AllTransactions() {
  const [searchValue, setSearchValue] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterTime, setFilterTime] = useState("all");

  const filteredData = useMemo(
    () =>
      filterTransactions(
        DUMMY_TRANSACTIONS,
        searchValue,
        filterType,
        filterStatus,
        filterTime,
      ),
    [searchValue, filterType, filterStatus, filterTime],
  );

  return (
    <div className="w-full space-y-6">
      <TableFilters
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        searchPlaceholder="Search..."
        title="All Transactions"
        subtitle="Track all financial transactions"
        filters={[
          {
            id: "type",
            label: "All Types",
            value: filterType,
            onChange: setFilterType,
            icon: <Calendar className="h-4 w-4 text-[#6B7280]" />,
            options: [
              { label: "All Types", value: "all" },
              { label: "Deposits", value: "Deposit" },
              { label: "Withdrawals", value: "Withdrawal" },
              { label: "Investments", value: "Investment" },
              { label: "Yields", value: "Yield" },
            ],
          },
          {
            id: "status",
            label: "All Status",
            value: filterStatus,
            onChange: setFilterStatus,
            icon: <Check className="h-4 w-4 text-[#6B7280]" />,
            options: [
              { label: "All Status", value: "all" },
              { label: "Completed", value: "Completed" },
              { label: "Pending", value: "Pending" },
              { label: "Processing", value: "Processing" },
              { label: "Rejected", value: "Rejected" },
            ],
          },
          {
            id: "time",
            label: "All Time",
            value: filterTime,
            onChange: setFilterTime,
            icon: <Clock className="h-4 w-4 text-[#6B7280]" />,
            options: [
              { label: "All Time", value: "all" },
              { label: "Today", value: "today" },
              { label: "This Week", value: "week" },
              { label: "This Month", value: "month" },
            ],
          },
        ]}
      />
      <ReUseAbleTable
        data={filteredData}
        columns={transactionColumns}
        entityName="transactions"
      />
    </div>
  );
}
