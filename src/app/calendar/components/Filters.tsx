import { Button } from '@/components/ui/button'

interface FilterProps {
  filterMonth: string,
  setFilterMonth: (month: string) => void
}

export default function Filters({ filterMonth, setFilterMonth }: FilterProps ) {
  return (
    <div className="grid grid-cols-4 gap-2 lg:flex lg:space-x-2">
      <Button className="col-span-4" variant={filterMonth === "All" ? "default" : "secondary"} onClick={() => setFilterMonth("All")}>All</Button>
      <Button variant={filterMonth === "Jan" ? "default" : "secondary"} onClick={() => setFilterMonth("Jan")}>Jan</Button>
      <Button variant={filterMonth === "Feb" ? "default" : "secondary"} onClick={() => setFilterMonth("Feb")}>Feb</Button>
      <Button variant={filterMonth === "Mar" ? "default" : "secondary"} onClick={() => setFilterMonth("Mar")}>Mar</Button>
      <Button variant={filterMonth === "Apr" ? "default" : "secondary"} onClick={() => setFilterMonth("Apr")}>Apr</Button>
      <Button variant={filterMonth === "May" ? "default" : "secondary"} onClick={() => setFilterMonth("May")}>May</Button>
      <Button variant={filterMonth === "Jun" ? "default" : "secondary"} onClick={() => setFilterMonth("Jun")}>Jun</Button>
      <Button variant={filterMonth === "Jul" ? "default" : "secondary"} onClick={() => setFilterMonth("Jul")}>Jul</Button>
      <Button variant={filterMonth === "Aug" ? "default" : "secondary"} onClick={() => setFilterMonth("Aug")}>Aug</Button>
      <Button variant={filterMonth === "Sep" ? "default" : "secondary"} onClick={() => setFilterMonth("Sep")}>Sep</Button>
      <Button variant={filterMonth === "Oct" ? "default" : "secondary"} onClick={() => setFilterMonth("Oct")}>Oct</Button>
      <Button variant={filterMonth === "Nov" ? "default" : "secondary"} onClick={() => setFilterMonth("Nov")}>Nov</Button>
      <Button variant={filterMonth === "Dec" ? "default" : "secondary"} onClick={() => setFilterMonth("Dec")}>Dec</Button>
    </div>
  )
}

