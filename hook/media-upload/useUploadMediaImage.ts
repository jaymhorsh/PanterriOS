'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { uploadMediaImage } from '@/services/mediaUpload';

export function useUploadMediaImage() {
  return useMutation({
    mutationFn: async (file: File) => uploadMediaImage(file),
    onSuccess: () => {
      toast.success('Cover image uploaded successfully');
    },
  });
}
