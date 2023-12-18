import { getItems } from ".";
import { Database } from "../types";

export type SubMarket = Database["public"]["Tables"]["sub_markets"]["Row"];

export const getSubMarketsDocs = getItems<SubMarket>;
