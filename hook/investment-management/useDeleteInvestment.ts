'use client';

import { deleteInvestment } from '@/services/investment-management';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useDeleteInvestment() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (id: number) => deleteInvestment(id),
    onSuccess: (data) => {
      toast.success(data.message || 'Investment deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['investments', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['investments', 'drafts'] });
      router.push('/investments');
    },
  });
}
