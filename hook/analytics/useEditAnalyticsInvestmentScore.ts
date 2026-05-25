'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { AnalyticsInvestmentScoreReq } from '@/interface';
import { EditAnalyticsInvestmentScore } from '@/services/analytics';

interface EditAnalyticsInvestmentScorePayload {
  id: string;
  payload: AnalyticsInvestmentScoreReq;
}

export function useEditAnalyticsInvestmentScore() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: EditAnalyticsInvestmentScorePayload) =>
      EditAnalyticsInvestmentScore(id, payload),
    onSuccess: (_data, variables) => {
      toast.success('Investment score updated successfully');
      queryClient.invalidateQueries({
        queryKey: ['analytics', 'investment-score'],
      });
      queryClient.invalidateQueries({ queryKey: ['analytics', 'overview'] });
      queryClient.invalidateQueries({
        queryKey: ['analytics', 'investment-score', 'details', variables.id],
      });
    },
  });
}
