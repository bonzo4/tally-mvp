"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Checkbox } from "@/components/ui/checkbox";
import {
  FilterButtonPrimitive,
  FilterButton,
  FilterButtonProps,
} from "@/components/FilterButton";
import { formatDollarsWithCents } from "@/lib/formats";

const BG_GRAY_900 = "rgb(17 24 39)";

function FilterButtonChoice(props: FilterButtonProps) {
  const { name, selected, className, ...rest } = props;

  let color;
  if (name === "Yes") {
    color =
      name === selected
        ? "bg-tally-primary hover:bg-tally-primary/90 text-black"
        : "bg-zinc-800 hover:bg-tally-primary/20";
  } else if (name === "No") {
    color =
      name === selected
        ? "bg-tally-red hover:bg-tally-red/90 text-black"
        : "bg-zinc-800 hover:bg-tally-red/20";
  } else if (name === "Maybe") {
    color =
      name === selected
        ? "bg-orange-400 hover:bg-orange-400/90 text-black"
        : "bg-zinc-800";
  }
  return (
    <FilterButtonPrimitive {...rest} className={`${color} ${className}`}>
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

export default function Chart({ slug }: { slug: string }) {
  const [choiceFilter, setChoiceFilter] = useState<string>("Yes");
  const [timeFilter, setTimeFilter] = useState<string>("All");
  const [priceHistory, setPriceHistory] = useState<any[]>([]);

  const formatTooltip = (value: number, name: string) => {
    return [formatDollarsWithCents(value), name];
  };

  const handleTimeClick = async (time: { title: string; value: string }) => {
    setTimeFilter(time.title);
    console.log("slug in react component", slug, "timeFrame", time.value);
    await fetch(`/api/priceHistory?slug=${slug}&timeFrame=${time.value}`);
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
          <FilterButtonChoice
            className="flex-grow"
            onClick={() => setChoiceFilter("Yes")}
            name={"Yes"}
            selected={choiceFilter}
          />
          <FilterButtonChoice
            className="flex-grow"
            onClick={() => setChoiceFilter("No")}
            name={"No"}
            selected={choiceFilter}
          />
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
      <Legend />
      <div className="w-full">
        <ResponsiveContainer width="100%" height={400}>
          {/* adjust left margin to reveal first x-axis tick */}
          <LineChart
            data={data}
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
            <Line type="monotone" dataKey="Ramasawamy" stroke="#6EFF97" />
            <Line type="monotone" dataKey="Trump" stroke="#FF7B7B" />
            <Line type="monotone" dataKey="Biden" stroke="#18A0FB" />
            <Line type="monotone" dataKey="Newsom" stroke="#716EFF" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

const TEST_TIME_FILTERS = [
  { title: "1H", value: "1 hour" },
  { title: "1D", value: "1 day" },
  { title: "1W", value: "1 week" },
  { title: "1M", value: "1 month" },
  { title: "All", value: "all" },
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
