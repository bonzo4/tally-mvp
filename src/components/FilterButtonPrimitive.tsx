import { Button, ButtonProps } from "@/components/ui/button";

export interface FilterButtonProps extends ButtonProps {
  name: string;
  selected: string;
}

export default function FilterButtonPrimitive(props: ButtonProps) {
  const { children, className, ...rest } = props;

  return (
    <Button
      {...rest}
      className={`${className} flex-shrink-0 rounded-full py-2 font-medium`}
    >
      {children}
    </Button>
  );
}
