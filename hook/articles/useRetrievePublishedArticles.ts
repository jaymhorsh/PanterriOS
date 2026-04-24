'use client';

import { useQuery } from '@tanstack/react-query';
import { retrivePublishedArticles } from '@/services/articles';
import { ArticleFilters } from '@/interface/article.entity';

export function useRetrievePublishedArticles(query: ArticleFilters) {
  return useQuery({
    queryKey: ['published-articles', query],
    queryFn: () => retrivePublishedArticles(query),
  });
}
