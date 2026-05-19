"use client";

import { useQuery } from "@tanstack/react-query";
import { aiAgentCrawlEnabledSites } from "@/services/ai-agents";
import type { AIAgentEnabledSitesResponse } from "@/interface/ai-agents";

export function useRetrieveAIAgentEnabledSites(enabled = true) {
  const { data, isLoading, isError, error, refetch } = useQuery<AIAgentEnabledSitesResponse>({
    queryKey: ["ai-agents", "enabled-sites"],
    queryFn: aiAgentCrawlEnabledSites,
    enabled,
  });

  return { data, isLoading, isError, error, refetch };
}
