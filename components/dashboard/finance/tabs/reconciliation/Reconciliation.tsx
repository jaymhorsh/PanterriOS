"use client";

import { ReUseAbleTable } from "@/components/shared/reusableTable";
import { DUMMY_RECONCILIATION_DATA } from "./data";
import { reconciliationColumns } from "./reconciliationColumns";
import { Clock, Download } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ReusableSelect } from "@/components/ui/ReusableSelect";

export function Reconciliation() {
  const reconciliationData = DUMMY_RECONCILIATION_DATA;
  const [filterTime, setFilterTime] = useState("all");

  let filteredData = reconciliationData;

  if (filterTime !== "all") {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    filteredData = reconciliationData.filter((item) => {
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
  }

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

          <div className="w-40">
            <ReusableSelect
              value={filterTime}
              onChange={setFilterTime}
              placeholder="All Time"
              icon={<Clock className="h-4 w-4 text-[#6B7280]" />}
              items={[
                { label: "All Time", value: "all" },
                { label: "Today", value: "today" },
                { label: "This Week", value: "week" },
                { label: "This Month", value: "month" },
              ]}
            />
          </div>
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
