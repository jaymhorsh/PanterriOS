'use client';

import { CreateArticleReq } from '@/interface';
import { createArticle } from '@/services/articles';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function useCreateArticle() {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: CreateArticleReq) => createArticle(payload),
    onSuccess: (data) => {
      toast.success(data.meta.message);
      router.push('/articles');
    },
  });
}
