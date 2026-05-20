"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { aiAgentCrawlSite } from "@/services/ai-agents";

export function useAIAgentCrawlSite() {
  const queryClient = useQueryClient();
  const {
    mutateAsync: crawlSite,
    isPending,
    isError,
    error,
    data,
    reset: resetCrawlSite,
  } = useMutation({
    mutationFn: (siteUrl: string) => aiAgentCrawlSite(siteUrl),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ai-agents", "monitor"],
      });
    },
  });
  return { crawlSite, data, isPending, isError, error, resetCrawlSite };
}
