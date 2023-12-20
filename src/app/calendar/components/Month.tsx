import { Event, EventProps } from './Event'

function MonthName({ name }: { name: string }) {
  return (
    <div>
      <h2 className="text-2xl font-bold">{ name }</h2>
    </div>
  )
}

function MonthGrid({ events }: { events: EventProps[] }) {
  return (
    <div className="grid lg:grid-cols-3 gap-5">
      {events.map((event, index) => {
        return (
          <Event {...event}/>
        )
      })}
    </div>
  )
}

export default function Month({ name, events }: { name: string, events: EventProps[] }) {
  if (events.length === 0) {
    return
  }

  return (
    <div className="flex flex-col space-y-5">
      <MonthName name={name} />
      <MonthGrid events={events} />
    </div>
  )
}

