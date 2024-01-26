import { Badge } from "@/components/ui/badge";
import { ChoiceMarket } from "@/lib/supabase/queries/markets/subMarkets";
import { Database } from "@/lib/supabase/types";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { formatDollarsWithoutCents } from "@/lib/formats";
import { bgCssMap, textCssMap } from "@/lib/cssMaps";

type Color = Database["public"]["Enums"]["colors_enum"];

const borderCssMap: Record<Color, string> = {
  primary: "border border-tally-primary/30",
  red: "border border-tally-red/30",
  orange: "border border-tally-orange/30",
  yellow: "border border-tally-yellow/30",
  green: "border border-tally-green/30",
  blue: "border border-tally-blue/30",
  purple: "border border-tally-purple/30",
  indigo: "border border-tally-indigo/30",
  gray: "border border-tally-gray/30",
  white: "border border-tally-white/30",
};

interface ResultsCardProps extends React.HTMLAttributes<HTMLDivElement> {
  choice: ChoiceMarket;
}

function ResultsCard({ choice, ...rest }: ResultsCardProps) {
  const { className } = rest;
  const color = choice.color || "primary";
  const isWinner = choice.is_winner;
  const borderCss = isWinner
    ? ""
    : borderCssMap[color as keyof typeof borderCssMap];
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
        "relative flex flex-col rounded-2xl p-4 lg:w-[351px]"
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

function ResultsCardMulti({ choice, ...rest }: ResultsCardProps) {
  const { className } = rest;
  const color = choice.color || "primary";
  const isWinner = choice.is_winner;
  const borderCss = isWinner
    ? ""
    : borderCssMap[color as keyof typeof borderCssMap];
  const bgCss = isWinner
    ? bgCssMap[color as keyof typeof bgCssMap]
    : "bg-tally-background";
  const textTitleCss = isWinner ? "text-black" : "text-white";
  const textPriceCss = isWinner
    ? "text-black"
    : textCssMap[color as keyof typeof textCssMap];
  const textPotCss = isWinner ? "text-tally-layer-1" : "text-tally-gray";

  return (
    <div
      className={cn(
        bgCss,
        borderCss,
        "relative flex flex-col justify-between rounded-2xl p-4 lg:min-w-[400px] lg:flex-row"
      )}
    >
      <div className="flex flex-shrink flex-col truncate">
        <div className="flex items-center space-x-2 truncate">
          {choice.icon ? (
            <div className="relative h-[55px] w-[55px] flex-shrink-0">
              <Image
                src={choice.icon}
                alt="something"
                fill={true}
                className="rounded-lg object-cover"
              />
            </div>
          ) : null}
          <div className="flex flex-col">
            <div className="flex-row items-end justify-between space-x-2 truncate lg:flex-col lg:items-start lg:space-x-0">
              <div className={cn(textTitleCss, "truncate text-3xl font-bold")}>
                {choice.title}
              </div>
              <div className={cn(textPriceCss, "text-lg")}>$.50</div>
            </div>
            <div
              className={cn(textPotCss, "mt-2 text-sm lg:hidden")}
            >{`Total Pot: ${formatDollarsWithoutCents(choice.total_pot)}`}</div>
          </div>
        </div>
        <div
          className={cn(textPotCss, "mt-2 hidden text-sm lg:flex")}
        >{`Total Pot: ${formatDollarsWithoutCents(choice.total_pot)}`}</div>
      </div>
      {isWinner ? (
        <Badge className="absolute right-2 top-2">Winner</Badge>
      ) : (
        <div className="absolute left-0 top-0 h-full w-full rounded-2xl bg-tally-background/70"></div>
      )}
    </div>
  );
}

interface ResultsProps extends React.HTMLAttributes<HTMLDivElement> {
  choices: ChoiceMarket[];
}

export function ResultsDesktop({ choices, className, ...rest }: ResultsProps) {
  if (!choices) return;
  if (choices.length < 4) {
    return (
      <div className={cn(className, "hidden lg:flex lg:space-x-6")}>
        {choices.map((choice, index) => (
          <ResultsCard key={index} choice={choice} />
        ))}
      </div>
    );
  } else {
    return (
      <div className={cn(className, "hidden lg:grid lg:grid-cols-2 lg:gap-4")}>
        {choices.map((choice, index) => (
          <ResultsCardMulti key={index} choice={choice} />
        ))}
      </div>
    );
  }
}

export function ResultsMobile({ choices, className, ...rest }: ResultsProps) {
  if (!choices) return;
  if (choices.length < 4) {
    return (
      <div className={cn(className, "space-y-4 px-4")}>
        {choices.map((choice, index) => (
          <ResultsCard key={index} choice={choice} />
        ))}
      </div>
    );
  } else {
    return (
      <div className={cn(className, "space-y-4 px-4")}>
        {choices.map((choice, index) => (
          <ResultsCardMulti key={index} choice={choice} />
        ))}
      </div>
    );
  }
}
