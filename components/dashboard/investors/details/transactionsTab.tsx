import { ReUseAbleTable } from '@/components/shared/reusableTable';
import { ColumnDef } from '@tanstack/react-table';
interface TransactionsProp {
  date: string;
  type: string;
  description: string;
  amount: {
    currency: string;
    value: number;
    formatted: string;
    direction: string;
  };
}

export function TransactionTable() {
  const transactions = [
    {
      date: '2024-01-15',
      type: 'Deposit',
      description: 'Wallet funding via bank transfer',
      amount: {
        currency: 'NGN',
        value: 5000000,
        formatted: '+₦5.0M',
        direction: 'credit',
      },
    },
    {
      date: '2024-01-16',
      type: 'Investment',
      description: 'Lekki Phase 1 Apartments',
      amount: {
        currency: 'NGN',
        value: 8500000,
        formatted: '-₦8.5M',
        direction: 'debit',
      },
    },
    {
      date: '2024-01-20',
      type: 'Returns',
      description: 'ROI payment - Ikoyi Plaza',
      amount: {
        currency: 'NGN',
        value: 1200000,
        formatted: '+₦1.2M',
        direction: 'credit',
      },
    },
    {
      date: '2024-01-20',
      type: 'Returns',
      description: 'ROI payment - Ikoyi Plaza',
      amount: {
        currency: 'NGN',
        value: 1200000,
        formatted: '+₦1.2M',
        direction: 'credit',
      },
    },
    {
      date: '2024-01-20',
      type: 'Returns',
      description: 'ROI payment - Ikoyi Plaza',
      amount: {
        currency: 'NGN',
        value: 1200000,
        formatted: '+₦1.2M',
        direction: 'credit',
      },
    },
    {
      date: '2024-01-20',
      type: 'Returns',
      description: 'ROI payment - Ikoyi Plaza',
      amount: {
        currency: 'NGN',
        value: 1200000,
        formatted: '+₦1.2M',
        direction: 'credit',
      },
    },
    {
      date: '2024-01-20',
      type: 'Returns',
      description: 'ROI payment - Ikoyi Plaza',
      amount: {
        currency: 'NGN',
        value: 1200000,
        formatted: '+₦1.2M',
        direction: 'credit',
      },
    },
  ];

  const columns: ColumnDef<TransactionsProp>[] = [
    {
      accessorKey: 'date',
      header: 'date',
      cell: ({ row }) => {
        return (
          <div className="  ">
            <p>{row.original.date} </p>
          </div>
        );
      },
    },
    {
      accessorKey: 'type',
      header: 'type',
      cell: ({ row }) => {
        const status = row.original.type.toLowerCase();
        return (
          <div className="">
            {' '}
            {status === 'investment' ? (
              <span className="text-xs text-gray-600 bg-gray-50 px-2 border border-gray-500 py-0.5 h-fit capitalize">
                {status}
              </span>
            ) : (
              <span className="text-xs text-green-600 bg-green-50 px-2 border border-green-500 py-0.5 h-fit capitalize">
                {status}
              </span>
            )}
          </div>
        );
      },
    },

    {
      accessorKey: 'description',
      header: 'description',
      cell: ({ row }) => (
        <div className=" font-medium">{row.original.description}</div>
      ),
    },
    {
      accessorKey: 'amount',
      header: 'amount',
      cell: ({ row }) => {
        const amount = row.original.amount.formatted;
        return (
          <div
            className={`font-medium ${amount.includes('+') ? 'text-green-500' : 'text-black'}`}
          >
            {amount}
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <ReUseAbleTable columns={columns} data={transactions} />
    </div>
  );
}
