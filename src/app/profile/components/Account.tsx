import { formatDollarsWithCents } from "@/lib/formats";
import DepositDialog from "./DepositDialog";
import WithdrawDialog from "./WithdrawDialog";

export default function Account({
  balance,
  portfolio,
  userId,
}: {
  balance: number;
  portfolio: number;
  userId: number;
}) {
  return (
    <div className="flex h-full w-full flex-col justify-between space-y-4 rounded-2xl bg-zinc-900 p-6 lg:w-[420px]">
      <h2 className="text-xl font-medium text-white">My Wallet</h2>
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <div className="text-gray-400">Portfolio</div>
          <div className="text-xl font-medium text-white">
            {formatDollarsWithCents(portfolio)}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-gray-400">Balance</div>
          <div className="text-xl font-medium text-white">
            {formatDollarsWithCents(balance)}
          </div>
        </div>
      </div>
      <div className="flex justify-evenly space-x-2">
        <WithdrawDialog userId={userId} />
        <DepositDialog userId={userId} />
      </div>
    </div>
  );
}
