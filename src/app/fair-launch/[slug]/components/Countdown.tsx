"use client";

import { useEffect, useState } from "react";

function getTimeRemaining(now: number, end: number) {
  if (now > end) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  let distance = (end - now) / 1000;
  const days = Math.floor(distance / (60 * 60 * 24));
  distance %= 60 * 60 * 24;
  const hours = Math.floor(distance / (60 * 60));
  distance %= 60 * 60;
  const minutes = Math.floor(distance / 60);
  distance %= 60;
  const seconds = Math.floor(distance);
  return { days, hours, minutes, seconds };
}

function Unit({ unit, amount }: { unit: string; amount: number }) {
  return (
    <div className="flex max-w-[70px] flex-col items-center justify-center rounded-lg bg-neutral-800/80 px-2 py-2 lg:px-4">
      <div>
        <div className="-mb-1 -mt-1 text-center text-xl font-bold text-white lg:text-3xl">
          {amount}
        </div>
        <div className="-mb-1 text-center text-xs font-bold text-tally-gray lg:text-base">
          {unit}
        </div>
      </div>
    </div>
  );
}

export default function Countdown({ end }: { end: Date }) {
  const [now, setNow] = useState<Date>();

  useEffect(() => {
    setNow(new Date());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, [now]);

  if (!now) return null;
  const { days, hours, minutes, seconds } = getTimeRemaining(
    now.getTime(),
    end.getTime()
  );
  return (
    <div className="flex space-x-2">
      <Unit unit="Days" amount={days} />
      <Unit unit="Hours" amount={hours} />
      <Unit unit="Mins" amount={minutes} />
      <Unit unit="Secs" amount={seconds} />
    </div>
  );
}
