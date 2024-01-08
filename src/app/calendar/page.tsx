"use client";

import { useState } from "react";

import Overview from "./components/Overview";
import Filters from "./components/Filters";
import Month from "./components/Month";

const TEST_EVENT_DATA = [
  {
    month: "JAN",
    day: 10,
    name: "Republican presidential debate hosted by CNN.",
    description:
      "A Republican presidential primary debate will take place at Drake University in Des Moine, Iowa.",
    src: "/",
    reminder: "/",
    is_highlighted: true,
  },
  {
    month: "JAN",
    day: 15,
    name: "Iowa Republican caucuses.",
    description: "",
    reminder: "/",
    is_highlighted: false,
  },
  {
    month: "JAN",
    day: 21,
    name: "Republican presidential debate hosted by CNN.",
    description:
      "A Republican presidential primary debate will take place at Drake University in Des Moine, Iowa.",
    src: "/",
    reminder: "/",
    is_highlighted: true,
  },
  {
    month: "JAN",
    day: 23,
    name: "New Hampshire Republican presidential primary election.",
    description: "Democratic primary is non-binding.",
    reminder: "/",
    is_highlighted: false,
  },
  {
    month: "JAN",
    day: 31,
    name: "FEC year-end report due.",
    description: "For presidential and congressional candidate committees.",
    reminder: "/",
    is_highlighted: false,
  },
  {
    month: "FEB",
    day: 3,
    name: "South Carolina Democratic presidential primary election",
    description: "",
    reminder: "/",
    is_highlighted: false,
  },
  {
    month: "FEB",
    day: 6,
    name: "Nevada Democratic presidential primary election",
    description: "Republican primary is non-binding.",
    reminder: "/",
    is_highlighted: false,
  },
];

export default function Calendar() {
  const [filterMonth, setFilterMonth] = useState("All");

  const TEST_JANUARY_DATA = TEST_EVENT_DATA.filter(
    (event) => event.month === "JAN"
  );
  const TEST_FEBRUARY_DATA = TEST_EVENT_DATA.filter(
    (event) => event.month === "FEB"
  );
  const TEST_MARCH_DATA = TEST_EVENT_DATA.filter(
    (event) => event.month === "MAR"
  );

  return (
    <div className="flex w-full flex-col space-y-5 pb-20 pt-10">
      <Overview />
      <Filters filterMonth={filterMonth} setFilterMonth={setFilterMonth} />
      {filterMonth === "All" || filterMonth === "Jan" ? (
        <Month name="January 2024" events={TEST_JANUARY_DATA} />
      ) : null}
      {filterMonth === "All" || filterMonth === "Feb" ? (
        <Month name="February 2024" events={TEST_FEBRUARY_DATA} />
      ) : null}
      {filterMonth === "All" || filterMonth === "Mar" ? (
        <Month name="March 2024" events={TEST_MARCH_DATA} />
      ) : null}
    </div>
  );
}
