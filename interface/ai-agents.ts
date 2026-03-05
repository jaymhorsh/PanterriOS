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
