'use client';

import { AnalyticsQueryParams } from '@/interface';
import { AnalyticsInsightIntelligence } from '@/services/analytics';
import { useQuery } from '@tanstack/react-query';

export const useAnalyticsIntelligence = (params: AnalyticsQueryParams) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['analytics', 'insights', params],
    queryFn: () => AnalyticsInsightIntelligence(params),
  });
  return { data, error, isLoading };
};
