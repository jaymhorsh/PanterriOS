import { useAnalyticsIntelligence } from '@/hook/analytics';
import { useState } from 'react';
import InsightIntelligence from './insightIntelligence';
import AnalyticsLoader from '@/components/shared/loader/analyticsLoader';
import { ReusableSelect } from '@/components/ui/ReusableSelect';

const signalOptions = [
  { label: 'All Type', value: 'all' },
  { label: 'Desposit', value: 'deposit' },
  { label: 'Withdrawal', value: 'withdrawal' },
  { label: 'Yield', value: 'yield' },
];
const impactOptions = [
  { label: 'Published', value: 'published' },
  { label: 'Unpublished', value: 'unpublished' },
];
export function InvestmentInsights() {
  const [impact, setImpact] = useState('');
  const [signalCategory, setSignalCategory] = useState('all');
  const { data, isLoading } = useAnalyticsIntelligence({
    page: 1,
    per_page: 20,
    signalCategory,
    status: impact.length > 0 ? impact : undefined,
  });

  const insights = data?.data ?? [];

  return (
    <div>
      {isLoading ? (
        <AnalyticsLoader />
      ) : (
        <>
          <div className=" grid lg:grid-cols-3 f lg:gap-5 gap-3  px-4 sm:px-6 lg:px-0 max-w-md">
            <ReusableSelect
              value={signalCategory}
              onChange={setSignalCategory}
              placeholder="All signals"
              items={signalOptions}
            />
            <ReusableSelect
              value={impact}
              onChange={setImpact}
              placeholder="All Status"
              items={impactOptions}
            />
          </div>
          <InsightIntelligence data={insights} />

          {/* <InvestmentScoreTable
        data={investmentScore}
        activeCity={activeCity}
        onCityChange={setCity}
      /> */}

          {/* <MarketInfrastructureGrid
            MarketShareData={marketShare}
            InfrastructureData={infrastructureProjects}
            activeCity={activeCity}
            onCityChange={setCity}
          /> */}
        </>
      )}
    </div>
  );
}
