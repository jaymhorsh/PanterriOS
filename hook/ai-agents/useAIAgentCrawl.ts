"use client";

import { aiAgentCrawl } from "@/services/ai-agents";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAIAgentCrawl() {
  const queryClient = useQueryClient();
  const {
    mutateAsync: crawlAll,
    data: crawlAllData,
    isPending: isCrawlingAll,
    isError: isCrawlAllError,
    error: crawlAllError,
    reset: resetCrawlAll,
  } = useMutation({
    mutationFn: aiAgentCrawl,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["articles", "article-stats"],
      });
    },
  });
  return {
    crawlAll,
    crawlAllData,
    isCrawlingAll,
    isCrawlAllError,
    crawlAllError,
    resetCrawlAll,
  };
}
