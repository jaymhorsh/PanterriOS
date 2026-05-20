'use client';
import { DashboardanalyticsData } from '@/interface';
import {
  Banknote,
  Database,
  FileText,
  LucideIcon,
  Calendar as CalandarIcon,
} from 'lucide-react';
import Link from 'next/link';
interface CardData {
  title: string;
  value: string | number;
  desc: string;
  icon: LucideIcon;
  link?: string;
  color: string;
}
export function OverviewCard({
  analyticsData,
  pendingWithdrawal,
}: {
  analyticsData: DashboardanalyticsData;
  pendingWithdrawal: number;
}) {
  const cardData: CardData[] = [
    {
      title: 'Pending withdrawals',
      value: pendingWithdrawal,
      desc: 'Awaiting approval',
      link: '/',
      icon: Banknote,
      color: 'text-primary-red',
    },
    {
      title: 'Market Data',
      value: '2 hrs ago',
      desc: 'Last updated',
      link: '/',
      icon: Database,
      color: 'text-primary-blue',
    },
    {
      title: 'Events Queue',
      value: 17,
      desc: 'Pending approval',
      icon: CalandarIcon,
      color: 'text-primary-purple',
    },
    {
      title: 'Content Queue',
      value: 23,
      desc: 'Pending review',
      link: '/',
      icon: FileText,
      color: 'text-primary-green',
    },
  ];
  return (
    <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cardData.map((chart, i) => {
        const Icon = chart.icon;
        return (
          <div
            className="rounded-lg border border-[#E9EDF5] bg-white p-4 space-y-8"
            key={i}
          >
            <div className="flex justify-between">
              <div className="  text-[#344054] uppercase">{chart.title}</div>
              <Icon className={` ${chart.color} `} />
            </div>
            <div className="lg:text-3xl text-2xl font-bold"> {chart.value}</div>
            <div className="flex justify-between text-sm">
              <p className="">{chart.desc}</p>
              {chart.link && (
                <Link href={chart.link} className="text-primary-blue underline">
                  {' '}
                  view
                </Link>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
