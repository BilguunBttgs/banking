import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BankTabItem } from "./BankTabItem";
import BankInfo from "./BankInfo";
import TransactionsTable from "./TransactionsTable";

const RecentTransaction = ({
  accounts,
  transactions,
  appwriteItemId,
  page = 1,
}: RecentTransactionsProps) => {
  return (
    <section
      className="recent-transactions
  "
    >
      <header className="flex items-center justify-between">
        <h2 className="recent-transaction-label">Recent transactions</h2>
        <Link
          className="view-all-btn"
          href={`/transaction-history/?id=${appwriteItemId}`}
        >
          View all
        </Link>
      </header>
      <Tabs defaultValue={appwriteItemId} className="w-full">
        <TabsList className="recent-transaction-tablist">
          {accounts.map((account: Account) => (
            <TabsTrigger key={account.id} value={account.appwriteItemId}>
              <BankTabItem account={account} appwriteItemId={appwriteItemId} />
            </TabsTrigger>
          ))}
        </TabsList>
        {accounts.map((account: Account) => (
          <TabsContent key={account.id} value={account.appwriteItemId}>
            <BankInfo
              account={account}
              appwriteItemId={appwriteItemId}
              type="full"
            />
            <TransactionsTable transactions={transactions} />
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};

export default RecentTransaction;
