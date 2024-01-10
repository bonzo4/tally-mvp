import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface FilterButtonProps extends ButtonProps {
  name: string;
  selected: string;
}

export default function FilterButtonPrimitive(props: ButtonProps) {
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

export function FilterButton(props: FilterButtonProps) {
  const { name, selected, className, ...rest } = props;

  let _className =
    name === selected
      ? "bg-white text-black hover:bg-white/90"
      : "bg-zinc-900 text-gray-400 hover:bg-zinc-800";

  return (
    <FilterButtonPrimitive {...rest} className={cn(className, _className)}>
      {name}
    </FilterButtonPrimitive>
  );
}
