"use client";

import { useQuery } from "@tanstack/react-query";
import type { RetrieveDashboardOverviewQuery } from "@/interface";
import { retrieveDashboardOverview } from "@/services/dashboard";

export function useRetrieveDashboardOverview(
  params: RetrieveDashboardOverviewQuery = {},
) {
  return useQuery({
    queryKey: ["dashboard", "overview", params],
    queryFn: () => retrieveDashboardOverview(params),
  });
}
