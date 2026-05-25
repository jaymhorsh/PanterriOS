'use client';
import { format } from 'date-fns';
import { ChevronDown } from 'lucide-react';
import {
  DashboardMiniCardsSkeleton,
  DashboardPanelSkeleton,
  DashboardStatCardsSkeleton,
} from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useState } from 'react';
import { OverviewChartCard } from './OverviewChartCard';
import { OverviewCard } from './OverviewCard';
import {
  InvestorGrowthChart,
  InvestorGrowthChartItem,
} from './investorGrowthChart';
import { PortfolioDistributionChart } from './portfolioDistributionChart';
import RecentTransactions from './recentTransactions';
import TopProjects from './topProjects';
import {
  useRetrieveDashboardActivity,
  useRetrieveDashboardAnalytics,
  useRetrieveDashboardOverview,
  useRetrieveDashboardTopProjects,
} from '@/hook/dashboard';

export function OverviewView() {
  const todaysDate = new Date();
  const [date, setDate] = useState<Date>(todaysDate);
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const { data: overviewCardData, isLoading: isOverviewLoading } =
    useRetrieveDashboardOverview({
      month,
      year,
    });

  const { data: analyticData, isLoading: isAnalyticsLoading } =
    useRetrieveDashboardAnalytics({
      month,
      year,
    });
  const { data: activitiesData, isLoading: isActivityLoading } =
    useRetrieveDashboardActivity({
      month,
      year,
    });
  const { data: topProjectsData, isLoading: isTopProjectsLoading } =
    useRetrieveDashboardTopProjects({
      month,
      year,
    });

  const overviewData = overviewCardData?.data.cards;
  const analyticsData = analyticData?.data;
  const investorGrowthChartData: InvestorGrowthChartItem[] =
    analyticsData?.investorGrowth.map((item) => ({
      year: item.label,
      value: item.totalInvestors,
      label: 'Registered investors',
    })) ?? [];
  const activityData = activitiesData?.data.recentTransactions;
  const topProjects = topProjectsData?.data.projects;
  const pendingWithdrawal =
    overviewCardData?.data.cards.vaultBalance.pendingWithdrawals.count;

  return (
    <div className=" space-y-5">
      <div className="flex justify-between items-starts">
        <div>
          <h1 className="lg:text-3xl  text-xl font-bold">Dashboard</h1>
          <p>Investment and platform overview</p>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              data-empty={!date}
              className=" flex justify-start text-left font-normal data-[empty=true]:text-white text-white bg-[#45556C]"
            >
              <span className="hideen lg:inline-flex">
                {date ? format(date, 'PPP') : <span>Pick a date</span>}
              </span>
              <ChevronDown />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              required={true}
            />
          </PopoverContent>
        </Popover>
      </div>

      {isOverviewLoading || !overviewData ? (
        <DashboardStatCardsSkeleton />
      ) : (
        <OverviewChartCard overviewChart={overviewData} />
      )}
      {isAnalyticsLoading || !analyticsData ? (
        <DashboardMiniCardsSkeleton />
      ) : (
        <OverviewCard
          analyticsData={analyticsData}
          pendingWithdrawal={pendingWithdrawal}
        />
      )}
      <div className="grid lg:grid-cols-2 gap-6">
        {isAnalyticsLoading || !analyticsData ? (
          <DashboardPanelSkeleton showChart={true} />
        ) : (
          <InvestorGrowthChart chartData={investorGrowthChartData} />
        )}
        <PortfolioDistributionChart />
      </div>
      <div className="grid lg:grid-cols-2 gap-6 max-h-150 overflow-y-auto">
        {isActivityLoading ? (
          <DashboardPanelSkeleton rows={5} />
        ) : (
          <RecentTransactions transactions={activityData ?? []} />
        )}
        {isTopProjectsLoading ? (
          <DashboardPanelSkeleton rows={6} />
        ) : (
          <TopProjects projects={topProjects ?? []} />
        )}
      </div>
    </div>
  );
}
