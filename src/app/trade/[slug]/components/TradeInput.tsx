import { Input, InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function AmountInput(props: InputProps) {
  const { className, ...rest } = props;

  return (
    <Input
      {...rest}
      placeholder="Order amount in $"
      className={cn(
        className,
        "h-[44px] border border-tally-gray/40 bg-tally-layer-2 text-tally-gray focus:border-tally-gray"
      )}
    />
  );
}
