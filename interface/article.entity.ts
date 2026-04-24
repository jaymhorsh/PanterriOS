export interface CrawlerArticlesResponse {
  meta: Meta;
  data: CrwalerArticle[];
}

export interface CrwalerArticle {
  _id: string;
  title: string;
  url: string;
  content: string;
  author: string;
  imageUrl: string;
  excerpt?: string;
  readingTime?: string;
  tags?: string[] | string;
  source: Source;
  publishedAt: Date;
  matchedKeywords: string[];
  relevanceScore: number;
  categories: string[];
  status: string;
  isSelected: boolean;
  isFeatured: boolean;
  isEditorsPick: boolean;
  viewCount: number;
  crawledAt: Date;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Source {
  name: string;
  key: string;
  baseUrl: string;
}

export interface Meta {
  status_code: number;
  success: boolean;
  pagination: CrawlerPagination;
}

export interface CrawlerPagination {
  total_count: number;
  per_page: number;
  current: number;
  current_page: string;
  next: number;
  next_page: string;
}

export interface ArticleFilters {
  page?: number;
  per_page?: number;
  search?: string;
  all?: boolean;
  sourceName?: string;
  isFeatured?: boolean;
  isEditorsPick?: boolean;
  slug?: string;
  status?: string;
}

export interface ArticleStatusUpdateRes {
  meta: {
    status_code: number;
    success: boolean;
    message: string;
  };
  data: CrwalerArticle;
}

export interface CreateArticleReq {
  categories: string[];
  content: string;
  excerpt: string;
  imageUrl: string;
  isEditorsPick: boolean;
  isFeatured: boolean;
  status?: string;
  readingTime: string;
  tags: string;
  title: string;
}
