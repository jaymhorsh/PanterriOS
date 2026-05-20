import {
  AIAgentCrawlResponse,
  AIAgentStatsResponse,
  AIAgentEnabledSitesResponse,
} from "@/interface/ai-agents";
import { CRAWLER_API } from "./axios";

export const aiAgentsMonitor = async (): Promise<AIAgentStatsResponse> => {
  const { data } = await CRAWLER_API.get("/crawler/monitor");
  return data;
};

export const aiAgentCrawl = async (): Promise<AIAgentCrawlResponse> => {
  const { data } = await CRAWLER_API.post("/crawler/crawl-all");
  return data;
};

export const aiAgentCrawlSite = async (
  siteUrl: string,
): Promise<AIAgentCrawlResponse> => {
  const { data } = await CRAWLER_API.post(`/crawler/crawl/${siteUrl}`);
  return data;
};

export const aiAgentCrawlEnabledSites =
  async (): Promise<AIAgentEnabledSitesResponse> => {
    const { data } = await CRAWLER_API.get("/crawler/sites/enabled");
    return data;
  };
