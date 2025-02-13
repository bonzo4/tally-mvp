import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface TradePhaseProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function TradePhase({ className }: TradePhaseProps) {
  return (
    <div
      className={cn(
        className,
        "flex-col items-center justify-center space-y-4 rounded-xl p-4 lg:mb-20 lg:space-y-8 lg:bg-tally-layer-1/80 lg:p-8"
      )}
    >
      <h3 className="text-2xl font-bold text-white lg:text-6xl">
        Trading has started!
      </h3>
      <Link href="/">
        <Button className="bg-tally-primary text-black hover:bg-tally-secondary hover:text-black">
          Start trading!
        </Button>
      </Link>
    </div>
  );
}
