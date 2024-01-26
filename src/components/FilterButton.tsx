import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function FilterButtonPrimitive(props: ButtonProps) {
  const { children, className, ...rest } = props;

  return (
    <Button
      {...rest}
      className={`${className} flex-shrink-0 rounded-full px-4 py-2 font-medium`}
    >
      {children}
    </Button>
  );
}

export interface FilterButtonProps extends ButtonProps {
  name: string;
  selected: string;
  selectedCss?: string;
}

export function FilterButton(props: FilterButtonProps) {
  const { name, selected, selectedCss, className, ...rest } = props;

  let _className =
    name === selected
      ? selectedCss || "bg-white text-black hover:bg-white/90"
      : "bg-tally-layer-1 text-tally-gray hover:bg-tally-layer-1";

  return (
    <FilterButtonPrimitive {...rest} className={cn(className, _className)}>
      {name}
    </FilterButtonPrimitive>
  );
}
