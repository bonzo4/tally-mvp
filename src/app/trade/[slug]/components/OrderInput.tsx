import { Input, InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type OrderInputProps = InputProps & {
  label: string;
  error?: string;
};

export default function OrderInput(props: OrderInputProps) {
  const { className, id, error, label, placeholder, value, ...rest } = props;

  const errorCss = error
    ? "border-red-500 focus:border-red-500"
    : "border-tally-gray/40 focus:border-tally-gray";

  return (
    <div className="flex flex-col space-y-2 text-tally-gray">
      <Label htmlFor={id}>{label}</Label>
      <Input
        {...rest}
        id={id}
        placeholder={placeholder}
        min="0"
        step="any"
        value={value || ""}
        className={cn(
          className,
          errorCss,
          "h-[44px] border bg-tally-layer-2 text-tally-gray"
        )}
      />
      <div className="text-xs text-red-500">{error}</div>
    </div>
  );
}
