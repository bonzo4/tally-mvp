
export default function Overview() {
  const points = 1000;
  const conviction = 3;
  return (
    <div className="h-full flex flex-col justify-center space-y-1">
      <div>
        <h1 className="text-4xl font-bold">John Doe</h1>
      </div>
      <div>
        <p className="text-lg">{`Points: ${points}`}</p>
      </div>
      <div>
        <p className="text-lg">{`Conviction: ${"🔥".repeat(conviction)}`}</p>
      </div>
    </div>
  )
}

