import { Calendar } from "@/lib/supabase/calendar";
import { Database } from "@/lib/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

type useCalendarOptions = {
  supabase: SupabaseClient<Database>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export function useCalendar({ supabase, setLoading }: useCalendarOptions) {
  const [calendar, setCalendar] = useState<Calendar[]>([]);
  useEffect(() => {
    const getCalendar = async () => {
      const res = await fetch("/api/calendar");

      const data = await res.json();

      if (data.error) {
        console.log(data.error);
        return;
      }

      setCalendar(data);
      setLoading(false);
    };
    getCalendar();
  }, [supabase, setLoading]);
  return calendar;
}
