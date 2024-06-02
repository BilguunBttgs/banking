import HeaderBox from "@/components/HeaderBox";
import RecentTransaction from "@/components/RecentTransaction";
import RighSidebar from "@/components/RightSIdebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { getAccount, getAccounts } from "@/lib/actions/bank.actons";
import { getLoggedInUser } from "@/lib/actions/user.action";
import React from "react";

const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({ userId: loggedIn.$id });

  if (!accounts) return;
  const accountsData = accounts?.data;
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  const account = await getAccount({ appwriteItemId });
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || "Guest"}
            subtext="Acces and manage your account and transaction efficently"
          />
          <TotalBalanceBox
            accounts={accountsData}
            totalBanks={accounts?.totalBanks}
            totalCurrentBalance={accounts?.totalCurrentBalance}
          />
        </header>
        <RecentTransaction
          accounts={accountsData}
          transactions={account.transactions}
          appwriteItemId={appwriteItemId}
          page={currentPage}
        />
      </div>
      <RighSidebar
        user={loggedIn}
        transactions={[account?.transactions]}
        banks={accountsData?.slice(0, 2)}
      />
    </section>
  );
};

export default Home;
