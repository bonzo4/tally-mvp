import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

function DateStamp({ month, day }: { month: string; day: number }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-md font-bold">{month}</div>
      <div className="-mt-2 text-xl font-bold text-red-500">{day}</div>
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
    <div className="flex flex-row space-x-5">
      <DateStamp month={month} day={day} />
      <div className="pr-10 text-xl font-bold">{name}</div>
    </div>
  );
}

function Description({ description }: { description: string }) {
  return <div>{description}</div>;
}

function Footer({ src, reminder }: { src?: string; reminder: string }) {
  return (
    <div className={`flex flex-row-reverse justify-between`}>
      <Button variant="secondary" className="self-end">
        Remind Me
      </Button>
      {src ? (
        <Button variant="link" className="p-0">
          <a href={src}>Read More</a>
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
    default: "bg-gray-50",
    gradient: "bg-gradient-to-r from-red-100 to-blue-100",
  };

  let backgroundCss = backgroundCssOptions.default;
  if (is_highlighted) {
    backgroundCss = backgroundCssOptions.gradient;
  }

  return (
    <div
      className={`flex h-full w-full flex-col justify-between space-y-3 border border-gray-200 p-4 ${backgroundCss} shadow`}
    >
      <div className="space-y-3">
        <Header month={month} day={day} name={name} />
        <Separator />
        <Description description={description} />
      </div>
      <Footer src={src} reminder={reminder} />
    </div>
  );
}
