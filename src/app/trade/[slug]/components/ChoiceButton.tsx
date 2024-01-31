import { Button } from "@/components/ui/button";
import { Color } from "@/lib/cssMaps";
import { ChoiceMarketWithHoldings } from "@/lib/supabase/queries/markets/tradeMarket";
import { cn } from "@/lib/utils";

const choiceButtonUnselectedCssMap: Record<Color, string> = {
  primary:
    "text-tally-primary/50 border-tally-primary/50 hover:bg-tally-primary/10 hover:text-tally-primary/60 border",
  red: "text-tally-red/50 border-tally-red/50 hover:bg-tally-red/10 hover:text-tally-red/60 border",
  orange:
    "text-tally-orange/50 border-tally-orange/50 hover:bg-tally-orange/10 hover:text-tally-orange/60 border",
  yellow:
    "text-tally-yellow/50 border-tally-yellow/50 hover:bg-tally-yellow/10 hover:text-tally-yellow/60 border",
  green:
    "text-tally-green/50 border-tally-green/50 hover:bg-tally-green/10 hover:text-tally-green/60 border",
  blue: "text-tally-blue/50 border-tally-blue/50 hover:bg-tally-blue/10 hover:text-tally-blue/60 border",
  purple:
    "text-tally-purple/50 border-tally-purple/50 hover:bg-tally-purple/10 hover:text-tally-purple/60 border",
  indigo:
    "text-tally-indigo/50 border-tally-indigo/50 hover:bg-tally-indigo/10 hover:text-tally-indigo/60 border",
  gray: "text-tally-gray/50 border-tally-gray/50 hover:bg-tally-gray/10 hover:text-tally-gray/60 border",
  white:
    "text-tally-white/50 border-tally-white/50 hover:bg-tally-white/10 hover:text-tally-white/60 border",
};

const choiceButtonSelectedCssMap: Record<Color, string> = {
  primary:
    "bg-tally-primary/20 text-tally-primary border border-tally-primary hover:bg-tally-primary/30 hover:text-tally",
  red: "bg-tally-red/20 text-tally-red border border-tally-red hover:bg-tally-red/30 hover:text-tally",
  orange:
    "bg-tally-orange/20 text-tally-orange border border-tally-orange hover:bg-tally-orange/30 hover:text-tally",
  yellow:
    "bg-tally-yellow/20 text-tally-yellow border border-tally-yellow hover:bg-tally-yellow/30 hover:text-tally",
  green:
    "bg-tally-green/20 text-tally-green border border-tally-green hover:bg-tally-green/30 hover:text-tally",
  blue: "bg-tally-blue/20 text-tally-blue border border-tally-blue hover:bg-tally-blue/30 hover:text-tally",
  purple:
    "bg-tally-purple/20 text-tally-purple border border-tally-purple hover:bg-tally-purple/30 hover:text-tally",
  indigo:
    "bg-tally-indigo/20 text-tally-indigo border border-tally-indigo hover:bg-tally-indigo/30 hover:text-tally",
  gray: "bg-tally-gray/20 text-tally-gray border border-tally-gray hover:bg-tally-gray/30 hover:text-tally",
  white:
    "bg-tally-white/20 text-tally-white border border-tally-white hover:bg-tally-white/30 hover:text-tally",
};

type ChoiceButtonProps = React.HTMLAttributes<HTMLInputElement> & {
  name: string;
  value: string;
  checked: boolean;
  selected: string;
  choiceMarket: ChoiceMarketWithHoldings;
};

export default function ChoiceButton({
  selected,
  choiceMarket,
  className,
  ...rest
}: ChoiceButtonProps) {
  const { share_price, color, title } = choiceMarket;
  const { id, value, checked, onChange } = rest;

  let className_ =
    selected === title
      ? choiceButtonSelectedCssMap[color as Color]
      : choiceButtonUnselectedCssMap[color as Color] + " bg-transparent";

  return (
    <div className="flex-grow">
      <input {...rest} type="radio" className="hidden" />
      <Button className={cn(className, className_, "font-bold")}>
        <label htmlFor={rest.id}>{`${title} ${share_price * 100}¢`}</label>
      </Button>
    </div>
  );
}
