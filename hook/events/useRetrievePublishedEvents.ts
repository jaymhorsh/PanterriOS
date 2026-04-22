'use client';

import { useQuery } from '@tanstack/react-query';
import { retrievePublsihedEvents } from '@/services/events';
import { EventFilters } from '@/interface';

export function useRetrievePublishedEvents(query: EventFilters) {
  return useQuery({
    queryKey: ['publsihed-events', query],
    queryFn: () => retrievePublsihedEvents(query),
  });
}
