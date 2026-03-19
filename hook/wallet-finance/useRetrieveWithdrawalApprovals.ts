"use client";

import { useQuery } from "@tanstack/react-query";
import { type RetrieveWithdrawalApprovalsQuery } from "@/interface";
import { retrieveWithdrawalApprovals } from "@/services/wallet-finance";

export function useRetrieveWithdrawalApprovals(
  params: RetrieveWithdrawalApprovalsQuery,
) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["wallet-finance", "withdrawal-approvals", params],
    queryFn: () => retrieveWithdrawalApprovals(params),
  });

  return { data, isLoading, isError, error };
}
