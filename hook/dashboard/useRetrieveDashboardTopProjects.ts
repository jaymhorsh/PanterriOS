"use client";

import { useQuery } from "@tanstack/react-query";
import type { RetrieveDashboardTopProjectsQuery } from "@/interface";
import { retrieveDashboardTopProjects } from "@/services/dashboard";

export function useRetrieveDashboardTopProjects(
  params: RetrieveDashboardTopProjectsQuery = {},
) {
  return useQuery({
    queryKey: ["dashboard", "top-projects", params],
    queryFn: () => retrieveDashboardTopProjects(params),
  });
}
