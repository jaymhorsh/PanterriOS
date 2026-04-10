"use client";

import { useQuery } from "@tanstack/react-query";
import { retrieveYieldDisbursementReview } from "@/services/yield-disbursements";

export function useRetrieveYieldDisbursementReview(reviewId?: number) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["wallet-finance", "yield-disbursement-review", reviewId],
    queryFn: () => retrieveYieldDisbursementReview(reviewId as number),
    enabled: typeof reviewId === "number" && Number.isFinite(reviewId),
  });

  return { data, isLoading, isError, error };
}
