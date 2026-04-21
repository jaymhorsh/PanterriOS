import {
  ArticleFilters,
  ArticleStatusUpdateRes,
  CrawlerArticlesResponse,
  CreateArticleReq,
} from '@/interface/article.entity';
import { CRAWLER_API } from '@/services/axios';

export const retriveArticles = async (
  params: ArticleFilters,
): Promise<CrawlerArticlesResponse> => {
  const { data } = await CRAWLER_API.get('/articles', { params });
  return data;
};

export const createArticle = async (
  payload: CreateArticleReq,
): Promise<ArticleStatusUpdateRes> => {
  const { data } = await CRAWLER_API.post('/articles', payload);
  return data;
};

export const updateArticleStatus = async (
  id: string,
  status: string,
): Promise<ArticleStatusUpdateRes> => {
  const { data } = await CRAWLER_API.put(`/articles/${id}/status`, { status });
  return data;
};
