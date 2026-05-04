'use client';

import { useQuery } from '@tanstack/react-query';
import { retrievePublishedRejectedEvents } from '@/services/events';
import { EventFilters } from '@/interface';

export function useRetrievePublishedRejectedEvents(query: EventFilters) {
  return useQuery({
    queryKey: ['published-rejected-events', query],
    queryFn: () => retrievePublishedRejectedEvents(query),
  });
}
