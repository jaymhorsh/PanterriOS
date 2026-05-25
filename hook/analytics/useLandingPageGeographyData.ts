'use client';

import { AnalyticsQueryParams } from '@/interface';
import { LandingPageGeographydata } from '@/services/analytics';
import { useQuery } from '@tanstack/react-query';

export const useLandingPageGeographyData = (params: AnalyticsQueryParams) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['analytics', 'landing-page-geography-data', params],
    queryFn: () => LandingPageGeographydata(params),
  });
  return { data, error, isLoading };
};
