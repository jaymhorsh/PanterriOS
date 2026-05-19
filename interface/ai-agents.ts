export interface Agents {
  name: string;
  type: string;
  status: string;
  successRate: number;
  lastRun: string | null;
  itemsFound: number;
  nextScheduledRun: string;
  operationalStatus: string;
  sources: string[];
}
export interface RecentActivities {
  agentName: string;
  message: string;
  status: string;
  timestamp: string;
}
export interface AIAgentStatsResponse {
  meta: {
    status_code: number;
    success: boolean;
  };
  data: {
    overview: {
      activeAgents: number;
      avgSuccessRate: number;
      itemsFoundToday: number;
      lastCrawl: string;
    };
    agents: Agents[];
    recentActivity: RecentActivities[];
  };
}

export interface AIAgentCrawlResponse {
  meta: {
    status_code: number;
    success: boolean;
    message: string;
  };
  data: {
    agents: Agents[];
  };
}

export interface AIAgentEnabledSitesResponse {
  meta: {
    status_code: number;
    success: boolean;
  };
  data: {
    sites: string[];
  };
}
