import { ReUseAbleTable } from '@/components/shared/reusableTable';
import { ColumnDef } from '@tanstack/react-table';
interface InvestmentsProp {
  property: string;
  location: string;
  amount: {
    currency: string;
    value: number;
    formatted: string;
  };
  roi: {
    value: number;
    unit: string;
    formatted: string;
  };
  status: string;
}

export function InvestmentsTable() {
  const investments = [
    {
      property: 'Lekki Phase 1 Apartments',
      location: 'Lagos',
      amount: {
        currency: 'NGN',
        value: 8500000,
        formatted: '₦8.5M',
      },
      roi: {
        value: 12,
        unit: 'percent',
        formatted: '12%',
      },
      status: 'Funded',
    },
    {
      property: 'Ikoyi Commercial Plaza',
      location: 'Lagos',
      amount: {
        currency: 'NGN',
        value: 15200000,
        formatted: '₦15.2M',
      },
      roi: {
        value: 18,
        unit: 'percent',
        formatted: '18%',
      },
      status: 'Active',
    },
    {
      property: 'Abuja Mixed Use Development',
      location: 'Abuja',
      amount: {
        currency: 'NGN',
        value: 12000000,
        formatted: '₦12.0M',
      },
      roi: {
        value: 15,
        unit: 'percent',
        formatted: '15%',
      },
      status: 'Active',
    },
    {
      property: 'Abuja Mixed Use Development',
      location: 'Abuja',
      amount: {
        currency: 'NGN',
        value: 12000000,
        formatted: '₦12.0M',
      },
      roi: {
        value: 15,
        unit: 'percent',
        formatted: '15%',
      },
      status: 'Active',
    },
    {
      property: 'Abuja Mixed Use Development',
      location: 'Abuja',
      amount: {
        currency: 'NGN',
        value: 12000000,
        formatted: '₦12.0M',
      },
      roi: {
        value: 15,
        unit: 'percent',
        formatted: '15%',
      },
      status: 'Active',
    },
  ];

  const columns: ColumnDef<InvestmentsProp>[] = [
    {
      accessorKey: 'property',
      header: 'Property',
      cell: ({ row }) => {
        return (
          <div className="  ">
            <p>{row.original.property} </p>
            <small className="text-gray-500">{row.original.location}</small>
          </div>
        );
      },
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({ row }) => (
        <div className="text-gray-400">{row.original.amount.formatted}</div>
      ),
    },

    {
      accessorKey: 'roi',
      header: 'roi',
      cell: ({ row }) => (
        <div className=" font-medium">{row.original.roi.formatted}</div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'status',
      cell: ({ row }) => {
        const status = row.original.status.toLowerCase();
        return (
          <div className="">
            {' '}
            {status === 'active' ? (
              <span className="text-xs text-green-600 bg-green-50 px-2 border border-green-500 py-0.5 h-fit capitalize">
                {status}
              </span>
            ) : (
              <span className="text-xs text-blue-600 bg-blue-50 px-2 border border-blue-500 py-0.5 h-fit ">
                {status}
              </span>
            )}
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <ReUseAbleTable columns={columns} data={investments} />
    </div>
  );
}
