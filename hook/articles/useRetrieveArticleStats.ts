"use client";

import { useQuery } from "@tanstack/react-query";
import { retrieveArticleStats } from "@/services/articles";

export function useRetrieveArticleStats() {
  const {
    data: ArticleStats,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["articles", "article-stats"],
    queryFn: retrieveArticleStats,
  });

  return { ArticleStats, isLoading, isError };
}
