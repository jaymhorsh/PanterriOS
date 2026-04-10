import { Button } from "@/components/ui/button";
import { DrawerClose } from "@/components/ui/drawer";
import { StatusBadge, TransactionAuditSkeleton } from "@/components/shared";
import { useRetrieveWithdrawalRequestDetails } from "@/hook/wallet-finance";
import { CheckCircle2 } from "lucide-react";

export function WithdrawalRequestDetails({ requestId }: { requestId: string }) {
  const { data, isLoading, error } =
    useRetrieveWithdrawalRequestDetails(requestId);

  const walletDetails = data;

  if (isLoading) return <TransactionAuditSkeleton />;

  if (error)
    return (
      <div className="p-5 text-sm text-red-500">
        Failed to load withdrawal request details.
      </div>
    );

  return (
    <div className="mx-auto w-full max-w-2xl flex h-full flex-col bg-[#F9FAFB]">
      
      {/* HEADER */}
      <div className="px-3 py-3 sm:px-5 sm:pt-5 sm:pb-3 border-b bg-white flex-shrink-0">
        <h2 className="text-sm sm:text-base font-semibold text-gray-900">
          Withdrawal Status
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Track the current state of this transaction
        </p>
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto px-3 py-4 sm:px-5 sm:py-5 space-y-3 sm:space-y-5">
        <div className="rounded-xl border bg-white p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <p className="text-xs text-gray-500">Current Status</p>
            <p className="text-xs sm:text-sm font-medium text-gray-900 mt-1">
              {walletDetails?.statusLabel}
            </p>
          </div>
          <div className="flex-shrink-0">
            <StatusBadge status={walletDetails?.statusLabel || ""} showDot />
          </div>
        </div>

        
        <div className="rounded-xl border bg-white p-3 sm:p-4 space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 pb-2 sm:pb-0 sm:border-b">
            <span className="text-xs sm:text-sm text-gray-500">Reference</span>
            <span className="text-xs sm:text-sm font-medium text-gray-900 break-all">
              {walletDetails?.reference || "-"}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 pb-2 sm:pb-0 sm:border-b">
            <span className="text-xs sm:text-sm text-gray-500">Provider Status</span>
            <span className="text-xs sm:text-sm font-medium text-green-600">
              {walletDetails?.providerStatus || "-"}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 pb-2 sm:pb-0 sm:border-b">
            <span className="text-xs sm:text-sm text-gray-500">
              Provider Transaction Ref
            </span>
            <span className="text-xs sm:text-sm font-medium text-gray-900 break-all">
              {walletDetails?.providerTransactionReference || "-"}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <span className="text-xs sm:text-sm text-gray-500">Payout Initiated</span>
            <span className="text-xs sm:text-sm font-medium text-gray-900">
              {walletDetails?.payoutInitiatedAt || "-"}
            </span>
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">Audit Trail</h3>
          <div className="space-y-3 sm:space-y-4">
            {walletDetails?.auditTrail?.map((event, index) => (
              <div key={index} className="flex items-start gap-2 sm:gap-3">
                <div className="mt-0.5 sm:mt-1 flex-shrink-0">
                  <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base font-semibold text-gray-900 break-words">{event.title}</p>
                  <p className="text-xs sm:text-sm text-gray-600 mt-0.5">{event.dateTime}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

     
      <div className="border-t bg-white px-3 py-3 sm:px-4 sm:pt-4 sm:pb-5 flex-shrink-0">
        <DrawerClose asChild>
          <Button className="h-10 sm:h-11 w-full rounded-md text-xs sm:text-sm bg-[#0B1533] text-white hover:bg-[#0B1533]/90">
            Close
          </Button>
        </DrawerClose>
      </div>
    </div>
  );
}