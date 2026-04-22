'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateEventById } from '@/services/events';
import type { UpdateEventByIdReq } from '@/interface';
import { toast } from 'sonner';

interface UpdateEventMutationPayload {
  id: string;
  payload: UpdateEventByIdReq;
}

export function useUpdateEvent() {
  const queryClient = useQueryClient();

  const {
    mutateAsync: updateEvent,
    isPending: isLoading,
    isError,
    variables,
  } = useMutation({
    mutationFn: ({ id, payload }: UpdateEventMutationPayload) =>
      updateEventById(id, payload),
    onSuccess: (data, variables) => {
      toast.success('Events status updated successfully');
      queryClient.invalidateQueries({ queryKey: ['events', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['events', 'stats'] });
      queryClient.invalidateQueries({
        queryKey: ['events', 'details', variables.id],
      });
    },
  });

  return { updateEvent, isLoading, isError, variables };
}
