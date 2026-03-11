'use client';

import { updateInvestmentPublicationStatus } from '@/services/investment-management';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useUpdateInvestmentPublicationStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => updateInvestmentPublicationStatus(id),
    onSuccess: (data) => {
      toast.success(data.message || 'Investment publication status updated');
      queryClient.invalidateQueries({ queryKey: ['investments', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['investments', 'drafts'] });
    },
  });
}
