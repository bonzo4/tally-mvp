import { Button } from "@/components/ui/button";
import { formatDollarsWithCents } from "@/lib/formats";

export default function Account() {
  const portfolio = 500;
  const balance = 1000;

  return (
    <div className="flex h-full flex-col justify-between space-y-4 rounded-2xl bg-zinc-900 p-6 lg:w-[420px]">
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
        <Button className="w-full border border-tally-primary bg-transparent text-tally-primary text-tally-primary hover:bg-tally-primary/10">
          Withdraw
        </Button>
        <Button className="w-full bg-tally-primary text-black hover:bg-tally-primary/90">
          Deposit
        </Button>
      </div>
    </div>
  );
}
