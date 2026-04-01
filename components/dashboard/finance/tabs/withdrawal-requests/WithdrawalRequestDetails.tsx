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
      <div className="px-5 pt-5 pb-3 border-b bg-white">
        <h2 className="text-base font-semibold text-gray-900">
          Withdrawal Status
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Track the current state of this transaction
        </p>
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
        <div className="rounded-xl border bg-white p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">Current Status</p>
            <p className="text-sm font-medium text-gray-900 mt-1">
              {walletDetails?.statusLabel}
            </p>
          </div>
          <StatusBadge status={walletDetails?.statusLabel || ""} showDot />
        </div>

        
        <div className="rounded-xl border bg-white p-4 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Reference</span>
            <span className="text-sm font-medium text-gray-900 text-right max-w-[60%] truncate">
              {walletDetails?.reference || "-"}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Provider Status</span>
            <span className="text-sm font-medium text-green-600">
              {walletDetails?.providerStatus || "-"}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              Provider Transaction Ref
            </span>
            <span className="text-sm font-medium text-gray-900 text-right max-w-[60%] truncate">
              {walletDetails?.providerTransactionReference || "-"}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Payout Initiated</span>
            <span className="text-sm font-medium text-gray-900">
              {walletDetails?.payoutInitiatedAt || "-"}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Audit Trail</h3>
          <div className="space-y-4">
            {walletDetails?.auditTrail?.map((event, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="mt-1">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{event.title}</p>
                  <p className="text-sm text-gray-600">{event.dateTime}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

     
      <div className="border-t bg-white px-4 pt-4 pb-5">
        <DrawerClose asChild>
          <Button className="h-11 w-full rounded-md text-sm bg-[#0B1533] text-white hover:bg-[#0B1533]/90">
            Close
          </Button>
        </DrawerClose>
      </div>
    </div>
  );
}