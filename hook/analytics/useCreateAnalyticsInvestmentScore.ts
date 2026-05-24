'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { AnalyticsInvestmentScoreReq } from '@/interface';
import { CreateAnalyticsInvestmentScore } from '@/services/analytics';

export function useCreateAnalyticsInvestmentScore() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AnalyticsInvestmentScoreReq) =>
      CreateAnalyticsInvestmentScore(payload),
    onSuccess: () => {
      toast.success('Investment score created successfully');
      queryClient.invalidateQueries({
        queryKey: ['analytics', 'investment-score'],
      });
      queryClient.invalidateQueries({ queryKey: ['analytics', 'overview'] });
    },
  });
}
