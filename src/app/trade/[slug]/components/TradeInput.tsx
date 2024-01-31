import { Input, InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface AmountInputProps extends InputProps {
  amount: number;
}

export default function AmountInput(props: AmountInputProps) {
  const { amount, className, ...rest } = props;

  let color =
    "hover:bg-tally-layer-2 focus:bg-tally-layer-2 text-tally-gray/40 hover:text-tally-gray/40 border border-tally-gray/40";
  if (amount > 0) {
    color = "text-tally-red hover:text-tally-gray border border-tally-gray";
  }

  return (
    <Input
      {...rest}
      placeholder="Order amount"
      className={cn(color, className, "h-[44px] bg-tally-layer-2")}
    ></Input>
  );
}
