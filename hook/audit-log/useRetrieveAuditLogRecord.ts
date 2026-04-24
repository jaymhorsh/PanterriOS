"use client";

import { useQuery } from "@tanstack/react-query";
import { retrieveAuditLogRecord } from "@/services/audit-log";

export function useRetrieveAuditLogRecord(referenceOrId?: string, enabled = true) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["audit-logs", "details", referenceOrId],
    queryFn: () => retrieveAuditLogRecord(referenceOrId as string),
    enabled:
      enabled &&
      typeof referenceOrId === "string" &&
      referenceOrId.trim().length > 0,
  });

  return { data, isLoading, isPending: isLoading, isError, error, refetch };
}
