import {
  AppStatusRes,
  RetrieveDashboardActivityQuery,
  RetrieveDashboardActivityRes,
  RetrieveDashboardAnalyticsQuery,
  RetrieveDashboardAnalyticsRes,
  RetrieveDashboardOverviewQuery,
  RetrieveDashboardOverviewRes,
  RetrieveDashboardPortfolioOverviewQuery,
  RetrieveDashboardPortfolioOverviewRes,
  RetrieveDashboardTopProjectsQuery,
  RetrieveDashboardTopProjectsRes,
} from '@/interface';
import { API } from '@/services/axios';

function getPayload<T>(value: unknown): T {
  if (
    typeof value === 'object' &&
    value !== null &&
    'statusCode' in value &&
    'data' in value
  ) {
    return (value as { data: T }).data;
  }

  return value as T;
}

export const retrieveDashboardOverview = async (
  query: RetrieveDashboardOverviewQuery = {},
): Promise<RetrieveDashboardOverviewRes> => {
  const { data } = await API.get('/admin/dashboard/overview', {
    params: query,
  });

  return getPayload<RetrieveDashboardOverviewRes>(data);
};

export const retrieveDashboardAnalytics = async (
  query: RetrieveDashboardAnalyticsQuery = {},
): Promise<RetrieveDashboardAnalyticsRes> => {
  const { data } = await API.get('/admin/dashboard/analytics', {
    params: query,
  });

  return getPayload<RetrieveDashboardAnalyticsRes>(data);
};

export const retrieveDashboardPortfolioOverview = async (
  query: RetrieveDashboardPortfolioOverviewQuery = {},
): Promise<RetrieveDashboardPortfolioOverviewRes> => {
  const { data } = await API.get('/admin/dashboard/portfolio-overview', {
    params: query,
  });

  return getPayload<RetrieveDashboardPortfolioOverviewRes>(data);
};

export const retrieveDashboardTopProjects = async (
  query: RetrieveDashboardTopProjectsQuery = {},
): Promise<RetrieveDashboardTopProjectsRes> => {
  const { data } = await API.get('/admin/dashboard/top-projects', {
    params: query,
  });

  return getPayload<RetrieveDashboardTopProjectsRes>(data);
};

export const retrieveDashboardActivity = async (
  query: RetrieveDashboardActivityQuery = {},
): Promise<RetrieveDashboardActivityRes> => {
  const { data } = await API.get('/admin/dashboard/activity', {
    params: query,
  });

  return getPayload<RetrieveDashboardActivityRes>(data);
};
