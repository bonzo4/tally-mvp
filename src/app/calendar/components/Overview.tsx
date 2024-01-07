export default function Overview() {
  return (
    <div className="flex max-w-[800px] flex-col space-y-5">
      <div className="flex flex-col lg:flex-row lg:items-end lg:space-x-3">
        <div>
          <h1 className="text-2xl font-bold text-white lg:text-4xl">
            2024 Election Calendar
          </h1>
        </div>
        <div>
          <div className="inline-block text-xs text-gray-400 lg:text-base">
            Last Updated: Dec 19, 2023
          </div>
        </div>
      </div>
      <div className="text-base text-gray-400 lg:text-lg">
        Explore key dates, events and deadlines for the 2024 and other US
        elections. Some of these dates are subject to change. Check back
        frequently for the latest updates.
      </div>
    </div>
  );
}
