import { FilterButton } from "@/components/FilterButton";

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
        <FilterButton
          className="mr-2"
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
