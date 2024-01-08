import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { CiBellOn } from "react-icons/ci";
import { MdArrowForwardIos } from "react-icons/md";

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

function Header({
  month,
  day,
  name,
}: {
  month: string;
  day: number;
  name: string;
}) {
  return (
    <div className="flex flex-row space-x-3">
      <DateStamp month={month} day={day} />
      <div className="font-bold text-white">{name}</div>
    </div>
  );
}

function Description({ description }: { description: string }) {
  return <div className="text-neutral-400">{description}</div>;
}

function Footer({ src, reminder }: { src?: string; reminder: string }) {
  return (
    <div className={`flex flex-row-reverse items-center justify-between`}>
      <div className="py-1">
        <Button
          variant="outline"
          size="icon"
          className="h-[28px] w-[28px] border-0 bg-transparent hover:bg-transparent focus:bg-transparent"
          asChild
        >
          <CiBellOn className="text-xs text-neutral-400 hover:text-neutral-600" />
        </Button>
      </div>
      {src ? (
        <Button variant="link" className="-mt-1 p-0 text-tally-primary">
          <a href={src} className="flex items-center space-x-1">
            <div>Read More</div>
            <MdArrowForwardIos />
          </a>
        </Button>
      ) : null}
    </div>
  );
}

export interface EventProps {
  month: string;
  day: number;
  name: string;
  description: string;
  src?: string;
  reminder: string;
  is_highlighted?: boolean;
}

export function Event({
  month,
  day,
  name,
  description,
  src,
  reminder,
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

  return (
    <div
      className={`flex h-full w-full flex-col justify-between space-y-3 rounded-2xl px-4 pb-2 pt-4 ${backgroundCss} shadow`}
    >
      <div className="space-y-3">
        <Header month={month} day={day} name={name} />
        <Description description={description} />
      </div>
      <div className="space-y-2">
        <Separator className="bg-neutral-800" />
        <Footer src={src} reminder={reminder} />
      </div>
    </div>
  );
}
