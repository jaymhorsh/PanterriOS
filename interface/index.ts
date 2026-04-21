export * from './dashboard';
export * from './navigation';
export * from './auth.entity';
export * from './user-profile.entity';
export * from './investor-management.entity';
export * from './investment-management.entity';
export * from './wallet-finance.entity';
export * from './article.entity';
export * from './events.entity';

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  limit: number;
}
