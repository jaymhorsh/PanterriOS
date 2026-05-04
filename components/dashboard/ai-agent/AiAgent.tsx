"use client";

import {
  Bot,
  CircleCheck,
  Clock3,
  Play,
  Settings,
  Sparkles,
  SquareActivity,
  Globe,
} from "lucide-react";
import { PageHead, StatCard } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { AIAgentsPageSkeleton } from "@/components/shared/loader";
import { useRetrieveAIAgentsMonitor } from "@/hook/ai-agents";

function formatTime(value?: string | null) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    month: "short",
    day: "numeric",
  });
}

function getStatusTone(status?: string) {
  const normalized = (status ?? "").toLowerCase();

  if (normalized === "active") {
    return "border-[#BBF7D0] capitalize bg-[#F0FDF4] text-[#15803D]";
  }

  if (normalized === "idle") {
    return "border-[#FEF3C7] capitalize bg-[#FFFBEB] text-[#B45309]";
  }

  return "border-[#E5E7EB] capitalize bg-white text-[#475569]";
}

function getActivityDotTone(status?: string) {
  const normalized = (status ?? "").toLowerCase();

  if (normalized === "success") return "bg-[#22C55E]";
  if (normalized === "error") return "bg-[#EF4444]";
  return "bg-[#3B82F6]";
}

const AIAgentContainer = () => {
  const { data, isLoading } = useRetrieveAIAgentsMonitor();

  if (isLoading) {
    return <AIAgentsPageSkeleton />;
  }

  const overview = data?.data?.overview;
  const agents = data?.data?.agents ?? [];
  const recentActivity = data?.data?.recentActivity ?? [];

  const stats = [
    {
      label: "Active Agents",
      value: overview?.activeAgents ?? 0,
      description: "All running",
      icon: Bot,
      color: "text-gray-900",
      iconColor: "text-[#155DFC]",
      bgColor: "bg-[#DBEAFE]",
    },
    {
      label: "Avg Success Rate",
      value: `${overview?.avgSuccessRate ?? 0}%`,
      description: "Last 30 days",
      icon: Sparkles,
      color: "text-gray-900",
      iconColor: "text-[#16A34A]",
      bgColor: "bg-[#DCFCE7]",
    },
    {
      label: "Items Found Today",
      value: overview?.itemsFoundToday ?? 0,
      description: "Pending review",
      icon: SquareActivity,
      color: "text-gray-900",
      iconColor: "text-[#D97706]",
      bgColor: "bg-[#FEF3C7]",
    },
    {
      label: "Last Crawl",
      value: formatTime(overview?.lastCrawl),
      description: "Today",
      icon: Clock3,
      color: "text-gray-900",
      iconColor: "text-[#8B5CF6]",
      bgColor: "bg-[#EDE9FE]",
    },
  ];

  return (
    <div className="w-full space-y-6 px-0">
      <PageHead
        pageTitle="AI Agents Monitor"
        subTitle="Monitor and control automated content discovery agents"
      >
        {/* <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="h-9 rounded-sm px-3 text-sm sm:h-10"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button className="h-9 rounded-sm bg-black px-3 text-sm text-white hover:bg-black/90 sm:h-10">
            <Play className="h-4 w-4" />
            Run Now
          </Button>
        </div> */}
      </PageHead>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4 sm:gap-3">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            label={stat.label}
            value={stat.value}
            description={stat.description}
            Icon={stat.icon}
            iconColor={stat.iconColor}
            bgColor={stat.bgColor}
            color={stat.color}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {agents.map((agent) => (
          <div
            key={agent.name}
            className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#DBEAFE]">
                  <Bot className="h-6 w-6 text-[#155DFC]" />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  className="h-9 rounded-sm px-3 text-sm"
                >
                  <Settings className="h-4 w-4" />
                  Configure
                </Button>
                <Button className="h-9 rounded-sm bg-black px-3 text-sm text-white hover:bg-black/90">
                  <Play className="h-4 w-4" />
                  Run Now
                </Button>
              </div>
            </div>

            <div className="mt-4 flex flex-col items-ceter justify-between">
              <div>
                <h3 className="text-xl font-semibold text-[#111827]">
                  {agent.name}
                </h3>
                <p className="text-sm py-2 text-[#64748B]">
                  {agent.type === "article"
                    ? "Content Discovery"
                    : "Event Discovery"}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className={`inline-flex items-center gap-2 rounded-sm border px-3 py-1 text-sm font-medium ${getStatusTone(
                    agent.operationalStatus,
                  )}`}
                >
                  <CircleCheck className="h-4 w-4 text-[#16A34A]" />
                  {agent.operationalStatus}
                </span>

                <p className="text-sm text-[#64748B]">
                  Success Rate:{" "}
                  <span className="ml-2 font-medium text-[#111827]">
                    {agent.successRate}%
                  </span>
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3 text-sm">
              <div className="flex justify-between">
                <p className="text-[#64748B] flex-1">Last Run</p>
                <p className="font-medium flex-1 text-[#111827]">
                  {formatTime(agent.lastRun)}
                </p>
              </div>

              <div className="flex justify-between">
                <p className="text-[#64748B] flex-1">Items Found</p>
                <p className="font-medium flex-1 text-[#111827]">
                  {agent.itemsFound} items
                </p>
              </div>

              <div className="flex justify-between">
                <p className="text-[#64748B]  flex-1">Next Scheduled Run</p>
                <p className="font-medium text-[#111827] flex-1">
                  {formatTime(agent.nextScheduledRun)}
                </p>
              </div>

              <div className="flex justify-between">
                <p className="text-[#64748B] flex-1">Status</p>
                <p className="font-medium capitalize text-[#16A34A] flex-1">
                  {agent.status}
                </p>
              </div>
            </div>

            <div className="  border-[#E5E7EB] pt-4">
              <p className="text-sm font-semibold text-[#111827]  flex items-center gap-2">
                <Globe className="h-4 w-4 text-[#64748B] fex-1" /> Institutional
                Sources
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {agent.sources.map((source) => (
                  <span
                    key={source}
                    className="rounded-sm border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-1 text-sm text-[#334155]"
                  >
                    {source}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="-2xl border border-[#E5E7EB] rounded-md bg-white">
        <div className="border-b border-[#E5E7EB] px-6 py-4">
          <h3 className="text-lg font-semibold text-[#111827]">
            Recent Activity
          </h3>
        </div>

        <div className="space-y-4 p-6">
          {recentActivity.length === 0 ? (
            <p className="text-center text-sm text-[#64748B]">
              No recent activity
            </p>
          ) : (
            recentActivity.map((activity, index) => (
              <div
                key={`${activity.agentName}-${index}`}
                className="flex items-start gap-4 rounded-lg bg-[#F8FAFC] px-5 py-4"
              >
                <span
                  className={`mt-2 h-3 w-3 shrink-0 rounded-full ${getActivityDotTone(activity.status)}`}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-[#111827]">
                    {activity.agentName}
                  </p>
                  <p className="mt-1 text-sm text-[#64748B]">
                    {activity.message}
                  </p>
                  <p className="mt-2 inline-flex items-center gap-1 text-xs text-[#64748B]">
                    <Clock3 className="h-3.5 w-3.5" />
                    {formatTime(activity.timestamp)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AIAgentContainer;
