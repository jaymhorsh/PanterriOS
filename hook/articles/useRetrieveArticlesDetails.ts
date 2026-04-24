'use client';

import { useQuery } from '@tanstack/react-query';
import { retrieveArticleDetails } from '@/services/articles';

export function useRetrieveArticleDetails(id: string) {
  return useQuery({
    queryKey: ['article-details', id],
    queryFn: () => retrieveArticleDetails(id),
    enabled: Boolean(id),
  });
}
