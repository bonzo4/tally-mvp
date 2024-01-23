import { Database } from "../../types";
import { SupabaseClient } from "@supabase/supabase-js";
import { PostgrestResponse } from "@supabase/postgrest-js";
import { fetchQuery } from "../../fetch";

export type ChoiceMarket =
  Database["public"]["Tables"]["choice_markets"]["Row"];
export type SubMarket = Database["public"]["Tables"]["sub_markets"]["Row"];
export type SubMarketWithChoiceMarkets = SubMarket & {
  choice_markets: ChoiceMarket[];
  prediction_markets: { category: string | null } | null;
};

type GetSubMarketsQueryOptions = { slug: string };

type GetSubMarketsOptions = {
  supabase: SupabaseClient<Database>;
  options: GetSubMarketsQueryOptions;
};

// Need to use the more complicated `choice_markets!...` syntax
// because there's a foreign key in both tables linking to the other.
// source: https://postgrest.org/en/stable/references/api/resource_embedding.html
const getSubMarketsQuery = async ({
  supabase,
  options,
}: GetSubMarketsOptions): Promise<
  PostgrestResponse<SubMarketWithChoiceMarkets>
> => {
  const slug = options.slug;
  return await supabase
    .from("sub_markets")
    .select(`*, choice_markets(*), prediction_markets(category)`)
    .eq("slug", slug)
    .order("order", { foreignTable: "choice_markets", ascending: true })
    .order("total_pot", { foreignTable: "choice_markets", ascending: false });
};

export const getSubMarkets = async ({
  supabase,
  options,
}: GetSubMarketsOptions) =>
  await fetchQuery<SubMarketWithChoiceMarkets, GetSubMarketsQueryOptions>({
    supabase: supabase,
    query: getSubMarketsQuery,
    options: options,
  });
