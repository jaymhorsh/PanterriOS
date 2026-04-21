export interface RetrieveEventsQuery {
  page?: number;
  per_page?: number;
  search?: string;
  all?: boolean | "true" | "false";
  location?: string;
  eventType?: string;
  eventDateTime?: string;
  startDateTime?: string;
  category?: string;
}

export interface EventSource {
  name: string;
  key: string;
  baseUrl: string;
}

export interface EventEntity {
  _id: string;
  title: string;
  about?: string;
  author?: string;
  content?: string;
  excerpt?: string;
  eventType?: string;
  eventTopic?: string;
  attendanceMode?: string;
  status?: string;
  sourceType?: string;
  source?: EventSource;
  location?: string;
  venueName?: string;
  venueAddress?: string;
  detailsUrl?: string;
  registrationUrl?: string;
  imageUrl?: string;
  expectedAttendees?: number;
  highlights?: string[];
  matchedKeywords?: string[];
  isFeatured?: boolean;
  isSelected?: boolean;
  relevanceScore?: number;
  eventDateTime?: string;
  startDateTime?: string;
  endDateTime?: string;
  publishedAt?: string;
  crawledAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface EventsPagination {
  total_count: number;
  per_page: number;
  current: number;
  current_page: string;
}

export interface EventsMeta {
  status_code: number;
  success: boolean;
  pagination?: EventsPagination;
}

export interface EventStats {
  totalEvents: number;
  aiDiscovered: number;
  submitted: number;
  freeEvents: number;
  virtualEvents: number;
  expectedAttendees: number;
}

export interface RetrieveEventsRes {
  meta: EventsMeta;
  data: EventEntity[];
}

export interface RetrieveEventStatsRes {
  meta: EventsMeta;
  data: EventStats;
}
