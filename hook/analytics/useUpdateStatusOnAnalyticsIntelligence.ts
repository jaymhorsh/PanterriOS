'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { UpdateStatusOnAnalyticsIntelligence } from '@/services/analytics';

interface UpdateStatusOnAnalyticsIntelligencePayload {
  id: string;
  status: string;
}

export function useUpdateStatusOnAnalyticsIntelligence() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: UpdateStatusOnAnalyticsIntelligencePayload) =>
      UpdateStatusOnAnalyticsIntelligence(id, { status }),
    onSuccess: (_data, variables) => {
      toast.success('Insight status updated successfully');
      queryClient.invalidateQueries({ queryKey: ['analytics', 'insights'] });
      queryClient.invalidateQueries({ queryKey: ['analytics', 'overview'] });
      queryClient.invalidateQueries({
        queryKey: ['analytics', 'insights', 'details', variables.id],
      });
    },
  });
}
