import { DashboardOverviewCards } from '@/interface';
import { OverViewPieChart } from './OverViewPieChart';
import { formatCurrencyValue } from '@/utils/helpers';
import { ArrowDown, ArrowUp } from 'lucide-react';
interface ChartData {
  title: string;
  value: string | number;
  chartValue: number;
  percentage: number;
  target?: string | number;
  targetValue?: number;
  percentageDes?: string;
  color: string;
  percentageMovement: string;
}
export function OverviewChartCard({
  overviewChart,
}: {
  overviewChart: DashboardOverviewCards;
}) {
  const cardsChartData: ChartData[] = [
    {
      title: 'Total Investors',
      value: overviewChart?.totalInvestors.value ?? '0',
      chartValue: overviewChart?.totalInvestors.value,
      percentageDes: `vs last month`,
      percentage: overviewChart?.totalInvestors.changePercentage,
      percentageMovement: overviewChart?.totalInvestors.changePercentage
        .toString()
        .includes('-')
        ? 'down'
        : 'up',
      target: overviewChart?.totalInvestors.target,
      targetValue: overviewChart?.totalInvestors.target,
      color: '#00C64B',
    },
    {
      title: 'Total Invested',
      value: formatCurrencyValue(overviewChart?.totalInvested.value ?? 0),
      chartValue: overviewChart?.totalInvested.value,
      percentageDes: `vs last month`,
      percentage: overviewChart?.totalInvested.changePercentage,
      percentageMovement: overviewChart?.totalInvested.changePercentage
        .toString()
        .includes('-')
        ? 'down'
        : 'up',
      target: formatCurrencyValue(overviewChart?.totalInvested.target ?? 0),
      targetValue: overviewChart?.totalInvested.target,
      color: '#155DFC',
    },
    {
      title: 'Active Investments',
      value: overviewChart?.totalInvestments.value,
      chartValue: overviewChart?.totalInvestments.value,
      percentageDes: `new this month`,
      percentage: overviewChart?.totalInvestments.progressPercentage,
      percentageMovement: overviewChart?.totalInvestments.progressPercentage
        .toString()
        .includes('-')
        ? 'down'
        : 'up',
      target: overviewChart?.totalInvestments.target,
      targetValue: overviewChart?.totalInvestments.target,
      color: '#9961F7',
    },
    {
      title: 'Vault Balance',
      value: formatCurrencyValue(overviewChart?.vaultBalance.value ?? 0),
      chartValue: overviewChart?.vaultBalance.value,
      percentageDes: `(payouts)`,
      percentage: overviewChart?.vaultBalance.changePercentage,
      percentageMovement: overviewChart?.vaultBalance.changePercentage
        .toString()
        .includes('-')
        ? 'down'
        : 'up',
      color: '#FFC633',
      targetValue: overviewChart?.vaultBalance.value,
    },
  ];
  return (
    <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cardsChartData.map((chart, i) => (
        <div
          className="rounded-lg border border-[#E9EDF5] bg-white p-4"
          key={i}
        >
          <div className="space-y-3">
            <div className="text-[20px] font-bold text-[#344054]">
              {chart.title}
            </div>
            <p
              className={`flex items-center gap-2 text-sm font-medium
                 ${chart.percentageMovement === 'up' ? 'text-primary-green' : 'text-primary-red'}`}
            >
              {chart.percentageMovement === 'up' ? (
                <ArrowUp className="h-3 w-3" />
              ) : (
                <ArrowDown className="h-3 w-3" />
              )}
              {chart.percentage}% {chart.percentageDes}
            </p>
            <OverViewPieChart chart={chart} />
          </div>
        </div>
      ))}
    </div>
  );
}
