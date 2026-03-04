'use client';

import { ReUseAbleTable } from '@/components/shared/reusableTable';
import { DUMMY_TRANSACTIONS } from '../../data';
import { transactionColumns } from '../all-transactions/transactionColumns';


export function Reconciliation() {
  // Show first 3 transactions as reconciliation items for now
  const reconciliationData = DUMMY_TRANSACTIONS.slice(0, 3);

  return (
    <div className="w-full space-y-6">
 
        <ReUseAbleTable
          data={reconciliationData}
          columns={transactionColumns}
          entityName="reconciliation items"
        />
     
    </div>
  );
}