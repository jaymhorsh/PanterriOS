import {
  AdminUsersRes,
  RetrieveUsersQuery,
  UserProfileRes,
} from '@/interface/user-profile.entity';
import { ChangePasswordReq, CommonRes } from '@/interface';
import { API } from '@/services/axios';

export const uploadMyProfilePicture = async (
  file: File,
): Promise<{ message: string; profileImage: string }> => {
  const formData = new FormData();
  formData.append('profilePicture', file);

  const { data } = await API.post(
    '/user-management/me/profile-picture',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return data;
};

export const changeMyPassword = async (
  payload: ChangePasswordReq,
): Promise<CommonRes> => {
  const { data } = await API.post(
    '/user-management/me/change-password',
    payload,
  );
  return data;
};

export const getMyProfileDetails = async (): Promise<UserProfileRes> => {
  const { data } = await API.get('/user-management/me/profile-details');
  return data;
};

export const retrieveUsers = async (
  query: RetrieveUsersQuery,
): Promise<AdminUsersRes> => {
  const { data } = await API.get('/user-management/admin/retrieve-users', {
    params: query,
  });
  return data;
};

export const retrieveUserProfile = async (
  userId: number,
): Promise<UserProfileRes> => {
  const { data } = await API.get(
    `/user-management/admin/${userId}/profile-details`,
  );
  return data;
};
