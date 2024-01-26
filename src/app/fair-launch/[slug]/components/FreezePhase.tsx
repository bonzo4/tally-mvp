import { cn } from "@/lib/utils";

interface FreezePhaseProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function FreezePhase({ className }: FreezePhaseProps) {
  return (
    <div
      className={cn(
        "flex-col items-center justify-center space-y-4 rounded-xl p-4 lg:mb-4 lg:bg-tally-layer-1/80 lg:p-8",
        className
      )}
    >
      <h3 className="text-center text-xl font-bold text-white lg:text-4xl">
        Fair launch has ended! Trading will begin in...
      </h3>
    </div>
  );
}
