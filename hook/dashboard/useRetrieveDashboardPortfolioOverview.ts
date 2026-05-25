"use client";

import { useQuery } from "@tanstack/react-query";
import type { RetrieveDashboardPortfolioOverviewQuery } from "@/interface";
import { retrieveDashboardPortfolioOverview } from "@/services/dashboard";

export function useRetrieveDashboardPortfolioOverview(
  params: RetrieveDashboardPortfolioOverviewQuery = {},
) {
  return useQuery({
    queryKey: ["dashboard", "portfolio-overview", params],
    queryFn: () => retrieveDashboardPortfolioOverview(params),
  });
}
