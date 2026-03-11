'use client';

import { UpdateInvestmentReq } from '@/interface';
import { updateInvestmentDetails } from '@/services/investment-management';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useUpdateInvestment() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateInvestmentReq }) =>
      updateInvestmentDetails(id, payload),
    onSuccess: (data) => {
      toast.success(data.message || 'Investment updated successfully');
      queryClient.invalidateQueries({ queryKey: ['investments', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['investments', 'drafts'] });
      queryClient.invalidateQueries({ queryKey: ['investments', 'details'] });
      router.push('/investments');
    },
  });
}
