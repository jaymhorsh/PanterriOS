'use client';

import { useQuery } from '@tanstack/react-query';
import { retriveArticles } from '@/services/articles';
import { ArticleFilters } from '@/interface/article.entity';

export function useRetrieveArticles(query: ArticleFilters) {
  return useQuery({
    queryKey: ['articles', query],
    queryFn: () => retriveArticles(query),
  });
}
