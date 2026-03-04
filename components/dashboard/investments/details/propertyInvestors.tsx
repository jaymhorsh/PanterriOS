import { ReUseAbleTable } from '@/components/shared/reusableTable';
import { Input } from '@/components/ui/input';
import { ColumnDef } from '@tanstack/react-table';

interface PropertyInvestorsData {
  name: string;
  investment_amount: {
    currency: string;
    value: number;
    formatted: string;
  };
  payment_status: string;
  investment_date: string;
  stake: {
    value: number;
    unit: string;
    formatted: string;
  };
}
export default function PropertyInvestors() {
  const property_investors = [
    {
      name: 'Chidi Okonkwo',
      investment_amount: {
        currency: 'NGN',
        value: 5000000,
        formatted: '₦5.00M',
      },
      payment_status: 'Paid',
      investment_date: '2025-01-15',
      stake: {
        value: 10,
        unit: 'percent',
        formatted: '10.00%',
      },
    },
    {
      name: 'Kemi Adeleke',
      investment_amount: {
        currency: 'NGN',
        value: 2000000,
        formatted: '₦2.00M',
      },
      payment_status: 'Pending',
      investment_date: '2025-01-20',
      stake: {
        value: 4,
        unit: 'percent',
        formatted: '4.00%',
      },
    },
    {
      name: 'Kemi Adeleke',
      investment_amount: {
        currency: 'NGN',
        value: 2000000,
        formatted: '₦2.00M',
      },
      payment_status: 'Pending',
      investment_date: '2025-01-20',
      stake: {
        value: 4,
        unit: 'percent',
        formatted: '4.00%',
      },
    },
    {
      name: 'Chidi Okonkwo',
      investment_amount: {
        currency: 'NGN',
        value: 5000000,
        formatted: '₦5.00M',
      },
      payment_status: 'Paid',
      investment_date: '2025-01-15',
      stake: {
        value: 10,
        unit: 'percent',
        formatted: '10.00%',
      },
    },
    {
      name: 'Chidi Okonkwo',
      investment_amount: {
        currency: 'NGN',
        value: 5000000,
        formatted: '₦5.00M',
      },
      payment_status: 'Paid',
      investment_date: '2025-01-15',
      stake: {
        value: 10,
        unit: 'percent',
        formatted: '10.00%',
      },
    },
    {
      name: 'Chidi Okonkwo',
      investment_amount: {
        currency: 'NGN',
        value: 5000000,
        formatted: '₦5.00M',
      },
      payment_status: 'Paid',
      investment_date: '2025-01-15',
      stake: {
        value: 10,
        unit: 'percent',
        formatted: '10.00%',
      },
    },
    {
      name: 'Chidi Okonkwo',
      investment_amount: {
        currency: 'NGN',
        value: 5000000,
        formatted: '₦5.00M',
      },
      payment_status: 'Paid',
      investment_date: '2025-01-15',
      stake: {
        value: 10,
        unit: 'percent',
        formatted: '10.00%',
      },
    },
    {
      name: 'Chidi Okonkwo',
      investment_amount: {
        currency: 'NGN',
        value: 5000000,
        formatted: '₦5.00M',
      },
      payment_status: 'Paid',
      investment_date: '2025-01-15',
      stake: {
        value: 10,
        unit: 'percent',
        formatted: '10.00%',
      },
    },
    {
      name: 'Kemi Adeleke',
      investment_amount: {
        currency: 'NGN',
        value: 2000000,
        formatted: '₦2.00M',
      },
      payment_status: 'Pending',
      investment_date: '2025-01-20',
      stake: {
        value: 4,
        unit: 'percent',
        formatted: '4.00%',
      },
    },
  ];
  const columns: ColumnDef<PropertyInvestorsData>[] = [
    {
      accessorKey: 'name',
      header: '',
      cell: ({ row }) => {
        const name = row.original.name;
        const date = row.original.investment_date;
        return (
          <div className="">
            <p>{name} </p>
            <small className="text-gray-500 flex items-center gap-1">
              {date}
            </small>
          </div>
        );
      },
    },

    {
      accessorKey: 'amount',
      header: '',
      cell: ({ row }) => {
        const amount = row.original.investment_amount.formatted;
        const stake = row.original.stake.formatted;
        return (
          <div className=" text-right">
            <p>{amount} </p>
            <small className="text-gray-500">{stake}</small>
          </div>
        );
      },
    },

    {
      accessorKey: 'status',
      header: ' ',
      cell: ({ row }) => {
        const status = row.original.payment_status;
        return (
          <div
            className={`text-center items-center justify-center capitalize whitespace-nowrap p-1 rounded-sm  flex mx-auto  w-20 ${status.toLowerCase() === 'paid' ? ' bg-green-50 text-green-500 border border-green-300 ' : ' bg-orange-50 text-orange-500  border border-orange-300 '}`}
          >
            <span> {status}</span>
          </div>
        );
      },
    },
  ];
  return (
    <div className="border p-2 space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">Active Investors</h2>
          <small>42 investors • ₦50.0M total</small>
        </div>
        <Input placeholder=" search investors..." className="bg-gray-100" />
      </div>
      <ReUseAbleTable data={property_investors} columns={columns} />
    </div>
  );
}
