import { Color } from "@/lib/cssMaps";
import { ChoiceMarketWithHoldings } from "@/lib/supabase/queries/markets/tradeMarket";
import { cn } from "@/lib/utils";
import { formatCents } from "@/lib/formats";

const choiceUncheckedCssMap: Record<Color, string> = {
  primary: `
    hover:bg-tally-primary/10 
    text-tally-primary/50 
    hover:text-tally-primary/60 
    border
    border-tally-primary/50 
  `,
  red: `
    hover:bg-tally-red/10 
    text-tally-red/50 
    hover:text-tally-red/60 
    border
    border-tally-red/50 
  `,
  orange: `
    hover:bg-tally-orange/10 
    text-tally-orange/50 
    hover:text-tally-orange/60 
    border
    border-tally-orange/50 
  `,
  yellow: `
    hover:bg-tally-yellow/10 
    text-tally-yellow/50 
    hover:text-tally-yellow/60 
    border
    border-tally-yellow/50 
  `,
  green: `
    hover:bg-tally-green/10 
    text-tally-green/50 
    hover:text-tally-green/60 
    border
    border-tally-green/50 
  `,
  blue: `
    hover:bg-tally-blue/10 
    text-tally-blue/50 
    hover:text-tally-blue/60 
    border
    border-tally-blue/50 
  `,
  purple: `
    hover:bg-tally-purple/10 
    text-tally-purple/50 
    hover:text-tally-purple/60 
    border
    border-tally-purple/50 
  `,
  indigo: `
    hover:bg-tally-indigo/10 
    text-tally-indigo/50 
    hover:text-tally-indigo/60 
    border
    border-tally-indigo/50 
  `,
  gray: `
    hover:bg-tally-gray/10 
    text-tally-gray/50 
    hover:text-tally-gray/60 
    border
    border-tally-gray/50 
  `,
  white: `
    hover:bg-tally-white/10 
    text-tally-white/50 
    hover:text-tally-white/60 
    border
    border-tally-white/50 
  `,
};

const choiceCheckedCssMap: Record<Color, string> = {
  primary: `
    peer-checked:bg-tally-primary/20 
    peer-checked:hover:bg-tally-primary/30
    peer-checked:text-tally-primary 
    peer-checked:border 
    peer-checked:border-tally-primary 
  `,
  red: `
    peer-checked:bg-tally-red/20 
    peer-checked:hover:bg-tally-red/30
    peer-checked:text-tally-red 
    peer-checked:border 
    peer-checked:border-tally-red 
  `,
  orange: `
    peer-checked:bg-tally-orange/20 
    peer-checked:hover:bg-tally-orange/30
    peer-checked:text-tally-orange 
    peer-checked:border 
    peer-checked:border-tally-orange 
  `,
  yellow: `
    peer-checked:bg-tally-yellow/20 
    peer-checked:hover:bg-tally-yellow/30
    peer-checked:text-tally-yellow 
    peer-checked:border 
    peer-checked:border-tally-yellow 
  `,
  green: `
    peer-checked:bg-tally-green/20 
    peer-checked:hover:bg-tally-green/30
    peer-checked:text-tally-green 
    peer-checked:border 
    peer-checked:border-tally-green 
  `,
  blue: `
    peer-checked:bg-tally-blue/20 
    peer-checked:hover:bg-tally-blue/30
    peer-checked:text-tally-blue 
    peer-checked:border 
    peer-checked:border-tally-blue 
  `,
  purple: `
    peer-checked:bg-tally-purple/20 
    peer-checked:hover:bg-tally-purple/30
    peer-checked:text-tally-purple 
    peer-checked:border 
    peer-checked:border-tally-purple 
  `,
  indigo: `
    peer-checked:bg-tally-indigo/20 
    peer-checked:hover:bg-tally-indigo/30
    peer-checked:text-tally-indigo 
    peer-checked:border 
    peer-checked:border-tally-indigo 
  `,
  gray: `
    peer-checked:bg-tally-gray/20 
    peer-checked:hover:bg-tally-gray/30
    peer-checked:text-tally-gray 
    peer-checked:border 
    peer-checked:border-tally-gray 
  `,
  white: `
    peer-checked:bg-tally-white/20 
    peer-checked:hover:bg-tally-white/30
    peer-checked:text-tally-white 
    peer-checked:border 
    peer-checked:border-tally-white 
  `,
};

type ChoiceButtonProps = React.HTMLAttributes<HTMLInputElement> & {
  id: string;
  name: string;
  value: string;
  sharePrice: number;
  disabled?: boolean;
  checked: boolean;
  choiceMarket: ChoiceMarketWithHoldings;
};

export default function ChoiceButton({
  choiceMarket,
  className,
  sharePrice,
  ...rest
}: ChoiceButtonProps) {
  const { share_price, color, title } = choiceMarket;

  const className_ =
    choiceUncheckedCssMap[color as Color] +
    " " +
    choiceCheckedCssMap[color as Color] +
    " bg-transparent";

  return (
    <div className="flex-grow">
      <input {...rest} type="radio" className="peer hidden" />
      <label
        htmlFor={rest.id}
        className={cn(
          className,
          className_,
          `inline-flex items-center justify-center rounded-md px-4 py-2 font-medium`
        )}
      >
        {`${title} ${formatCents(sharePrice)}`}
      </label>
    </div>
  );
}
