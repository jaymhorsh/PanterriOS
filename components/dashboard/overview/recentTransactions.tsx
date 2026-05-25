'use client';
import { StatusBadge } from '@/components/shared';
import { DashboardActivityTransaction } from '@/interface';
import { dateAndTimeFormatter } from '@/utils/helpers';
import { ArrowDownLeft, ArrowUpRight, MoveUpRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const transactionTypeConfig: Record<
  string,
  {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    iconClassName: string;
  }
> = {
  deposit: {
    label: 'Deposit',
    icon: ArrowDownLeft,
    iconClassName: 'text-[#00A63E]',
  },
  investment: {
    label: 'Investment',
    icon: ArrowUpRight,
    iconClassName: 'text-[#2563FF]',
  },
  withdrawal: {
    label: 'Withdrawal',
    icon: MoveUpRight,
    iconClassName: 'text-[#E60000]',
  },
  yield: {
    label: 'Yield',
    icon: ArrowUpRight,
    iconClassName: 'text-[#12B76A]',
  },
  return: {
    label: 'Return',
    icon: ArrowUpRight,
    iconClassName: 'text-[#6B7A99]',
  },
};

export default function RecentTransactions({
  transactions,
}: {
  transactions: DashboardActivityTransaction[];
}) {
  return (
    <div className="rounded-lg border border-[#E9EDF5] bg-white p-5  lg:p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-bold  text-[#18233A] ">
            Recent Transactions
          </h3>
          <p className=" text-[#6B7A99] ">Latest investor activity</p>
        </div>

        <Link
          href="/finance/transactions"
          className="flex items-center gap-2 self-start  font-medium text-primary-blue transition-colors "
        >
          View All
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-8 space-y-5">
        {transactions.map((transaction) => {
          const transactionType = transaction.type.toLowerCase();
          const transactionConfig = transactionTypeConfig[transactionType];
          const TransactionIcon = transactionConfig.icon;

          return (
            <div key={transaction.id} className="rounded-lg bg-[#F7F9FC] p-5 ">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0 flex-1">
                  <h4 className="truncate font-semibold tracking-[-0.03em] text-[#18233A]">
                    {transaction.investorName}
                  </h4>

                  <div className="mt-3 flex flex-wrap items-center gap-2  text-[#6B7A99]">
                    <span className="flex items-center gap-3  font-medium text-[#101828]">
                      <TransactionIcon
                        className={`h-4 w-4 ${transactionConfig.iconClassName}`}
                      />
                      {transactionConfig.label}
                    </span>

                    {transaction.sourceService ? (
                      <>
                        <span className="text-[#98A2B3]">•</span>
                        <span>{transaction.sourceService}</span>
                      </>
                    ) : null}
                  </div>

                  <p className="mt-3 w-full text-[#98A9C6] truncate">
                    {transaction.reference}
                  </p>
                </div>

                <div className="flex w-full flex-col gap-2 lg:w-auto lg:min-w-[250px] lg:items-end">
                  <div className="text-right  font-bold tracking-[-0.04em] text-[#18233A]">
                    {transaction.amount}
                  </div>

                  <StatusBadge status={transaction.status} />

                  <div className="flex text-sm gap-6  text-[#4C6488] ">
                    <span>{dateAndTimeFormatter(transaction.occurredAt)}</span>
                    {/* <span>{transaction.time}</span> */}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
