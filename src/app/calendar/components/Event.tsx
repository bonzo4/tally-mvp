import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import { CiBellOn } from "react-icons/ci";

function EventTypeBadge({ type }: { type: string }) {
  const bgCssOptions: Record<string, string> = {
    "Key Date": "bg-yellow-200 hover:bg-yellow-200",
    "Market End": "bg-fuchsia-400 hover:bg-fuchsia-400",
    "Fair Launch": "bg-cyan-300 hover:bg-cyan-300",
  };

  const bgColor = bgCssOptions[type];

  return (
    <Badge className={cn(bgColor, "py-1 text-sm text-black")}>{type}</Badge>
  );
}

function ReminderButton() {
  return (
    <Button variant="outline" size="icon" className="border-0" asChild>
      <div className="rounded-lg bg-neutral-800 p-1 hover:bg-neutral-700">
        <CiBellOn className="text-4xl text-neutral-400 hover:text-neutral-300" />
      </div>
    </Button>
  );
}

function DateStamp({ month, day }: { month: string; day: number }) {
  return (
    <div className="flex min-h-[45px] min-w-[45px] flex-shrink-0 flex-grow-0 flex-col items-center justify-center rounded-lg bg-neutral-800">
      <div>
        <div className="-mb-1 text-center text-xs font-bold text-gray-400">
          {month}
        </div>
        <div className="-mt-1 text-center text-xl font-bold text-white">
          {day}
        </div>
      </div>
    </div>
  );
}

function Title({
  month,
  day,
  title,
}: {
  month: string;
  day: number;
  title: string;
}) {
  return (
    <div className="flex flex-row space-x-3">
      <DateStamp month={month} day={day} />
      <div className="font-bold text-white">{title}</div>
    </div>
  );
}

function Description({ description }: { description: string }) {
  return <div className="text-neutral-400">{description}</div>;
}

export interface EventProps {
  date: string;
  title: string;
  description: string;
  src?: string;
  type: string;
  is_highlighted?: boolean;
}

export function Event({
  date,
  title,
  description,
  src,
  type,
  is_highlighted,
}: EventProps) {
  const backgroundCssOptions = {
    default: "bg-zinc-900",
    gradient: "bg-gradient-to-r from-zinc-900 to-neutral-700",
  };

  let backgroundCss = backgroundCssOptions.default;
  if (is_highlighted) {
    backgroundCss = backgroundCssOptions.gradient;
  }

  const month = new Date(date)
    .toLocaleString("default", { month: "short" })
    .toUpperCase();
  const day = new Date(date).getDate();

  return (
    <div
      className={`flex h-full w-full flex-col justify-between space-y-3 rounded-2xl p-4 ${backgroundCss} shadow`}
    >
      <div className="space-y-3">
        <div className={`flex items-center justify-between`}>
          <EventTypeBadge type={type} />
          <ReminderButton />
        </div>
        <Title month={month} day={day} title={title} />
        <Description description={description} />
      </div>
    </div>
  );
}
