'use client';

import { useQuery } from '@tanstack/react-query';

import { AnalyticsQueryParams } from '@/interface';
import { AnalyticsInvestmentScore } from '@/services/analytics';

export function useAnalyticsInvestmentScore(params: AnalyticsQueryParams) {
  const { data, error, isLoading } = useQuery({
    queryKey: ['analytics', 'investment-score', params],
    queryFn: () => AnalyticsInvestmentScore(params),
  });

  return { data, error, isLoading };
}
