import { cn } from "@/lib/utils";

interface ResolutionPhaseProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function ResolutionPhase({ className }: ResolutionPhaseProps) {
  return (
    <div
      className={cn(
        className,
        "flex-col items-center justify-center space-y-4 lg:mb-4"
      )}
    >
      <h3 className="text-center text-2xl font-bold text-white lg:text-4xl">
        Trading has ended. Resolution taking place...
      </h3>
    </div>
  );
}
