import { Badge } from "@/components/ui/badge";

// const TEST_CATEGORIES = [
//   "All",
//   "Fair Launch 🚀",
//   "New 🔥",
//   "Politics",
//   "Sports",
//   "Economy",
//   "Education",
//   "Science",
//   "Gaza",
//   "Ukraine",
//   "US Election",
//   "Airdrops",
//   "ETF",
//   "Biden",
//   "Trump",
//   "Bitcoin",
//   "Ethereum",
//   "Solana",
//   "NFTs",
//   "NBA",
//   "NHL",
//   "Soccer",
//   "Israel",
//   "Canada",
//   "China",
//   "Japan",
//   "Tennis",
// ];

interface FilterButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  category: string;
  selected: string;
}

function FilterButton(props: FilterButtonProps) {
  const { category, selected, ...rest } = props;

  const color =
    category === selected ? "bg-gray-100 text-black" : "bg-zinc-800 text-white";
  const variant = category === selected ? "secondary" : "default";

  return (
    <Badge
      {...rest}
      variant={variant}
      className={`${color} flex-shrink-0 px-3 py-2 font-medium hover:cursor-pointer`}
    >
      {category}
    </Badge>
  );
}

function PseudoLeftMargin() {
  return <div className="min-w-[8px] lg:min-w-[56px]"></div>;
}

function PseudoRightMargin() {
  return <div className="min-w-[8px] lg:min-w-[56px]"></div>;
}

type FilterMarketsProps = {
  categories: string[];
  handleFilterChange: (filter: string) => void;
  selected: string;
};

export default function FilterMarkets({
  handleFilterChange,
  selected,
  categories,
}: FilterMarketsProps) {
  return (
    <div className="no-scrollbar flex space-x-2 overflow-auto">
      <PseudoLeftMargin />
      {categories.map((category, index) => {
        return (
          <FilterButton
            key={index}
            onClick={() => handleFilterChange(category)}
            category={category}
            selected={selected}
          />
        );
      })}
      <PseudoRightMargin />
    </div>
  );
}
