"use client";

import { useQuery } from "@tanstack/react-query";
import { retrieveInvestments } from "@/services/investment-management";

export function useRetrieveInvestments({
  search = "",
  page = 1,
  limit = 10,
  state,
  investmentStatus,
  propertyType,
}: {
  search?: string;
  page?: number;
  limit?: number;
  state?: string;
  investmentStatus?: string;
  propertyType?: string;
}) {
  return useQuery({
    queryKey: [
      "investments",
      "list",
      {
        search,
        page,
        limit,
        state,
        investmentStatus,
        propertyType,
      },
    ],
    queryFn: () =>
      retrieveInvestments({
        search,
        page,
        limit,
        state,
        investmentStatus,
        propertyType,
      }),
  });
}
