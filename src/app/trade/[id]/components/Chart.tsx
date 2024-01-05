"use client"

import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, TooltipProps, ResponsiveContainer } from 'recharts';

import { ButtonProps } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import FilterButtonPrimitive, { FilterButtonProps } from "@/components/FilterButtonPrimitive"
import { formatDollarsWithCents } from "@/lib/formats"

const BG_GRAY_900 = "rgb(17 24 39)" 

function FilterButtonChoice(props: FilterButtonProps) {
  const { name, selected, className, ...rest } = props;

  let color;
  if (name === "Yes") {
    color = (name === selected) ? "bg-tally-primary hover:bg-tally-primary/90 text-black" : "bg-gray-800";
  } else if (name === "No") {
    color = (name === selected) ? "bg-tally-red hover:bg-tally-red/90 text-black" : "bg-gray-800";
  } else if (name === "Maybe") {
    color = (name === selected) ? "bg-orange-400 hover:bg-orange-400/90 text-black" : "bg-gray-800";
  }
  return (
    <FilterButtonPrimitive {...rest} className={`${color} ${className}`}>
      {name}
    </FilterButtonPrimitive>
  )
}

function FilterButtonTime(props: FilterButtonProps) {
  const { name, selected, ...rest } = props;

  const variant = name === selected ? "secondary" : "default"

  return (
    <FilterButtonPrimitive {...rest} variant={variant}>
      {name}
    </FilterButtonPrimitive>
  )
}

function Legend() {
  return (
    <div className="flex flex-wrap">
      <div className="flex items-center space-x-1 mr-2">
        <Checkbox className="border border-[#FF7B7B] data-[state=checked]:bg-black data-[state=checked]:text-[#FF7B7B]" />
        <span className="text-white">Trump</span>
      </div>
      <div className="flex items-center space-x-1 mr-2">
        <Checkbox className="border border-[#6EFF97] data-[state=checked]:bg-black data-[state=checked]:text-[#6EFF97]" />
        <span className="text-white">Ramasawamy</span>
      </div>
      <div className="flex items-center space-x-1 mr-2">
        <Checkbox className="border border-[#18A0FB] data-[state=checked]:bg-black data-[state=checked]:text-[#18A0FB]" />
        <span className="text-white">Biden</span>
      </div>
      <div className="flex items-center space-x-1 mr-2">
        <Checkbox className="border border-[#716EFF] data-[state=checked]:bg-black data-[state=checked]:text-[#716EFF]" />
        <span className="text-white">Newsom</span>
      </div>
    </div>
  )
}

export default function Chart() {
  const [choiceFilter, setChoiceFilter] = useState<string>("Yes");
  const [timeFilter, setTimeFilter] = useState<string>("All");

  const formatTooltip = (value: number, name: string) => {
    return [ formatDollarsWithCents(value), name ]
  }

  return (
    <div className="w-full space-y-3">
      <div>
        <h2 className="text-2xl lg:text-4xl font-medium text-white">Price Chart</h2>
      </div>
      <div className="w-full flex flex-col md:flex-row justify-between space-y-2 md:space-y-0">
        <div className="space-x-2 flex justify-between">
          <FilterButtonChoice className="flex-grow" onClick={() => setChoiceFilter("Yes")} name={"Yes"} selected={choiceFilter} />
          <FilterButtonChoice className="flex-grow" onClick={() => setChoiceFilter("No")} name={"No"} selected={choiceFilter} />
        </div>
        <div className="space-x-2 flex justify-between">
          {
            TEST_TIME_FILTERS.map((time, index) => <FilterButtonTime key={index} name={time} selected={timeFilter} onClick={() => setTimeFilter(time)} />)
          }
        </div>
      </div>
      <Legend />
      <div className="w-full">
      <ResponsiveContainer width="100%" height={400}>
        {/* adjust left margin to reveal first x-axis tick */}
        <LineChart data={data}
          margin={{ top: 5, right: 0, left: 25, bottom: 5 }}>
          <XAxis axisLine={false} tickLine={false} dataKey="name" />
          <YAxis axisLine={false} tickLine={false} orientation="right" tickFormatter={formatDollarsWithCents} />
          <Tooltip contentStyle={{color: "white", backgroundColor: BG_GRAY_900}} formatter={formatTooltip} />
          <Line type="monotone" dataKey="Ramasawamy" stroke="#6EFF97" />
          <Line type="monotone" dataKey="Trump" stroke="#FF7B7B" />
          <Line type="monotone" dataKey="Biden" stroke="#18A0FB" />
          <Line type="monotone" dataKey="Newsom" stroke="#716EFF" />
        </LineChart>
      </ResponsiveContainer>
      </div>
    </div>
  )
}


const TEST_TIME_FILTERS = [
  "1H",
  "6H",
  "1D",
  "1W",
  "1M",
  "All",
]


const data = [
  {
    "name": "Dec 13",
    "Trump": .4000,
    "Ramasawamy": .2400,
    "Biden": .2400
  },
  {
    "name": "Dec 14",
    "Trump": .3000,
    "Ramasawamy": .1398,
    "Biden": .2210
  },
  {
    "name": "Dec 15",
    "Trump": .2000,
    "Ramasawamy": .9800,
    "Biden": .2290,
    "Newsom": .0910
  },
  {
    "name": "Dec 16",
    "Trump": .2780,
    "Ramasawamy": .3908,
    "Biden": .2000,
    "Newsom": .1110
  },
  {
    "name": "Dec 17",
    "Trump": .1890,
    "Ramasawamy": .4800,
    "Biden": .2181,
    "Newsom": .0760
  },
  {
    "name": "Dec 18",
    "Trump": .2390,
    "Ramasawamy": .3800,
    "Biden": .2500,
    "Newsom": .0860
  },
  {
    "name": "Dec 19",
    "Trump": .3490,
    "Ramasawamy": .4300,
    "Biden": .2100,
    "Newsom": .1630
  }
]

