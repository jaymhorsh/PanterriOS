"use client";

import { useMutation } from "@tanstack/react-query";
import { aiAgentCrawlSite } from "@/services/ai-agents";

export function useAIAgentCrawlSite() {
  const {
    mutateAsync: crawlSite,
    isPending,
    isError,
    error,
    data,
  } = useMutation({
    mutationFn: (siteUrl: string) => aiAgentCrawlSite(siteUrl),
  });
  return { crawlSite, data, isPending, isError, error };
}
