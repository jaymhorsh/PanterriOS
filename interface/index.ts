export * from './dashboard';
export * from './navigation';
export * from './auth.entity';
export * from './user-profile.entity';
export * from './investor-management.entity';
export * from './investment-management.entity';
export * from './wallet-finance.entity';
export * from './article.entity';
export * from './events.entity';
export * from './media.entity';

export interface Pagination {
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  limit?: number;
  per_page?: number;
  current?: number;
  current_page?: string;
  total_count?: number;
}
