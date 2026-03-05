"use client";

import { useQuery } from "@tanstack/react-query";
import { aiAgentsMonitor } from "@/services/ai-agents";

export function useRetrieveAIAgentsMonitor() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["ai-agents", "monitor"],
    queryFn: aiAgentsMonitor,
  });

  return { data, isLoading, isError, error, refetch };
}
