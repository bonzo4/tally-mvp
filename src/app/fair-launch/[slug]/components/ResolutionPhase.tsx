import { cn } from "@/lib/utils";

interface ResolutionPhaseProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function ResolutionPhase({ className }: ResolutionPhaseProps) {
  return (
    <div
      className={cn(
        className,
        "mt-4 flex-col items-center justify-center space-y-4 rounded-xl bg-tally-layer-2/80 p-4 lg:mb-4 lg:p-8"
      )}
    >
      <h3 className="text-center text-xl font-bold text-white lg:text-4xl">
        Trading has ended. Resolution taking place...
      </h3>
    </div>
  );
}
