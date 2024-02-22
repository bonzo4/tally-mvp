import { Database } from "@/lib/supabase/types";

export type Color = Database["public"]["Enums"]["colors_enum"];

export const textCssMap: Record<Color, string> = {
  primary: "text-tally-primary",
  red: "text-tally-red",
  orange: "text-tally-orange",
  yellow: "text-tally-yellow",
  green: "text-tally-green",
  blue: "text-tally-blue",
  purple: "text-tally-purple",
  indigo: "text-tally-indigo",
  gray: "text-tally-gray",
  white: "text-tally-white",
};

export const bgCssMap: Record<Color, string> = {
  primary: "bg-tally-primary",
  red: "bg-tally-red",
  orange: "bg-tally-orange",
  yellow: "bg-tally-yellow",
  green: "bg-tally-green",
  blue: "bg-tally-blue",
  purple: "bg-tally-purple",
  indigo: "bg-tally-indigo",
  gray: "bg-tally-gray",
  white: "bg-tally-white",
};

export const hexMap: Record<string, string> = {
  background: "#0C0D0C",
  layer1: "18181B",
  layer2: "#232427",
  layer3: "#515261",
  primary: "#46FF9B",
  primray2: "#16CB74",
  red: "#FF6F6F",
  orange: "#FB5C18",
  yellow: "#FFF96F",
  green: "#6EFF97",
  blue: "#18A0FB",
  purple: "#716EFF",
  indigo: "#D96EFF",
  gray: "#959997",
  white: "#FFFFFF",
};
