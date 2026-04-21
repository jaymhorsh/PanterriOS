"use client";

import { useQuery } from '@tanstack/react-query';
import { retrieveEventDetails } from '@/services/events';

export function useRetrieveEventDetails(eventId?: string, enabled = true) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['events', 'details', eventId],
    queryFn: () => retrieveEventDetails(eventId as string),
    enabled: enabled && typeof eventId === 'string' && eventId.trim().length > 0,
  });

  return { data, isLoading, isError, error, refetch };
}
