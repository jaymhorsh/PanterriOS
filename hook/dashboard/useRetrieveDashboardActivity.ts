"use client";

import { useQuery } from "@tanstack/react-query";
import type { RetrieveDashboardActivityQuery } from "@/interface";
import { retrieveDashboardActivity } from "@/services/dashboard";

export function useRetrieveDashboardActivity(
  params: RetrieveDashboardActivityQuery = {},
) {
  return useQuery({
    queryKey: ["dashboard", "activity", params],
    queryFn: () => retrieveDashboardActivity(params),
  });
}
