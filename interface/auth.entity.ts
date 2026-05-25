export interface CommonRes {
  message: string;
  status?: number;
}

export interface LoginReq {
  email: string;
  password: string;
  userDevice?: string;
}

export interface LoginRes {
  statusCode?: number;
  message?: string;
  isTwoFactorEnabled?: boolean;
  isTwoFactorSetup?: boolean;
  temporaryToken?: string;
  fullName?: string;
  accessToken?: string | null;
  refreshToken?: string | null;
  lastLogin?: string | null;
  tokens?: {
    accessToken?: string | null;
    refreshToken?: string | null;
  };
  data?: Partial<LoginData> & {
    tokens?: {
      accessToken?: string | null;
      refreshToken?: string | null;
    };
  };
}

export interface LoginData {
  message: string;
  isTwoFactorEnabled: boolean;
  isTwoFactorSetup: boolean;
  temporaryToken?: string;
  fullName?: string;
  accessToken?: string | null;
  refreshToken?: string | null;
  lastLogin?: string | null;
}

export interface NormalizedLoginRes {
  message: string;
  isTwoFactorEnabled: boolean;
  isTwoFactorSetup: boolean;
  temporaryToken?: string;
  fullName?: string;
  accessToken?: string;
  refreshToken?: string;
  lastLogin?: string | null;
}

const asRecord = (value: unknown): Record<string, unknown> | null => {
  if (typeof value !== 'object' || value === null) return null;
  return value as Record<string, unknown>;
};

const toStringOrUndefined = (value: unknown): string | undefined => {
  return typeof value === 'string' && value.trim() ? value : undefined;
};

const toNullableString = (value: unknown): string | null | undefined => {
  if (value === null) return null;
  return toStringOrUndefined(value);
};

const toBoolean = (value: unknown, fallback = false): boolean => {
  return typeof value === 'boolean' ? value : fallback;
};

export function normalizeLoginRes(payload: LoginRes): NormalizedLoginRes {
  const root = asRecord(payload) ?? {};
  const nested = asRecord(root.data) ?? {};
  const rootTokens = asRecord(root.tokens) ?? {};
  const nestedTokens = asRecord(nested.tokens) ?? {};

  const accessToken =
    toStringOrUndefined(root.accessToken) ??
    toStringOrUndefined(rootTokens.accessToken) ??
    toStringOrUndefined(nested.accessToken) ??
    toStringOrUndefined(nestedTokens.accessToken);

  const refreshToken =
    toStringOrUndefined(root.refreshToken) ??
    toStringOrUndefined(rootTokens.refreshToken) ??
    toStringOrUndefined(nested.refreshToken) ??
    toStringOrUndefined(nestedTokens.refreshToken);

  return {
    message:
      toStringOrUndefined(root.message) ??
      toStringOrUndefined(nested.message) ??
      'Login successful',
    isTwoFactorEnabled: toBoolean(
      root.isTwoFactorEnabled,
      toBoolean(nested.isTwoFactorEnabled),
    ),
    isTwoFactorSetup: toBoolean(
      root.isTwoFactorSetup,
      toBoolean(nested.isTwoFactorSetup),
    ),
    temporaryToken:
      toStringOrUndefined(root.temporaryToken) ??
      toStringOrUndefined(nested.temporaryToken),
    fullName:
      toStringOrUndefined(root.fullName) ??
      toStringOrUndefined(nested.fullName),
    accessToken,
    refreshToken,
    lastLogin:
      toNullableString(root.lastLogin) ?? toNullableString(nested.lastLogin),
  };
}

export interface RefreshTokenReq {
  refreshToken: string;
}

export interface RefreshTokenRes {
  message?: string;
  accessToken: string;
  refreshToken?: string;
}

export interface SendOtpReq {
  email: string;
}

export interface VerifyOtpReq {
  email: string;
  otp: string;
}

export interface VerifyOtpRes {
  message: string;
  passwordResetToken?: string;
}

export interface ResetPasswordReq {
  resetToken: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface Login2FaReq {
  temporaryToken: string;
  code: string;
  userDevice?: string;
}

export interface EnableTwoFactorReq {
  token: string;
  userDevice?: string;
}

export interface ToggleTwoFactorReq {
  isEnabled: boolean;
}

export interface GenerateTwoFactorRes {
  message: string;
  secret: string;
  manualEntryKey: string;
  qrCode: string;
  statusCode: number;
  data: {
    message: string;
    secret: string;
    manualEntryKey: string;
    qrCode: string;
  };
}

export interface CreateUserReq {
  firstName: string;
  lastName: string;
  email: string;
  userStatus:
    | 'activated'
    | 'deactivated'
    | 'pending'
    | 'banned'
    | 'suspended'
    | 'archived';
  roles: string[];
  gender: string;
  department: string;
  dateOfBirth?: Date;
  phoneNumber: string;
  appAccess?: string;
}

export interface UpdateUserReq {
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
  gender: string;
  department: string;
  phoneNumber: string;
  appAccess?: string;
}

export interface ChangePasswordReq {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
