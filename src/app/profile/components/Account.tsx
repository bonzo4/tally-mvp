import { Button } from "@/components/ui/button";

export default function Account() {
  const portfolio = "$500"
  const balance = "$1000"
  return (
    <div className="w-full border border-black flex flex-col lg:flex-row space-y-3 lg:space-y-0 justify-between p-2 lg:p-5">
      <div className="flex flex-col">
        <p className="text-lg">{`Portfolio: ${portfolio}`}</p>
        <p className="text-lg">{`Balance: ${balance}`}</p>
      </div>
      <div className="flex flex-col justify-evenly space-y-3">
        <Button>Deposit</Button>
        <Button>Withdraw</Button>
      </div>
    </div>
  )
}
