"use client";

import { useQuery } from "@tanstack/react-query";
import { type RetrieveWalletFinanceQuery } from "@/interface";
import { retrieveWalletFinance } from "@/services/wallet-finance";

export function useRetrieveWalletFinance(
  params: RetrieveWalletFinanceQuery,
) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["wallet-finance", "transactions", params],
    queryFn: () => retrieveWalletFinance(params),
  });

  return { data, isLoading, isError, error };
}
