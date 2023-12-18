import { getRecentLimitItems } from ".";
import { Database } from "../types";

export type LandingBanner = Database["public"]["Tables"]["landing_banners"]["Row"];

export const getLandingBannersDocs = getRecentLimitItems<LandingBanner>;
