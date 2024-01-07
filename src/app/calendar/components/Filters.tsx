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
      className={cn(className, _className)}
    >
      {name}
    </FilterButtonPrimitive>
  );
}

interface FilterProps {
  filterMonth: string;
  setFilterMonth: (month: string) => void;
}

export default function Filters({ filterMonth, setFilterMonth }: FilterProps) {
  return (
    <div className="grid grid-cols-4 gap-2 lg:flex lg:space-x-2">
      {MONTHS.map((month, index) => (
        <FilterButtonMonth
          key={index}
          name={month}
          selected={filterMonth}
          onClick={() => setFilterMonth(month)}
        />
      ))}
    </div>
  );
}
