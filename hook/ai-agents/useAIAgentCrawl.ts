"use client";

import { aiAgentCrawl } from "@/services/ai-agents";
import { useMutation } from "@tanstack/react-query";

export function useAIAgentCrawl() {
  const {
    mutateAsync: crawlAll,
    data: crawlAllData,
    isPending: isCrawlingAll,
    isError: isCrawlAllError,
    error: crawlAllError,
   
  } = useMutation({
    mutationFn: aiAgentCrawl,
  });
  return {
    crawlAll,
    crawlAllData,
    isCrawlingAll,
    isCrawlAllError,
    crawlAllError,
  };
}
