'use client';

import { updateArticleStatus } from '@/services/articles';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useUpdateArticleStatus() {
  const queryClient = useQueryClient();
  interface payloadProp {
    id: string;
    status: string;
  }
  return useMutation({
    mutationFn: (payload: payloadProp) =>
      updateArticleStatus(payload.id, payload.status),
    onSuccess: (data) => {
      toast.success(data.meta.message);
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });
}
