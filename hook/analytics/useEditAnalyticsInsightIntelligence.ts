'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { AnalyticsIntelligenceReq } from '@/interface';
import { EditAnalyticsInsightIntelligence } from '@/services/analytics';

interface EditAnalyticsInsightIntelligencePayload {
  id: string;
  payload: AnalyticsIntelligenceReq;
}

export function useEditAnalyticsInsightIntelligence() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: EditAnalyticsInsightIntelligencePayload) =>
      EditAnalyticsInsightIntelligence(id, payload),
    onSuccess: (_data, variables) => {
      toast.success('Insight updated successfully');
      queryClient.invalidateQueries({ queryKey: ['analytics', 'insights'] });
      queryClient.invalidateQueries({ queryKey: ['analytics', 'overview'] });
      queryClient.invalidateQueries({
        queryKey: ['analytics', 'insights', 'details', variables.id],
      });
    },
  });
}
