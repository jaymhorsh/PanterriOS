import { AIAgentStatsResponse } from "@/interface/ai-agents";
import { CRAWLER_API } from "./axios";

export const aiAgentsMonitor = async (): Promise<AIAgentStatsResponse> => {
  const { data } = await CRAWLER_API.get("/crawler/monitor");
  return data;
};
