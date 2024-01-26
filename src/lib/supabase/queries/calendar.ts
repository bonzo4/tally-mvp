import { Database } from "../types";
import { SupabaseClient } from "@supabase/supabase-js";
import { PostgrestResponse } from "@supabase/postgrest-js";
import { fetchQuery } from "../fetch";

export type Calendar = Database["public"]["Tables"]["calendar_events"]["Row"];

const start2024 = new Date("2024-01-01T00:00:00.000Z").toISOString();
const start2025 = new Date("2025-01-01T00:00:00.000Z").toISOString();

type GetCalendarQueryOptions = {};

type GetCalendarOptions = {
  supabase: SupabaseClient<Database>;
  options: GetCalendarQueryOptions;
};

interface CalendarQueryResponse {
  calendar: Calendar[];
  last_updated_event: Calendar;
}

const getCalendarQuery = async ({
  supabase,
}: GetCalendarOptions): Promise<PostgrestResponse<Calendar>> => {
  return await supabase
    .from("calendar_events")
    .select("*")
    .gte("date", start2024)
    .lt("date", start2025)
    .order("date", { ascending: true });
};

export const getCalendar = async ({ supabase }: GetCalendarOptions) =>
  await fetchQuery({
    supabase: supabase,
    query: getCalendarQuery,
    options: {},
  });

const getLastUpdatedQuery = async ({
  supabase,
}: GetCalendarOptions): Promise<PostgrestResponse<Calendar>> => {
  return await supabase
    .from("calendar_events")
    .select("*")
    .gte("date", start2024)
    .lt("date", start2025)
    .order("date", { ascending: false })
    .limit(1);
};

export const getLastUpdated = async ({ supabase }: GetCalendarOptions) =>
  await fetchQuery({
    supabase: supabase,
    query: getLastUpdatedQuery,
    options: {},
  });
