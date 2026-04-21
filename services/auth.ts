import {
  CommonRes,
  CreateUserReq,
  EnableTwoFactorReq,
  GenerateTwoFactorRes,
  Login2FaReq,
  LoginReq,
  LoginRes,
  RefreshTokenRes,
  ResetPasswordReq,
  SendOtpReq,
  ToggleTwoFactorReq,
  UpdateUserReq,
  VerifyOtpReq,
  VerifyOtpRes,
} from '@/interface';
import  {API, AUTH, getTwoFactorTemporaryToken } from '@/services/axios';
import { UserProfileRes } from '@/interface/user-profile.entity';
import { tokenStore } from '@/store/tokenStore';

const getSetupTwoFactorAuthContext = async () => {
  const accessToken = tokenStore.get();
  const temporaryToken = await getTwoFactorTemporaryToken();
  const bearerToken = accessToken || temporaryToken;

  const headers = bearerToken
    ? {
        Authorization: `Bearer ${bearerToken}`,
        ...(temporaryToken ? { 'x-temporary-token': temporaryToken } : {}),
      }
    : undefined;

  return {
    headers,
    temporaryToken: temporaryToken ?? undefined,
  };
};

export const getAppStatus = async (): Promise<CommonRes> => {
  const { data } = await API.get('/');
  return data;
};

export const createUser = async (
  payload: CreateUserReq,
): Promise<CommonRes> => {
  const { data } = await API.post('/auth/admin/create-user', payload,
 
  );
  return data;
};

export const login = async (payload: LoginReq): Promise<LoginRes> => {
  const { data } = await AUTH.post('/api/auth/login', payload);
  return data;
};

export const refreshAccessToken = async (): Promise<RefreshTokenRes> => {
  const { data } = await AUTH.post('/api/auth/refresh');
  return data;
};

export const sendResetPasswordOtp = async (
  payload: SendOtpReq,
): Promise<CommonRes> => {
  const { data } = await API.post('/auth/send-reset-password-otp', payload);
  return data;
};

export const resendResetPasswordOtp = async (
  payload: SendOtpReq,
): Promise<CommonRes> => {
  const { data } = await API.post('/auth/resend-reset-password-otp', payload);
  return data;
};

export const verifyResetPasswordOtp = async (
  payload: VerifyOtpReq,
): Promise<VerifyOtpRes> => {
  const { data } = await API.post('/auth/verify-reset-password-otp', payload);
  return data;
};

export const resetPassword = async (
  payload: ResetPasswordReq,
): Promise<CommonRes> => {
  const { data } = await API.post('/auth/reset-password', payload);
  return data;
};

export const getCurrentUser = async (
  accessToken?: string,
): Promise<UserProfileRes> => {
  const { data } = await API.get('/auth/current-user', {
    headers: accessToken
      ? {
          Authorization: `Bearer ${accessToken}`,
        }
      : undefined,
  });
  return data;
};

export const generateTwoFactorSecret =
  async (): Promise<GenerateTwoFactorRes> => {
    const { headers, temporaryToken } = await getSetupTwoFactorAuthContext();
    const { data } = await AUTH.post(
      '/api/auth/generate-2fa-secret',
      temporaryToken ? { temporaryToken } : undefined,
      {
        headers,
      },
    );
    return data;
  };

export const enableTwoFactor = async (
  payload: EnableTwoFactorReq,
): Promise<LoginRes> => {
  const { headers } = await getSetupTwoFactorAuthContext();
  const { data } = await AUTH.post(
    '/api/auth/enable-2fa',
    {
      ...payload,
    },
    {
      headers,
    },
  );
  return data;
};

export const loginWithTwoFactor = async (
  payload: Login2FaReq,
): Promise<LoginRes> => {
  const { data } = await AUTH.post('/api/auth/verify-2fa', payload);
  return data;
};

export const logout = async (): Promise<CommonRes> => {
  const { data } = await AUTH.post('/api/auth/logout');
  return data;
};

export const toggleUserTwoFactor = async (
  userId: number,
  payload: ToggleTwoFactorReq,
): Promise<CommonRes> => {
  const { data } = await API.post(
    `/two-factor-authentication/admin/${userId}/toggle`,
    payload,
  );
  return data;
};

export const updateUserDetails = async (
  userId: number,
  payload: UpdateUserReq,
): Promise<CommonRes> => {
  const { data } = await API.put(
    `/user-management/admin/${userId}/update-details`,
    payload,
  );
  return data;
};

export const deleteUser = async (userId: number): Promise<CommonRes> => {
  const { data } = await API.delete(`/user-management/admin/${userId}/delete`);
  return data;
};
