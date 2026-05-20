"use client";

import { useQuery } from "@tanstack/react-query";
import type { RetrieveDashboardAnalyticsQuery } from "@/interface";
import { retrieveDashboardAnalytics } from "@/services/dashboard";

export function useRetrieveDashboardAnalytics(
  params: RetrieveDashboardAnalyticsQuery = {},
) {
  return useQuery({
    queryKey: ["dashboard", "analytics", params],
    queryFn: () => retrieveDashboardAnalytics(params),
  });
}
