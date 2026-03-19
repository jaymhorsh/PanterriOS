"use client";

import { useQuery } from "@tanstack/react-query";
import { type RetrieveYieldDisbursementsQuery } from "@/interface";
import { retrieveYieldDisbursements } from "@/services/wallet-finance";

export function useYieldDisbursements(
  params: RetrieveYieldDisbursementsQuery = {},
) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["wallet-finance", "yield-disbursements", params],
    queryFn: () => retrieveYieldDisbursements(params),
    enabled: true,
  });
  return { data, isLoading, isError, error };
}
