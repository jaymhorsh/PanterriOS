"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { disburseInvestmentYield } from "@/services/yield-disbursements";

export function useDisburseInvestmentYield() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (investmentId: number) => disburseInvestmentYield(investmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wallet-finance", "yield-disbursements"],
      });
      queryClient.invalidateQueries({
        queryKey: ["wallet-finance", "yield-disbursement-ledger"],
      });
    },
  });
}
