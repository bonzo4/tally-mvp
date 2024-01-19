import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChoiceMarket } from "@/lib/supabase/markets/subMarkets";
import { Database } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { formatDollarsWithoutCents } from "@/lib/formats";

type Color = Database["public"]["Enums"]["colors_enum"];

const borderCssMap: Record<Color, string> = {
  primary: "border-tally-primary",
  red: "border-tally-red",
  orange: "border-tally-orange",
  yellow: "border-tally-yellow",
  green: "border-tally-green",
  blue: "border-tally-blue",
  purple: "border-tally-purple",
  indigo: "border-tally-indigo",
  gray: "border-tally-gray",
  white: "border-tally-white",
};

const bgCssMap: Record<Color, string> = {
  primary: "bg-tally-primary",
  red: "bg-tally-red",
  orange: "bg-tally-orange",
  yellow: "bg-tally-yellow",
  green: "bg-tally-green",
  blue: "bg-tally-blue",
  purple: "bg-tally-purple",
  indigo: "bg-tally-indigo",
  gray: "bg-tally-gray",
  white: "bg-tally-white",
};

const textCssMap: Record<Color, string> = {
  primary: "text-tally-primary",
  red: "text-tally-red",
  orange: "text-tally-orange",
  yellow: "text-tally-yellow",
  green: "text-tally-green",
  blue: "text-tally-blue",
  purple: "text-tally-purple",
  indigo: "text-tally-indigo",
  gray: "text-tally-gray",
  white: "text-tally-white",
};

interface ClaimCardProps extends React.HTMLAttributes<HTMLDivElement> {
  choice: ChoiceMarket;
  winner: number;
}

function ClaimCard({ choice, winner, ...rest }: ClaimCardProps) {
  const { className } = rest;
  const color = choice.color || "primary";
  const isWinner = winner === choice.id;
  const borderCss = borderCssMap[color as keyof typeof borderCssMap];
  const bgCss = isWinner
    ? bgCssMap[color as keyof typeof bgCssMap]
    : "bg-tally-background";
  const textTitleCss = isWinner ? "text-black" : "text-white";
  const textPriceCss = isWinner
    ? "text-black"
    : textCssMap[color as keyof typeof textCssMap];
  const textPotCss = isWinner ? "text-tally-layer-2" : "text-tally-gray";

  return (
    <div
      className={cn(
        bgCss,
        borderCss,
        "relative flex flex-col rounded-2xl border p-4 lg:w-[351px]"
      )}
    >
      {isWinner ? (
        <Badge className="absolute left-2 top-2">Winner</Badge>
      ) : null}
      <div className="flex flex-col items-center">
        <div className="flex items-end space-x-2">
          <div className={cn(textTitleCss, "text-4xl font-medium")}>
            {choice.title}
          </div>
          <div className={cn(textPriceCss, "text-2xl")}>$.50</div>
        </div>
        <div
          className={cn(textPotCss, "text-sm")}
        >{`Total Pot: ${formatDollarsWithoutCents(choice.total_pot)}`}</div>
      </div>
    </div>
  );
}

interface ClaimCardsProps extends React.HTMLAttributes<HTMLDivElement> {
  choices: ChoiceMarket[];
  winner: number;
}

export function ClaimCardsDesktop({
  choices,
  winner,
  className,
  ...rest
}: ClaimCardsProps) {
  if (!choices) return;
  winner = choices[0].id;
  if (choices.length < 4) {
    return (
      <div className={cn(className, "hidden lg:flex lg:space-x-6")}>
        {choices.map((choice, index) => (
          <ClaimCard key={index} choice={choice} winner={winner} />
        ))}
      </div>
    );
  } else {
    return (
      <div className={cn(className, "hidden lg:grid lg:grid-cols-2 lg:gap-4")}>
        {choices.map((choice, index) => (
          <ClaimCard key={index} choice={choice} winner={winner} />
        ))}
      </div>
    );
  }
}

export function ClaimCardsMobile({
  choices,
  winner,
  className,
  ...rest
}: ClaimCardsProps) {
  if (!choices) return;
  winner = choices[0].id;
  if (choices.length < 4) {
    return (
      <div className={cn(className, "space-y-4 px-4")}>
        {choices.map((choice, index) => (
          <ClaimCard key={index} choice={choice} winner={winner} />
        ))}
      </div>
    );
  } else {
    return (
      <div className={cn(className, "space-y-4 px-4")}>
        {choices.map((choice, index) => (
          <ClaimCard key={index} choice={choice} winner={winner} />
        ))}
      </div>
    );
  }
}

export function ClaimButton() {
  return (
    <div>
      <Button className="bg-tally-primary text-black hover:bg-tally-secondary">
        Claim Winnings
      </Button>
    </div>
  );
}
