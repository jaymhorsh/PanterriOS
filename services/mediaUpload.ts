import { MediaUplaodRes } from '@/interface';
import { MEDIA_API } from '@/services/axios';

export const uploadMediaImage = async (file: Blob): Promise<MediaUplaodRes> => {
  const formData = new FormData();
  formData.append('file', file);

  const { data } = await MEDIA_API.post('/upload/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};
