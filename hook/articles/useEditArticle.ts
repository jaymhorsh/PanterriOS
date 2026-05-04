'use client';

import { CreateArticleReq } from '@/interface';
import { editArticle } from '@/services/articles';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
interface EditPayload {
  id: string;
  payload: CreateArticleReq;
}
export function useEditArticle() {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: EditPayload) => editArticle(id, payload),
    onSuccess: (data) => {
      toast.success(data.meta.message);
      router.push('/articles');
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      queryClient.invalidateQueries({ queryKey: ['published-articles'] });
    },
  });
}
