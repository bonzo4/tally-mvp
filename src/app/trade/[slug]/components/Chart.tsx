"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";

import { Database } from "@/lib/supabase/types";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FilterButtonPrimitive,
  FilterButton,
  FilterButtonProps,
} from "@/components/FilterButton";
import { PriceHistory_ as PriceHistory } from "@/lib/supabase/queries/markets/priceHistory";
import { formatDollarsWithCents } from "@/lib/formats";
import { hexMap } from "@/lib/cssMaps";

type Color = Database["public"]["Enums"]["colors_enum"] | null;

type TimeFilters = "1H" | "1D" | "1W" | "1M" | "All";
type TimeValue = "1 hour" | "1 day" | "1 week" | "1 month" | "all";
type TimeMap = {
  title: TimeFilters;
  value: TimeValue;
};

type FormattedPriceData = {
  name: string;
  date: string;
  time: string;
  [key: string]: string | number;
};
type FormattedRelatedInfo = {
  [id: number]: {
    title: string;
    card_title: string;
    color: Color;
  };
};
type PricesByChoice = {
  [key: string]: FormattedPriceData[];
};

const BG_GRAY_900 = "rgb(17 24 39)";

const TIME_VALUES_MAP: Record<string, string> = {
  "1 hour": "1H",
  "1 day": "1D",
  "1 week": "1W",
  "1 month": "1M",
  all: "All",
};

const timeFilters: Array<TimeMap> = [
  { title: "1H", value: "1 hour" },
  { title: "1D", value: "1 day" },
  { title: "1W", value: "1 week" },
  { title: "1M", value: "1 month" },
  { title: "All", value: "all" },
];

function FilterButtonChoice(props: FilterButtonProps) {
  const { name, selected, className, ...rest } = props;

  let bgCss;
  if (name === "Yes") {
    bgCss =
      name === selected
        ? "bg-tally-primary hover:bg-tally-primary/90 text-black"
        : "bg-zinc-800 hover:bg-tally-primary/20";
  } else if (name === "No") {
    bgCss =
      name === selected
        ? "bg-tally-red hover:bg-tally-red/90 text-black"
        : "bg-zinc-800 hover:bg-tally-red/20";
  } else if (name === "Maybe") {
    bgCss =
      name === selected
        ? "bg-orange-400 hover:bg-orange-400/90 text-black"
        : "bg-zinc-800";
  }
  return (
    <FilterButtonPrimitive {...rest} className={cn(bgCss, className)}>
      {name}
    </FilterButtonPrimitive>
  );
}

function Legend() {
  return (
    <div className="flex flex-wrap">
      <div className="mr-2 flex items-center space-x-1">
        <Checkbox className="border border-[#FF7B7B] data-[state=checked]:bg-black data-[state=checked]:text-[#FF7B7B]" />
        <span className="text-white">Trump</span>
      </div>
      <div className="mr-2 flex items-center space-x-1">
        <Checkbox className="border border-[#6EFF97] data-[state=checked]:bg-black data-[state=checked]:text-[#6EFF97]" />
        <span className="text-white">Ramasawamy</span>
      </div>
      <div className="mr-2 flex items-center space-x-1">
        <Checkbox className="border border-[#18A0FB] data-[state=checked]:bg-black data-[state=checked]:text-[#18A0FB]" />
        <span className="text-white">Biden</span>
      </div>
      <div className="mr-2 flex items-center space-x-1">
        <Checkbox className="border border-[#716EFF] data-[state=checked]:bg-black data-[state=checked]:text-[#716EFF]" />
        <span className="text-white">Newsom</span>
      </div>
    </div>
  );
}

function getUniqueChoices(priceHistory: PriceHistory[]): Array<string> {
  // const uniqueChoices = new Set<string>();
  // for (const price of priceHistory) {
  //   uniqueChoices.add(price.title);
  // }
  // return Array.from(uniqueChoices);
  return ["Yes", "No"];
}

function getTime(isoString: string) {
  const date = new Date(isoString);
  // get time in local time zone
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });
}

function getDate(isoString: string) {
  const date = new Date(isoString);
  // get time in local time zone
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function getDateTime(isoString: string) {
  const date = new Date(isoString);
  // get time in local time zone
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
}

function formatPriceData(
  priceHistory: PriceHistory[],
  timeFilter: string
): FormattedPriceData[] {
  const prices: FormattedPriceData[] = [];
  let index = -1;
  console.log(timeFilter);
  for (const price of priceHistory) {
    // const time =
    //   timeFilter === "1H" || timeFilter === "1D"
    //     ? getTime(price.created_at)
    //     : getDateTime(price.created_at);
    if (index < 0 || prices[index].name !== getDateTime(price.created_at)) {
      index++;
      const price_: FormattedPriceData = {
        name: getDateTime(price.created_at),
        date: getDate(price.created_at),
        time: getTime(price.created_at),
        [price.card_title]: price.price,
      };
      prices.push(price_);
    } else {
      prices[index][price.card_title] = price.price;
    }
  }
  return prices;
}

function formatRelatedInfo(priceHistory: PriceHistory[]) {
  const relatedInfo: FormattedRelatedInfo = {};
  for (const price of priceHistory) {
    if (price.choice_market_id in relatedInfo) continue;
    relatedInfo[price.choice_market_id] = {
      title: price.title,
      card_title: price.card_title,
      color: price.color || "primary",
    };
  }
  return relatedInfo;
}

export default function Chart({ slug }: { slug: string }) {
  const [choices, setChoices] = useState<string[]>([]);
  const [choiceFilter, setChoiceFilter] = useState<string>("");
  const [timeFilter, setTimeFilter] = useState<TimeFilters>("All");
  const [priceHistory, setPriceHistory] = useState<PricesByChoice>({});
  const [relatedInfo, setRelatedInfo] = useState<FormattedRelatedInfo>({});

  const formatTooltip = (value: number, name: string) => {
    return [formatDollarsWithCents(value), name];
  };

  const fetchAndSetAllPriceData = async (slug: string, timeFrame: string) => {
    const res = await fetch(
      `/api/priceHistory?slug=${slug}&timeFrame=${timeFrame}`
    );
    const rawPriceHistory: PriceHistory[] = await res.json();

    const choices = getUniqueChoices(rawPriceHistory);
    setChoices(choices);
    setChoiceFilter(choices[0]);

    const priceByChoice: PricesByChoice = {};
    for (const choice of choices) {
      priceByChoice[choice] = formatPriceData(
        rawPriceHistory.filter((price) => price.title === choice),
        TIME_VALUES_MAP[timeFrame]
      );
    }
    setPriceHistory(priceByChoice);

    const relatedInfo = formatRelatedInfo(rawPriceHistory);
    setRelatedInfo(relatedInfo);
  };

  useEffect(() => {
    fetchAndSetAllPriceData(slug, "all");
  }, [slug]);

  const handleTimeClick = async (time: TimeMap) => {
    setTimeFilter(time.title);
    fetchAndSetAllPriceData(slug, time.value);
  };

  return (
    <div className="w-full space-y-3">
      <div>
        <h2 className="text-2xl font-medium text-white lg:text-4xl">
          Price Chart
        </h2>
      </div>
      <div className="flex w-full flex-col justify-between space-y-4 md:flex-row md:space-y-0">
        <div className="flex justify-between space-x-2">
          {choices.map((choice, index) => (
            <FilterButtonChoice
              key={index}
              className="flex-grow"
              onClick={() => setChoiceFilter(choice)}
              name={choice}
              selected={choiceFilter}
            />
          ))}
        </div>
        <div className="flex justify-between space-x-2">
          {timeFilters.map((time, index) => (
            <FilterButton
              key={index}
              name={time.title}
              selected={timeFilter}
              onClick={() => handleTimeClick(time)}
            />
          ))}
        </div>
      </div>
      {/* <Legend /> */}
      <div className="w-full">
        <ResponsiveContainer width="100%" height={400}>
          {/* adjust left margin to reveal first x-axis tick */}
          <LineChart
            data={priceHistory[choiceFilter]}
            margin={{ top: 5, right: 0, left: 25, bottom: 5 }}
          >
            <XAxis
              axisLine={false}
              dataKey={"name"}
              tickLine={false}
              tickMargin={15}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              orientation="right"
              tickFormatter={formatDollarsWithCents}
            />
            <Tooltip
              contentStyle={{ color: "white", backgroundColor: BG_GRAY_900 }}
              formatter={formatTooltip}
            />
            {Object.entries(relatedInfo)
              .filter(([id, info]) => info.title === choiceFilter)
              .map(([id, info], index) => (
                <Line
                  key={index}
                  dot={false}
                  type="monotone"
                  dataKey={info.card_title}
                  stroke={hexMap[info.color as string]}
                />
              ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
