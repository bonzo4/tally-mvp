"use client";

import { createBrowserClient } from "@supabase/ssr";
import { useState } from "react";

import { useCalendar } from "@/hooks/useCalendar";
import { Calendar as CalendarType } from "@/lib/supabase/queries/calendar";

import Overview from "./components/Overview";
import Filters from "./components/Filters";
import Month from "./components/Month";

const MONTHS = [
  { key: "Jan", name: "January 2024" },
  { key: "Feb", name: "February 2024" },
  { key: "Mar", name: "March 2024" },
  { key: "Apr", name: "April 2024" },
  { key: "May", name: "May 2024" },
  { key: "Jun", name: "June 2024" },
  { key: "Jul", name: "July 2024" },
  { key: "Aug", name: "August 2024" },
  { key: "Sep", name: "September 2024" },
  { key: "Oct", name: "October 2024" },
  { key: "Nov", name: "November 2024" },
  { key: "Dec", name: "December 2024" },
];

export default function Calendar() {
  const [filterMonth, setFilterMonth] = useState("All");
  const [loading, setLoading] = useState(true);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { calendar, lastUpdated } = useCalendar({ supabase, setLoading });
  const eventsByMonth: Record<number, CalendarType[]> = {};
  for (let i = 0; i < 12; i++) {
    eventsByMonth[i] = calendar.filter((event) => {
      const date = new Date(event.date);
      return date.getMonth() === i;
    });
  }

  return (
    <div className="flex w-full flex-col space-y-5 pb-20 pt-10">
      {!loading ? <Overview lastUpdated={lastUpdated[0].created_at} /> : null}
      <Filters filterMonth={filterMonth} setFilterMonth={setFilterMonth} />
      {MONTHS.map(
        ({ key, name }, index) =>
          (filterMonth === "All" || filterMonth === key) && (
            <Month key={index} name={name} events={eventsByMonth[index]} />
          )
      )}
    </div>
  );
}
