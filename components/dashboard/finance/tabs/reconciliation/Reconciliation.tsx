"use client";

import { ReUseAbleTable } from "@/components/shared/reusableTable";
import { DUMMY_RECONCILIATION_DATA } from "./data";
import { reconciliationColumns } from "./reconciliationColumns";
import { Clock, Download } from "lucide-react";
import { useMemo, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export function Reconciliation() {
  const reconciliationData = DUMMY_RECONCILIATION_DATA;
  const [filterTime, setFilterTime] = useState("all");

  const filteredData = useMemo(() => {
    if (filterTime === "all") {
      return reconciliationData;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return reconciliationData.filter((item) => {
      const itemDate = new Date(item.createdDate);
      itemDate.setHours(0, 0, 0, 0);

      if (filterTime === "today") {
        return itemDate.getTime() === today.getTime();
      }

      if (filterTime === "week") {
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);
        return itemDate >= weekAgo && itemDate <= today;
      }

      if (filterTime === "month") {
        const monthAgo = new Date(today);
        monthAgo.setDate(monthAgo.getDate() - 30);
        return itemDate >= monthAgo && itemDate <= today;
      }

      return true;
    });
  }, [filterTime,reconciliationData]);

  const handleDownloadCSV = () => {
    // Convert data to CSV format
    const headers = [
      "Audit ID",
      "Ledger Balance",
      "Previous Balance",
      "Debit Finance",
      "Audit Status",
      "Verified By",
    ];
    const csvContent = [
      headers.join(","),
      ...filteredData.map((item) =>
        [
          item.auditId || "",
          item.formattedLedgerBalance || "",
          item.formattedPreviousBalance || "",
          item.formattedDebitFinance || "",
          item.auditStatus || "",
          item.verifiedBy || "",
        ].join(","),
      ),
    ].join("\n");

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `reconciliation-report-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  return (
    <div className="w-full space-y-6">
      <div className="w-full flex items-start justify-between">
        <div className="px-5 pt-3">
          <h2 className="text-xl font-semibold text-gray-900">
            Reconciliation
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Track investor yield payments and returns
          </p>
        </div>
        <div className="flex items-center justify-end gap-3 px-5">
          <Button
            onClick={handleDownloadCSV}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download Full Reconciliation Report (CSV)
          </Button>

          <Select value={filterTime} onValueChange={setFilterTime}>
            <SelectTrigger className="rounded-sm items-center bg-white border-[#E5E7EB] h-9 w-40">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#6B7280]" />
                <SelectValue placeholder="All Time" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <ReUseAbleTable
        data={filteredData}
        columns={reconciliationColumns}
        entityName="reconciliation items"
      />
    </div>
  );
}
