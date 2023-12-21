export default function Overview() {
  return (
    <div className="max-w-[800px] flex flex-col space-y-5">
      <div className="flex flex-col lg:flex-row lg:items-end lg:space-x-3">
        <div>
          <h1 className="text-2xl lg:text-4xl font-bold">2024 Election Calendar</h1>
        </div>
        <div>
          <div className="inline-block text-xs lg:text-base text-gray-600 border-b border-gray-600">Last Updated: Dec 19, 2023</div>
        </div>
      </div>
      <div>
        Explore key dates, events and deadlines for the 2024 and other US elections. Some of these dates are subject to change. Check back frequently for the latest updates.
      </div>
    </div>
  )
}

