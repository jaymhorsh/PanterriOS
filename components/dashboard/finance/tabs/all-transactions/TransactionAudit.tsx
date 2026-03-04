"use client";

import { Transaction } from "../../types";
import { Button } from "@/components/ui/button";
import { Download, CheckCircle2 } from "lucide-react";
import { StatusBadge } from "@/components/shared";

interface TransactionAuditProps {
  transaction: Transaction;
}

export function TransactionAudit({ transaction }: TransactionAuditProps) {
  const detailItems = [
    { label: "Reference Number", value: transaction.reference },
    { label: "Investor Name", value: transaction.investor },
    { label: "Transaction Type", value: transaction.type },
  ];

  const dateTimeItems = [
    { label: "Date", value: transaction.date },
    { label: "Time", value: transaction.time },
  ];

  const auditEvents = [
    {
      title: "Transaction Initiated",
      timestamp: `${transaction.date} ${transaction.time}`,
      status: "completed",
    },
    {
      title: "Transaction Completed",
      timestamp: `${transaction.date} ${transaction.time}`,
      status: "completed",
    },
  ];

  const handleDownloadReceipt = () => {
    // TODO: Implement download receipt functionality
    console.log("Downloading receipt for:", transaction.reference);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto  p-6 space-y-6">
        {/* Amount and Status Section */}
        <div className="border bg-gray-100  border-border rounded-lg p-6">
          <div className="flex justify-between items-end gap-4">
            <div className="flex-1">
              <p className="text-gray-600 text-sm mb-2">Transaction Amount</p>
              <p className="text-4xl font-bold text-gray-900">
                {transaction.formattedAmount}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm mb-2">Status</p>
              <StatusBadge status={transaction.status} />
            </div>
          </div>
        </div>

        {/* Transaction Details Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Transaction Details
          </h3>

          <div className="grid grid-cols-1 gap-4">
            {detailItems.map((item) => (
              <div key={item.label} className="border border-border bg-gray-100 rounded-lg p-4">
                <label className="text-sm text-gray-600 block mb-1">
                  {item.label}
                </label>
                <p className="text-base font-semibold text-gray-900">
                  {item.value}
                </p>
              </div>
            ))}

            {/* Date and Time Grid */}
            <div className="grid grid-cols-2 gap-4">
              {dateTimeItems.map((item) => (
                <div key={item.label} className="border bg-gray-100 rounded-lg p-4">
                  <label className="text-sm text-gray-600 block mb-1">
                    {item.label}
                  </label>
                  <p className="text-base font-semibold text-gray-900">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Audit Trail Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Audit Trail</h3>
          <div className="space-y-4">
            {auditEvents.map((event, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="mt-1">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{event.title}</p>
                  <p className="text-sm text-gray-600">{event.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer with Actions */}
      <div className="border-t p-6 flex gap-3 bg-white">
        <Button
          variant="outline"
          className="flex-1 flex items-center justify-center gap-2 h-11 font-semibold"
          onClick={handleDownloadReceipt}
        >
          <Download className="h-4 w-4" />
          Download Receipt
        </Button>
        <Button
          className="flex-1 h-11 font-semibold bg-gray-900 hover:bg-gray-800 text-white"
          onClick={() => console.log("Closing transaction audit")}
        >
          Close
        </Button>
      </div>
    </div>
  );
}
