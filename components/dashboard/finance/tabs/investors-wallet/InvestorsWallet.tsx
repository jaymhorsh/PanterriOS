'use client';
import { useMemo } from 'react';
import { ReUseAbleTable } from '@/components/shared/reusableTable';
import { DUMMY_TRANSACTIONS } from '../../data';
import { transactionColumns } from '../all-transactions/transactionColumns';
import { Transaction } from '../../types';


interface InvestorsWalletProps {
  searchValue?: string;
  filterType?: string;
  filterStatus?: string;
  filterTime?: string;
}

function filterWalletData(
  transactions: Transaction[],
  searchValue?: string,
  filterType?: string,
  filterStatus?: string,
  filterTime?: string
): Transaction[] {
  return transactions.filter((transaction) => {
    if (searchValue && searchValue.trim()) {
      const lowerSearch = searchValue.toLowerCase();
      const matchesSearch =
        transaction.reference.toLowerCase().includes(lowerSearch) ||
        transaction.investor.toLowerCase().includes(lowerSearch) ||
        transaction.formattedAmount.toLowerCase().includes(lowerSearch);
      if (!matchesSearch) return false;
    }

    if (filterType && filterType !== 'all') {
      if (transaction.type !== filterType) return false;
    }

    if (filterStatus && filterStatus !== 'all') {
      if (transaction.status !== filterStatus) return false;
    }

    if (filterTime && filterTime !== 'all') {
      const today = new Date();
      const txnDate = new Date(transaction.date);
      
      switch (filterTime) {
        case 'today':
          return txnDate.toDateString() === today.toDateString();
        case 'week':
          const weekAgo = new Date(today);
          weekAgo.setDate(weekAgo.getDate() - 7);
          return txnDate >= weekAgo;
        case 'month':
          const monthAgo = new Date(today);
          monthAgo.setMonth(monthAgo.getMonth() - 1);
          return txnDate >= monthAgo;
        default:
          return true;
      }
    }

    return true;
  });
}

export function InvestorsWallet({
  searchValue = '',
  filterType = 'all',
  filterStatus = 'all',
  filterTime = 'all',
}: InvestorsWalletProps) {
  const filteredData = useMemo(
    () => filterWalletData(DUMMY_TRANSACTIONS, searchValue, filterType, filterStatus, filterTime),
    [searchValue, filterType, filterStatus, filterTime]
  );

  return (
    <div className="w-full space-y-4">
     
        <ReUseAbleTable
          data={filteredData}
          columns={transactionColumns}
          entityName="investor wallets"
        />
    
    </div>
  );
}