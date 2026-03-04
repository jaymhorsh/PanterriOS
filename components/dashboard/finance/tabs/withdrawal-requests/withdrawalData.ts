export interface WithdrawalRequest {
  id: string;
  requestId: string;
  investor: string;
  investorDate: string;
  bank: string;
  bankAccount: string;
  amount: number;
  formattedAmount: string;
  amlRisk: 'Low Risk' | 'Medium Risk' | 'High Risk';
  status: 'Pending' | 'Processing' | 'Approved' | 'Rejected';
}

export const DUMMY_WITHDRAWAL_REQUESTS: WithdrawalRequest[] = [
  {
    id: '1',
    requestId: 'WTH-102',
    investor: 'Ibrahim K.',
    investorDate: '2026-02-04',
    bank: 'GTBank',
    bankAccount: '0123456789',
    amount: 1500000,
    formattedAmount: '₦1.50M',
    amlRisk: 'Low Risk',
    status: 'Pending',
  },
  {
    id: '2',
    requestId: 'WTH-105',
    investor: 'Aisha B.',
    investorDate: '2026-02-03',
    bank: 'Zenith Bank',
    bankAccount: '1122334455',
    amount: 300000,
    formattedAmount: '₦300,000',
    amlRisk: 'Low Risk',
    status: 'Processing',
  },
  {
    id: '3',
    requestId: 'WTH-108',
    investor: 'Chukwudi O.',
    investorDate: '2026-02-02',
    bank: 'Access Bank',
    bankAccount: '9988776655',
    amount: 20000,
    formattedAmount: '₦20,000',
    amlRisk: 'High Risk',
    status: 'Pending',
  },
  {
    id: '4',
    requestId: 'WTH-108',
    investor: 'Chukwudi O.',
    investorDate: '2026-02-02',
    bank: 'Access Bank',
    bankAccount: '9988776655',
    amount: 167000,
    formattedAmount: '₦167,000',
    amlRisk: 'High Risk',
    status: 'Pending',
  },
  {
    id: '5',
    requestId: 'WTH-111',
    investor: 'Folake J.',
    investorDate: '2026-02-01',
    bank: 'First Bank',
    bankAccount: '5544332211',
    amount: 58000,
    formattedAmount: '₦58,000',
    amlRisk: 'Low Risk',
    status: 'Approved',
  },
  {
    id: '6',
    requestId: 'WTH-111',
    investor: 'Folake J.',
    investorDate: '2026-02-01',
    bank: 'First Bank',
    bankAccount: '5544332211',
    amount: 5000,
    formattedAmount: '₦5,000',
    amlRisk: 'Medium Risk',
    status: 'Approved',
  },
  {
    id: '7',
    requestId: 'WTH-111',
    investor: 'Folake J.',
    investorDate: '2026-02-01',
    bank: 'First Bank',
    bankAccount: '5544332211',
    amount: 15000,
    formattedAmount: '₦15,000',
    amlRisk: 'Low Risk',
    status: 'Approved',
  },
];
