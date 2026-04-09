"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type FlagYieldDisbursementReq } from "@/interface";
import { flagYieldDisbursement } from "@/services/yield-disbursements";

interface FlagYieldDisbursementParams {
  eventId: string;
  investmentFundId: number;
  payload?: FlagYieldDisbursementReq;
}

export function useFlagYieldDisbursement() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ eventId, investmentFundId, payload }: FlagYieldDisbursementParams) =>
      flagYieldDisbursement(eventId, investmentFundId, payload || {}),
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
