"use client";

import { useQuery } from "@tanstack/react-query";
import { type RetrieveEventsQuery } from "@/interface";
import { retrieveEvents } from "@/services/events";

export function useRetrieveEvents(params: RetrieveEventsQuery) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["events", "list", params],
    queryFn: () => retrieveEvents(params),
  });

  return { data, isLoading, isError, error, refetch };
}
