import { Pagination } from './index';

export interface UserProfileRes {
  statusCode: 200;
  data: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    roles: string[];
    gender: string;
    userStatus: string;
    department: string;
    dateOfBirth: string;
    phoneNumber: string;
    profileImage: string | null;
    isTwoSetup: boolean;
    isTwoEnabled: boolean;
    joinedAt: string;
    activeDevice: string | null;
    lastLogin: string;
    appAccess: string;
  };
}

export interface AdminUsersStats {
  totalUsers: number;
  activeUsers: number;
  adminUsers: number;
  pendingUsers: number;
}

export interface AdminUsersDataItem {
  id?: number;
  fullName: string;
  email: string;
  roles: string[];
  status: string;
  lastLogin: string;
}

export interface AdminUsersRes {
  statusCode: number;
  data: {
    message: string;
    userStats: AdminUsersStats;
    data: AdminUsersDataItem[];
    pagination: Pagination;
    totalCount: number;
    filteredCount: number;
  };
}

export interface RetrieveUsersQuery {
  search?: string;
  page?: number;
  limit?: number;
}
