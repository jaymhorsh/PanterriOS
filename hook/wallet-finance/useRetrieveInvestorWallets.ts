"use client";

import { useQuery } from "@tanstack/react-query";
import { type RetrieveInvestorWalletsQuery } from "@/interface";
import { retrieveInvestorWallets } from "@/services/wallet-finance";

export function useRetrieveInvestorWallets(
  params: RetrieveInvestorWalletsQuery,
) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["wallet-finance", "investor-wallets", params],
    queryFn: () => retrieveInvestorWallets(params),
    enabled: true,
  });

  return { data, isLoading, isError, error };
}
