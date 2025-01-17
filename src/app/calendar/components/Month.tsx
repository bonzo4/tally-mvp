import { Event, EventProps } from "./Event";

function MonthName({ name }: { name: string }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white">{name}</h2>
    </div>
  );
}

function MonthGrid({ events }: { events: EventProps[] }) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {events.map((event, index) => {
        return <Event key={index} {...event} />;
      })}
    </div>
  );
}

export default function Month({
  name,
  events,
}: {
  name: string;
  events: EventProps[];
}) {
  if (events.length === 0) {
    return;
  }

  return (
    <div className="flex flex-col space-y-6 px-4 pt-4 lg:px-16">
      <MonthName name={name} />
      <MonthGrid events={events} />
    </div>
  );
}
