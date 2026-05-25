'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { DeleteInvestmentScore } from '@/services/analytics';

interface DeleteInvestmentScorePayload {
  id: string;
  status: string;
}

export function useDeleteInvestmentScore() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: DeleteInvestmentScorePayload) =>
      DeleteInvestmentScore(id, { status }),
    onSuccess: (_data, variables) => {
      toast.success('Investment score status updated successfully');
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
