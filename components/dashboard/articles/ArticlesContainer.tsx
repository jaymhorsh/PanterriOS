'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  BriefcaseBusiness,
  FileText,
  Plus,
  Star,
  TrendingUp,
} from 'lucide-react';
import { PageHead, StatCard } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { ReusableSelect } from '@/components/ui/ReusableSelect';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PublishedArticles, CrawledQueue, Drafts } from './tabs';
import { useRetrieveArticles } from '@/hook/articles/useRetrieveArticles';

const categoryOptions = [
  { label: 'All Categories', value: 'all' },
  { label: 'Technology', value: 'technology' },
  { label: 'Finance', value: 'finance' },
  { label: 'Business', value: 'business' },
];

const tabCounts = {
  published: 6,
  crawled: 3,
  drafts: 4,
};

export default function ArticlesContainer() {
  const [activeTab, setActiveTab] = useState('published');
  const [category, setCategory] = useState('all');
  const { data: crawledArticles } = useRetrieveArticles({});

  const stats = [
    {
      label: 'Total Articles',
      value: 8,
      description: '6 published',
      icon: FileText,
      color: 'text-gray-900',
      iconColor: 'text-[#255FDE]',
      bgColor: 'bg-[#DDEBFF]',
    },
    {
      label: 'Crawled Queue',
      value: 5,
      description: 'Awaiting review',
      icon: BriefcaseBusiness,
      color: 'text-gray-900',
      iconColor: 'text-[#0AA84F]',
      bgColor: 'bg-[#D6F1E1]',
    },
    {
      label: "Editor's Picks",
      value: 3,
      description: 'Featured content',
      icon: Star,
      color: 'text-gray-900',
      iconColor: 'text-[#CF8C00]',
      bgColor: 'bg-[#F8F2B7]',
    },
    {
      label: 'Total Views',
      value: '16,764',
      description: 'This month',
      icon: TrendingUp,
      color: 'text-gray-900',
      iconColor: 'text-[#8B23E8]',
      bgColor: 'bg-[#EBD9FA]',
    },
  ];

  const tabs = useMemo(
    () => [
      {
        title: 'Published Articles',
        value: 'published',
        count: tabCounts.published,
        content: <PublishedArticles category={category} />,
      },
      {
        title: 'Crawled Queue',
        value: 'crawled',
        count: crawledArticles
          ? crawledArticles.meta.pagination.total_count
          : 0,
        content: <CrawledQueue article={crawledArticles!} />,
      },
      {
        title: 'Drafts',
        value: 'drafts',
        count: tabCounts.drafts,
        content: <Drafts category={category} />,
      },
    ],
    [category, crawledArticles],
  );

  return (
    <div className="w-full space-y-6 px-0">
      <PageHead
        pageTitle="Articles Management"
        subTitle="Manage platform content, crawled articles, and editors picks"
      >
        <Link href="/articles/create-article">
          <Button className="flex h-9 items-center gap-2 rounded-sm px-3 text-xs sm:h-10 sm:text-sm">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Create Article</span>
            <span className="sm:hidden">Create</span>
          </Button>
        </Link>
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

      <div className="flex flex-col gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-4 lg:flex-row lg:items-start lg:justify-between">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <TabsList className="inline-flex h-auto w-fit justify-start gap-3 rounded-none bg-slate-100 p-0">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="rounded-md px-4 py-3 text-sm font-medium text-gray-900 data-[state=active]:bg-black data-[state=active]:text-white"
                >
                  <span>{tab.title}</span>
                  {tab.count > 0 ? (
                    <span className="ml-2 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-[#2563EB] px-2 text-sm font-semibold text-white data-[state=active]:bg-white data-[state=active]:text-black">
                      {tab.count}
                    </span>
                  ) : null}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="w-full lg:w-[240px]">
              <ReusableSelect
                value={category}
                onChange={setCategory}
                placeholder="All Categories"
                items={categoryOptions}
              />
            </div>
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
