'use client';

import { toggleInvestmentDocumentVisibility } from '@/services/investment-management';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useToggleInvestmentDocumentVisibility() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (documentId: number) =>
      toggleInvestmentDocumentVisibility(documentId),
    onSuccess: (data) => {
      toast.success(data.message || 'Document visibility updated successfully');
      queryClient.invalidateQueries({ queryKey: ['investments', 'details'] });
    },
  });
}
