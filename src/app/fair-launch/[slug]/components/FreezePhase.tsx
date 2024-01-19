import { cn } from "@/lib/utils";

interface FreezePhaseProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function FreezePhase({ className }: FreezePhaseProps) {
  return (
    <div
      className={cn(
        className,
        "flex-col items-center justify-center space-y-4 lg:mb-4"
      )}
    >
      <h3 className="text-center text-2xl font-bold text-white lg:text-4xl">
        Fair launch has ended! Trading will begin in...
      </h3>
    </div>
  );
}
