
import {
  AllTransactions,
  FinancePageShell,
} from "@/components/dashboard/finance";

export default function TransactionsPage() {
  return (
    <FinancePageShell
      title="Wallet and Finance"
      subtitle="Manage platform finances and transactions"
    >
      <AllTransactions />
    </FinancePageShell>
  );
}
