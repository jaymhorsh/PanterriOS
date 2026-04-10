"use client";
import { Button } from "@/components/ui/button";
import { Download, CheckCircle2, Section } from "lucide-react";
import { StatusBadge, TransactionAuditSkeleton } from "@/components/shared";
import { useRetrieveTransactionDetails } from "@/hook/wallet-finance";
import { DrawerClose } from "@/components/ui/drawer";
import { formatCurrency } from "@/utils/helpers";

export function TransactionAudit({ transactionId }: { transactionId: number }) {
  const { data, isLoading, error } =
    useRetrieveTransactionDetails(transactionId);

  const handleDownloadReceipt = () => {};

  if (isLoading) return <TransactionAuditSkeleton />;

  if (error)
    return (
      <div className="p-4 text-sm text-red-500">
        Failed to load transaction details.
      </div>
    );

  return (
    <div className="flex flex-col h-full w-full max-w-2xl mx-auto">
      <div className="flex-1 overflow-y-auto px-3 py-4 sm:px-4 sm:py-5 space-y-4 sm:space-y-6">
        {/* AMOUNT CARD */}
        <div className="border rounded-lg p-3 sm:p-4 bg-gray-50">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-4">
            <div>
              <p className="text-xs sm:text-sm text-gray-500">Transaction Amount</p>
              <p className="text-xl sm:text-2xl font-semibold text-gray-900 mt-1">
                {formatCurrency(data?.amount || 0)}
              </p>
            </div>

            <div className="flex-shrink-0">
              <p className="text-xs sm:text-sm text-gray-500 mb-1">Status</p>
              <StatusBadge status={data?.status || ""} />
            </div>
          </div>
        </div>

        {/* DETAILS */}
        <section className="space-y-3 sm:space-y-4">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900">
            Transaction Details
          </h3>

          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 block mb-1">Reference Number</p>
              <p className="text-sm sm:text-base font-semibold text-gray-900 break-all">
                {data?.reference}
              </p>
            </div>
          </div>

          {/* Date and Time Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="border bg-gray-100 rounded-lg p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-gray-600 block mb-1">Date</p>
              <p className="text-sm sm:text-base font-semibold text-gray-900">
                {data?.date}
              </p>
            </div>
            <div className="border bg-gray-100 rounded-lg p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-gray-600 block mb-1">Time</p>
              <p className="text-sm sm:text-base font-semibold text-gray-900">
                {data?.time}
              </p>
            </div>
          </div>

          {/* Investor Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 block mb-1">Investor Name</p>
              <p className="text-sm sm:text-base font-semibold text-gray-900 break-all">
                {data?.investorName}
              </p>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-600 block mb-1">
                Transaction Type
              </p>
              <p className="text-sm sm:text-base font-semibold text-gray-900">
                {data?.type}
              </p>
            </div>
          </div>
        </section>

        {/* Audit Trail Section */}
        <div className="space-y-3 sm:space-y-4">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">Audit Trail</h3>
          <div className="space-y-3 sm:space-y-4">
            {data?.auditTrail.map((event, index) => (
              <div key={index} className="flex items-start gap-2 sm:gap-3">
                <div className="mt-0.5 sm:mt-1 flex-shrink-0">
                  <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base font-semibold text-gray-900 break-words">
                    {event.title}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                    {event?.dateTime}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t bg-white px-3 py-3 sm:px-4 sm:py-4 flex-shrink-0">
        <div className="flex flex-col gap-2 sm:gap-3">
          <Button
            variant="outline"
            className="w-full h-10 sm:h-11 text-xs sm:text-sm flex items-center justify-center gap-2"
            onClick={handleDownloadReceipt}
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Download</span>
            <span className="sm:hidden">Download</span> Receipt
          </Button>
          <DrawerClose asChild>
            <Button
              className="w-full h-10 sm:h-11 text-xs sm:text-sm bg-gray-900 hover:bg-gray-800 text-white"
              onClick={() => console.log("Closing transaction audit")}
            >
              Close
            </Button>
          </DrawerClose>
        </div>
      </div>
    </div>
  );
}
