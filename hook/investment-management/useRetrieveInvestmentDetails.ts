"use client";

import { useQuery } from "@tanstack/react-query";
import { retrieveInvestmentDetails } from "@/services/investment-management";

export function useRetrieveInvestmentDetails(
  investmentId?: number,
  enabled = true,
) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["investments", "details", investmentId],
    queryFn: () => retrieveInvestmentDetails(investmentId as number),
    enabled:
      enabled &&
      typeof investmentId === "number" &&
      Number.isFinite(investmentId),
  });
  return { data: data?.data?.data, isLoading, error, refetch };
}