import { tokenStore } from '@/store/tokenStore';
import { handleAxiosError } from '@/utils/error';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

type QueuedRequest = {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
};

let isRefreshing = false;
let failedQueue: QueuedRequest[] = [];

// Axios instance
const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

export const AUTH = axios.create({
  baseURL: '',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

AUTH.interceptors.response.use(
  (response) => response,
  (error) => {
    handleAxiosError(error as import('axios').AxiosError);
    return Promise.reject(error);
  },
);
const CRAWLER_API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CRAWLER_BASE_API,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.NEXT_PUBLIC_CRAWLER_API_KEY,
  },
});
const MEDIA_API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_S3BUCKET_MEDIA_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.NEXT_PUBLIC_S3BUCKET_MEDIA_API_KEY,
  },
});
export const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const setRegEmail = async (email: string) => {
  localStorage.setItem('email', JSON.stringify(email));
};

export const getRegEmail = async (): Promise<string | null> => {
  const email = localStorage.getItem('email');
  return email ? JSON.parse(email) : null;
};

export const deleteRegEmail = async () => {
  localStorage.removeItem('email');
};
export const setOtp = async (otp: string) => {
  localStorage.setItem('otp', JSON.stringify(otp));
};

export const getOtp = async (): Promise<string | null> => {
  const otp = localStorage.getItem('otp');
  return otp ? JSON.parse(otp) : null;
};

export const deleteOtp = async () => {
  localStorage.removeItem('otp');
};

export const setTwoFactorTemporaryToken = async (token: string) => {
  localStorage.setItem('twoFactorTemporaryToken', token);
};

export const getTwoFactorTemporaryToken = async (): Promise<string | null> => {
  const token = localStorage.getItem('twoFactorTemporaryToken');
  return token && token.trim() ? token : null;
};

export const deleteTwoFactorTemporaryToken = async () => {
  localStorage.removeItem('twoFactorTemporaryToken');
};

// Request interceptor
function attachAuthInterceptor(instance: AxiosInstance) {
  instance.interceptors.request.use(
    (config) => {
      const token = tokenStore.get();

      if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error: AxiosError) => {
      handleAxiosError(error);
      return Promise.reject(error);
    },
  );
}

const processQueue = (error: unknown, token?: string) => {
  failedQueue.forEach((request) => {
    if (error) request.reject(error);
    else if (token) request.resolve(token);
  });

  failedQueue = [];
};

const isAuthFailure = (error: unknown) => {
  if (!axios.isAxiosError(error)) return false;
  const status = error.response?.status;
  return status === 401 || status === 403;
};

// Response interceptor

function attachRefreshInterceptor(instance: AxiosInstance) {
  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as
        | RetryableRequestConfig
        | undefined;
      const status = error.response?.status;

      const canRefresh =
        status === 401 &&
        Boolean(originalRequest) &&
        !originalRequest?._retry &&
        !String(originalRequest?.url ?? '').includes('/api/auth/refresh');

      if (canRefresh && originalRequest) {
        if (isRefreshing) {
          return new Promise<string>((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then((token) => {
            originalRequest.headers = originalRequest.headers ?? {};
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return instance.request(originalRequest);
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const { data } = await AUTH.post('/api/auth/refresh');
          const newAccessToken = data?.accessToken ?? data?.data?.accessToken;

          if (typeof newAccessToken !== 'string' || !newAccessToken) {
            throw new Error(
              `Invalid refresh response: missing accessToken. Response: ${JSON.stringify(data)}`,
            );
          }

          tokenStore.set(newAccessToken);
          processQueue(null, newAccessToken);

          originalRequest.headers = originalRequest.headers ?? {};
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return instance.request(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError);

          if (isAuthFailure(refreshError)) {
            tokenStore.clear();
            localStorage.removeItem('auth-store');
          }

          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      handleAxiosError(error);
      return Promise.reject(error);
    },
  );
}
attachAuthInterceptor(API);
attachAuthInterceptor(CRAWLER_API);
attachAuthInterceptor(MEDIA_API);
attachRefreshInterceptor(API);
attachRefreshInterceptor(CRAWLER_API);
attachRefreshInterceptor(MEDIA_API);
export { API, CRAWLER_API, MEDIA_API };
