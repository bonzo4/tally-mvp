import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"


function BuyOrderItem({ title, yesPrice, noPrice, isYesSelected, isNoSelected }: { title: string; yesPrice: number; noPrice: number; isYesSelected: boolean; isNoSelected: boolean }) {
  let yesButtonStyle = ""
  let noButtonStyle = ""
  if (isYesSelected) { 
    yesButtonStyle = "bg-green-600 text-white hover:bg-green-500"
  } 
  if (isNoSelected) {
    noButtonStyle = "bg-red-600 text-white hover:bg-red-500"
  }

  return (
    <div className="flex flex-col space-y-2">
      <div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <div className="grid w-full grid-cols-3 gap-3">
        <Button variant="secondary" className={`${yesButtonStyle} font-bold`}>{`Yes ${yesPrice}¢`}</Button>
        <Button variant="secondary" className={`${noButtonStyle}`}>{`No ${noPrice}¢`}</Button>
        <Input placeholder="$0"></Input>
      </div>
    </div>
  )
}

function BuyOrderSummary() {
  return (
    <div className="w-full flex flex-col space-y-2">
      <div className="w-full flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Amount</h2>
        </div>
        <div className="">
          $100
        </div>
      </div>
      <div className="text-sm">
        <div className="flex justify-between w-full">
          <div>Average Price:</div>
          <div>$.50</div>
        </div>
        <div className="flex justify-between w-full">
          <div>Shares:</div>
          <div>45000</div>
        </div>
        <div className="flex justify-between w-full">
          <div>Potential Return:</div>
          <div>$1000 (50%)</div>
        </div>
      </div>
      <div className="py-2">
        <Separator />
      </div>
      <Button className="w-full bg-blue-500 hover:bg-blue-400">Buy</Button>
    </div>
  )
}

function SellOrderItem({ title, yesPrice, noPrice, isYesSelected, isNoSelected }: { title: string; yesPrice: number; noPrice: number; isYesSelected: boolean; isNoSelected: boolean }) {
  let yesButtonStyle = ""
  let noButtonStyle = ""
  if (isYesSelected) { 
    yesButtonStyle = "bg-green-600 text-white hover:bg-green-500"
  } 
  if (isNoSelected) {
    noButtonStyle = "bg-red-600 text-white hover:bg-red-500"
  }

  return (
    <div className="flex flex-col space-y-2">
      <div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <div className="grid w-full grid-cols-3 gap-3">
        <Button variant="secondary" className={`${yesButtonStyle} font-bold`}>{`Yes ${yesPrice}¢`}</Button>
        <Button variant="secondary" className={`${noButtonStyle}`}>{`No ${noPrice}¢`}</Button>
        <Input placeholder="0"></Input>
      </div>
    </div>
  )
}

function SellOrderSummary() {
  return (
    <div className="w-full flex flex-col space-y-2">
      <div className="w-full flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Shares</h2>
        </div>
        <div className="">
          100
        </div>
      </div>
      <div className="text-sm mt-5">
        <div className="flex justify-between w-full">
          <div>Average Price:</div>
          <div>$.75</div>
        </div>
        <div className="flex justify-between w-full">
          <div>Estimated Amount Received:</div>
          <div>$74.15</div>
        </div>
      </div>
      <div className="py-2">
        <Separator />
      </div>
      <Button className="w-full bg-blue-500 hover:bg-blue-400">Sell</Button>
    </div>
  )
}

export default function Order() {
  return (
    <Tabs defaultValue="buy">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="buy">Buy</TabsTrigger>
        <TabsTrigger value="sell">Sell</TabsTrigger>
      </TabsList>
      <TabsContent className="" value="buy">
        <Card>
          <CardHeader className="px-2 lg:px-6">
            <CardDescription>Purchase shares by amount.</CardDescription>
          </CardHeader>
          <CardContent className="px-2 lg:px-6 space-y-3">
            <BuyOrderItem title="Donald Trump" yesPrice={60} noPrice={40} isYesSelected={false} isNoSelected={true} />
            <BuyOrderItem title="Ron Desantis" yesPrice={33} noPrice={67} isYesSelected={true} isNoSelected={false} />
            <BuyOrderItem title="Nikki Haley" yesPrice={4} noPrice={96} isYesSelected={false} isNoSelected={false} />
            <BuyOrderItem title="Ted Cruz" yesPrice={3} noPrice={97} isYesSelected={false} isNoSelected={false} />
            <BuyOrderItem title="Mitt Romney" yesPrice={1} noPrice={99} isYesSelected={false} isNoSelected={true} />
          </CardContent>
          <CardFooter className="px-2 lg:px-6">
            <BuyOrderSummary/>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="sell">
        <Card>
          <CardHeader className="px-2 lg:px-6">
            <CardDescription>Sell shares by number of shares.</CardDescription>
          </CardHeader>
          <CardContent className="px-2 lg:px-6 space-y-3">
            <SellOrderItem title="Donald Trump" yesPrice={60} noPrice={40} isYesSelected={false} isNoSelected={true} />
            <SellOrderItem title="Ron Desantis" yesPrice={33} noPrice={67} isYesSelected={true} isNoSelected={false} />
            <SellOrderItem title="Nikki Haley" yesPrice={4} noPrice={96} isYesSelected={false} isNoSelected={false} />
          </CardContent>
          <CardFooter className="px-2 lg:px-6">
            <SellOrderSummary/>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

