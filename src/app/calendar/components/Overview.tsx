function LastUpdated({ lastUpdated }: { lastUpdated: string }) {
  const date = new Date(lastUpdated);
  const m = date.toLocaleString("en-US", { month: "short" });
  const d = date.toLocaleString("en-US", { day: "numeric" });
  const y = date.toLocaleString("en-US", { year: "numeric" });

  return (
    <div className="inline-block text-xs text-gray-400 lg:text-base">
      {`Last Updated: ${m} ${d}, ${y}`}
    </div>
  );
}

export default function Overview({ lastUpdated }: { lastUpdated: string }) {
  return (
    <div className="flex max-w-[800px] flex-col space-y-5 px-4 lg:px-16">
      <div className="flex flex-col lg:flex-row lg:items-end lg:space-x-3">
        <div>
          <h1 className="text-2xl font-bold text-white lg:text-4xl">
            2024 Election Calendar
          </h1>
        </div>
        <LastUpdated lastUpdated={lastUpdated} />
      </div>
      <div className="text-base text-gray-400 lg:text-lg">
        Explore key dates, events and deadlines for the 2024 and other US
        elections. Some of these dates are subject to change. Check back
        frequently for the latest updates.
      </div>
    </div>
  );
}
