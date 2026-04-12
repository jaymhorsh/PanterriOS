"use client";

import { useQuery } from "@tanstack/react-query";
import { RetrieveWalletFinanceQuery } from "@/interface";
import { retrieveYieldDisbursementLedger } from "@/services/yield-disbursements";

export function useRetrieveYieldDisbursementLedger(
  eventId?: string,
  query:  RetrieveWalletFinanceQuery = { page: 1, limit: 20 },
) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["wallet-finance", "yield-disbursement-ledger", eventId, query],
    queryFn: () => retrieveYieldDisbursementLedger(eventId as string, query),
    enabled: Boolean(eventId),
  });

  return { data, isLoading, isError, error };
}
