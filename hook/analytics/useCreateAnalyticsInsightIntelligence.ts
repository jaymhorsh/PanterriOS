'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { AnalyticsIntelligenceReq } from '@/interface';
import { CreateAnalyticsInsightIntelligence } from '@/services/analytics';

export function useCreateAnalyticsInsightIntelligence() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AnalyticsIntelligenceReq) =>
      CreateAnalyticsInsightIntelligence(payload),
    onSuccess: () => {
      toast.success('Insight created successfully');
      queryClient.invalidateQueries({ queryKey: ['analytics', 'insights'] });
      queryClient.invalidateQueries({ queryKey: ['analytics', 'overview'] });
    },
  });
}
