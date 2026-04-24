"use client";

import { useQuery } from "@tanstack/react-query";
import type { RetrieveAuditLogsQuery } from "@/interface";
import { retrieveAuditLogs } from "@/services/audit-log";

export function useRetrieveAuditLogs(params: RetrieveAuditLogsQuery) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["audit-logs", "list", params],
    queryFn: () => retrieveAuditLogs(params),
  });

  return { data, isLoading, isError, error, refetch };
}
