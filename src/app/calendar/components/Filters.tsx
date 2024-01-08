import FilterButtonPrimitive, {
  FilterButtonProps,
} from "@/components/FilterButtonPrimitive";
import { cn } from "@/lib/utils";

const MONTHS = [
  "All",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function FilterButtonMonth(props: FilterButtonProps) {
  const { name, selected, className, ...rest } = props;

  const variant = name === selected ? "secondary" : "default";
  const _className =
    name === selected ? "" : "bg-zinc-900 text-gray-400 hover:bg-zinc-800";

  return (
    <FilterButtonPrimitive
      {...rest}
      variant={variant}
      className={cn(className, _className, "mr-2")}
    >
      {name}
    </FilterButtonPrimitive>
  );
}

interface FilterProps {
  filterMonth: string;
  setFilterMonth: (month: string) => void;
}

function PseudoLeftMargin() {
  return <div className="min-w-[16px] lg:hidden"></div>;
}

function PseudoRightMargin() {
  return <div className="min-w-[8px] lg:hidden"></div>;
}

export default function Filters({ filterMonth, setFilterMonth }: FilterProps) {
  return (
    <div className="flex overflow-x-auto lg:flex lg:px-16">
      <PseudoLeftMargin />
      {MONTHS.map((month, index) => (
        <FilterButtonMonth
          key={index}
          name={month}
          selected={filterMonth}
          onClick={() => setFilterMonth(month)}
        />
      ))}
      <PseudoRightMargin />
    </div>
  );
}
