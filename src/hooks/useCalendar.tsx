import { Calendar } from "@/lib/supabase/queries/calendar";
import { Database } from "@/lib/supabase/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

type useCalendarOptions = {
  supabase: SupabaseClient<Database>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export function useCalendar({ supabase, setLoading }: useCalendarOptions) {
  const [calendar, setCalendar] = useState<Calendar[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Calendar[]>([]);
  useEffect(() => {
    const getCalendar = async () => {
      const res = await fetch("/api/calendar");

      const data = await res.json();

      if (data.error) {
        console.log(data.error);
        return;
      }

      const { calendar, lastUpdated } = data;
      setCalendar(calendar);
      setLastUpdated(lastUpdated);
      setLoading(false);
    };
    getCalendar();
  }, [supabase, setLoading]);
  return { calendar: calendar, lastUpdated: lastUpdated };
}
