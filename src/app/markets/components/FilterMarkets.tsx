import { Badge } from "@/components/ui/badge";

const TEST_CATEGORIES = [
  "All",
  "New",
  "Politics",
  "Sports",
  "Economy",
  "Education",
  "Science",
  "Gaza",
  "Ukraine",
  "US Election",
  "Airdrops",
  "ETF",
  "Biden",
  "Trump",
  "Bitcoin",
  "Ethereum",
  "Solana",
  "NFTs",
  "NBA",
  "NHL",
  "Soccer",
  "Israel",
  "Canada",
  "China",
  "Japan",
  "Tennis",
]

interface FilterButtonProps extends React.HTMLAttributes<HTMLDivElement> {
    category: string;
    selected: string;
}

function FilterButton(props: FilterButtonProps) {
  const { category, selected, ...rest } = props;

  const color = (category === selected) ? "bg-gray-100 text-black" : "bg-zinc-800 text-white";
  const variant = (category === selected) ? "secondary" : "default";

  return (
    <Badge 
      {...rest}
      variant={variant} 
      className={`${color} flex-shrink-0 font-medium py-2 px-3 hover:cursor-pointer`}
    >
      {category}
    </Badge>
  )
}

export default function FilterMarkets({ handleFilterChange, selected }: { handleFilterChange: (filter: string) => void, selected: string }) {
  return (
    <div className="flex space-x-2 overflow-auto no-scrollbar">
      <div className="min-w-[16px] lg:min-w-[64px] -mr-2"></div>
      {
        TEST_CATEGORIES.map((category, index) => {
          return <FilterButton key={index} onClick={() => handleFilterChange(category)} category={category} selected={selected} />
        })
      }
    </div>
  )
}
