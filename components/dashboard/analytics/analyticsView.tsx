'use client';
import { PageHead } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Plus } from 'lucide-react';
import { useState } from 'react';
import { Forecasts } from './forecast/forecasts';
import { SubmarketRankings } from './submarket/submarketRankings';
import { InvestmentInsights } from './investmentInsight/investmentInsights';
import Link from 'next/link';

export function AnalyticsView() {
  const [activeTab, setActiveTab] = useState('insights');
  const tabs = [
    {
      title: 'Investment Insights',
      value: 'insights',
      content: <InvestmentInsights />,
    },
    {
      title: 'Submarket Rankings',
      value: 'rankings',
      content: <SubmarketRankings />,
    },
    {
      title: 'Forecasts',
      value: 'forecasts',
      content: <Forecasts />,
    },
  ];
  return (
    <div className="w-full space-y-6 px-0">
      <PageHead
        pageTitle="Analytics"
        subTitle="Market intelligence and investment recommendations"
      >
        {activeTab === 'insights' && (
          <div className="flex lg:gap-5 gap-2">
            <Button
              className="flex h-9 items-center gap-2 rounded-sm px-3 text-xs sm:h-10 sm:text-sm"
              variant={'outline'}
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export Data</span>
            </Button>
            <Link href="/analytics/create-insight">
              <Button className="flex h-9 items-center gap-2 rounded-sm px-3 text-xs sm:h-10 sm:text-sm">
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Add Insight</span>
                <span className="sm:hidden">Add</span>
              </Button>
            </Link>
          </div>
        )}
        {activeTab === 'rankings' && (
          <div className="flex lg:gap-5 gap-2">
            <Button
              className="flex h-9 items-center gap-2 rounded-sm px-3 text-xs sm:h-10 sm:text-sm"
              variant={'outline'}
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export Data</span>
            </Button>
            <Link href="/analytics/create-insight">
              <Button className="flex h-9 items-center gap-2 rounded-sm px-3 text-xs sm:h-10 sm:text-sm">
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">AAdd Submarket</span>
                <span className="sm:hidden">Add</span>
              </Button>
            </Link>
          </div>
        )}
      </PageHead>
      <div className="flex flex-col gap-4 rounded-2xl   bg-white p-4 lg:flex-row lg:items-start lg:justify-between">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <TabsList className="inline-flex h-auto w-fit justify-start gap-3 rounded-none bg-slate-100 p-0">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="rounded-md px-4 py-3 text-sm font-medium text-gray-900 data-[state=active]:bg-black data-[state=active]:text-white"
                >
                  {tab.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className="pt-6">
            {tabs.map((tab) => (
              <TabsContent key={tab.value} value={tab.value}>
                {tab.content}
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </div>
  );
}
