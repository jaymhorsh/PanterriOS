'use client';

import { useQuery } from '@tanstack/react-query';

import { AnalyticsQueryParams } from '@/interface';
import { getAnalyticsPriceTrend } from '@/services/analytics';

export function useAnalyticsPriceTrend(params: AnalyticsQueryParams) {
  const { data, error, isLoading } = useQuery({
    queryKey: ['analytics', 'price-trend', params],
    queryFn: () => getAnalyticsPriceTrend(params),
  });

  return { data, error, isLoading };
}
