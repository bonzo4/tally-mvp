
import { getRecentLimitItems } from ".";
import { Database } from "../types";

export type MarketsBanner = Database["public"]["Tables"]["market_banners"]["Row"];

export const getMarketsBannersDocs = getRecentLimitItems<MarketsBanner>;
