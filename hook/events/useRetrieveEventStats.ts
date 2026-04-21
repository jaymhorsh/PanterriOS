"use client";

import { useQuery } from '@tanstack/react-query';
import { retrieveEventStats } from '@/services/events';

export function useRetrieveEventStats() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['events', 'stats'],
    queryFn: retrieveEventStats,
  });

  return { data, isLoading, isError, error, refetch };
}
