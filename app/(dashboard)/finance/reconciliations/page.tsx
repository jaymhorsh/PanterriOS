import { FinancePageShell, Reconciliation } from "@/components/dashboard/finance";

export default function ReconciliationPage() {
  return (
    <FinancePageShell
      title="Wallet and Finance"
      subtitle="Track and verify reconciliation records"
    >
      <Reconciliation />
    </FinancePageShell>
  );
}