'use client';

import { useQuery } from '@tanstack/react-query';

import { AnalyticsQueryParams } from '@/interface';
import { AnalyticsOverview } from '@/services/analytics';

export function useAnalyticsOverview(params: AnalyticsQueryParams) {
  const { data, error, isLoading } = useQuery({
    queryKey: ['analytics', 'overview', params],
    queryFn: () => AnalyticsOverview(params),
  });

  return { data, error, isLoading };
}
