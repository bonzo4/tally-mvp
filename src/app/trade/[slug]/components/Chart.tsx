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

const BG_GRAY_900 = "rgb(17 24 39)";

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

type FormattedPriceData = {
  name: string;
  [key: string]: string | number;
};

type PricesByChoice = {
  [key: string]: FormattedPriceData[];
};

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
    const time =
      timeFilter === "1H" || timeFilter === "1D"
        ? getTime(price.created_at)
        : getDateTime(price.created_at);
    if (index < 0 || prices[index].name !== time) {
      index++;
      const price_: FormattedPriceData = {
        name: time,
        [price.card_title]: price.price,
      };
      prices.push(price_);
    } else {
      prices[index][price.card_title] = price.price;
    }
  }
  return prices;
}

type FormattedRelatedInfo = {
  [id: number]: {
    title: string;
    card_title: string;
    color: Color;
  };
};

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
  const [timeFilter, setTimeFilter] = useState<string>("All");
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

  const handleTimeClick = async (time: { title: string; value: string }) => {
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
          {TEST_TIME_FILTERS.map((time, index) => (
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
              dataKey="name"
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

const TIME_VALUES_MAP: Record<string, string> = {
  "1 hour": "1H",
  "1 day": "1D",
  "1 week": "1W",
  "1 month": "1M",
  all: "All",
};

const TEST_TIME_FILTERS = [
  { title: "1H", value: "1 hour", format: "time" },
  { title: "1D", value: "1 day", format: "time" },
  { title: "1W", value: "1 week", format: "datetime" },
  { title: "1M", value: "1 month", format: "datetime" },
  { title: "All", value: "all", format: "datetime" },
];

const data = [
  {
    name: "Dec 13",
    Trump: 0.4,
    Ramasawamy: 0.24,
    Biden: 0.24,
  },
  {
    name: "Dec 14",
    Trump: 0.3,
    Ramasawamy: 0.1398,
    Biden: 0.221,
  },
  {
    name: "Dec 15",
    Trump: 0.2,
    Ramasawamy: 0.98,
    Biden: 0.229,
    Newsom: 0.091,
  },
  {
    name: "Dec 16",
    Trump: 0.278,
    Ramasawamy: 0.3908,
    Biden: 0.2,
    Newsom: 0.111,
  },
  {
    name: "Dec 17",
    Trump: 0.189,
    Ramasawamy: 0.48,
    Biden: 0.2181,
    Newsom: 0.076,
  },
  {
    name: "Dec 18",
    Trump: 0.239,
    Ramasawamy: 0.38,
    Biden: 0.25,
    Newsom: 0.086,
  },
  {
    name: "Dec 19",
    Trump: 0.349,
    Ramasawamy: 0.43,
    Biden: 0.21,
    Newsom: 0.163,
  },
];
