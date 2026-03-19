"use client";

import { useQuery } from "@tanstack/react-query";
import { retrieveWalletFinanceTransactionDetails } from "@/services/wallet-finance";

export function useRetrieveTransactionDetails(
  transactionId?: number,
  enabled = true,
) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["wallet-finance", "transactions", "details"],
    queryFn: () =>
      retrieveWalletFinanceTransactionDetails(transactionId as number),
    enabled:
      enabled &&
      typeof transactionId === "number" &&
      Number.isFinite(transactionId),
  });
  return { data: data?.data, isLoading, error, refetch };
}
