import { cn } from "@/lib/utils"

import { Button, ButtonProps } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input, InputProps } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { VscCircleFilled } from "react-icons/vsc";

type ColorName = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'indigo';
type ColorClass = 
  | 'text-tally-red' 
  | 'text-tally-orange' 
  | 'text-tally-yellow' 
  | 'text-tally-green' 
  | 'text-tally-blue' 
  | 'text-tally-purple' 
  | 'text-tally-indigo';


const COLOR_MAP: Record<ColorName, ColorClass> = {
  "red": "text-tally-red",
  "orange": "text-tally-orange",
  "yellow": "text-tally-yellow",
  "green": "text-tally-green",
  "blue": "text-tally-blue",
  "purple": "text-tally-purple",
  "indigo": "text-tally-indigo",
}


export interface OrderButtonProps extends ButtonProps {
  price: number;
  selected: string | null;
}

function YesButton(props: OrderButtonProps) {
  const { price, selected, ...rest } = props;

  let color = "bg-transparent hover:bg-tally-primary/10 text-tally-primary/50 hover:text-tally-primary/60 border border-tally-primary/50"
  if (selected === "Yes") {
    color = "bg-tally-primary/20 hover:bg-tally-primary/30 text-tally-primary hover:text-tally border border-tally-primary"
  } 

  return (
    <Button variant="outline" className={cn(color, "font-bold")}>{`Yes ${price}¢`}</Button>
  )
}

function NoButton(props: OrderButtonProps) {
  const { price, selected, ...rest } = props;

  let color = "bg-transparent hover:bg-tally-red/10 text-tally-red/50 hover:text-tally-red/60 border border-tally-red/50"
  if (selected === "No") {
    color = "bg-tally-red/20 hover:bg-tally-red/30 text-tally-red border border-tally-red"
  } 

  return (
    <Button variant="outline" className={cn(color, "font-bold")}>{`No ${price}¢`}</Button>
  )
}

interface AmountInputProps extends InputProps {
  amount: number,
}

function AmountInput(props: AmountInputProps) {
  const { amount, className, ...rest } = props

  let color = "bg-transparent hover:bg-neutral-400/10 focus:bg-neutral-400/10 text-neutral-400/40 hover:text-neutral-400/40 border border-neutral-400/40"
  if (amount > 0) {
    color = "bg-neutral-400/10 text-neutral-400 hover:text-neutral-400 border border-neutral-400"
  } 

  return (
    <Input {...rest} placeholder="$0" className={cn(color, className)}></Input>
  )
}

function OrderItem({ title, color, yesPrice, noPrice, selected}: { title: string; color: string, yesPrice: number; noPrice: number; selected: string | null }) {
  let dotColor = "text-black"
  if (color in COLOR_MAP) {
    dotColor = COLOR_MAP[color as ColorName]
  }

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex space-x-1 items-center">
        <VscCircleFilled className={cn(dotColor, "")} />
        <h2 className="text-xl text-white">{title}</h2>
      </div>
      <div className="grid w-full grid-cols-3 gap-3">
        <YesButton name="Yes" price={yesPrice} selected={selected}  />
        <NoButton name="No" price={noPrice} selected={selected} />
        <AmountInput amount={0} />
      </div>
    </div>
  )
}

function BuyOrderSummary() {
  return (
    <div className="w-full flex flex-col space-y-5">
      <div className="space-y-2">
        <div className="w-full flex items-center justify-between">
          <div>
            <h2 className="text-2xl text-white font-bold">Order Amount</h2>
          </div>
          <div className="text-2xl text-white font-bold">
            $100
          </div>
        </div>
        <Button className="w-full text-black bg-tally-primary hover:text-black hover:bg-tally-primary/90 py-2 px-5">Buy</Button>
      </div>
      <div className="text-sm text-white space-y-1">
        <div className="flex justify-between w-full">
          <div className="text-gray-400 text-sm">Average Price:</div>
          <div>$.50</div>
        </div>
        <div className="flex justify-between w-full">
          <div className="text-gray-400 text-sm">Shares:</div>
          <div>45000</div>
        </div>
        <div className="flex justify-between w-full">
          <div className="text-gray-400 text-sm">Potential Return:</div>
          <div>$1000 (50%)</div>
        </div>
      </div>
    </div>
  )
}

function SellOrderSummary() {
  return (
    <div className="w-full flex flex-col space-y-5">
      <div className="space-y-2">
        <div className="w-full flex items-center justify-between">
          <div>
            <h2 className="text-2xl text-white font-bold">Shares</h2>
          </div>
          <div className="text-2xl text-white font-bold">
            $100
          </div>
        </div>
        <Button className="w-full text-black bg-tally-red hover:text-black hover:bg-tally-red/90 py-2 px-5">Sell</Button>
      </div>
      <div className="text-sm text-white space-y-1">
        <div className="flex justify-between w-full">
          <div className="text-gray-400 text-sm">Shares</div>
          <div>100</div>
        </div>
        <div className="flex justify-between w-full">
          <div className="text-gray-400 text-sm">Estimated Amount Received:</div>
          <div>$74.15</div>
        </div>
      </div>
    </div>
  )
}

export default function Order() {
  return (
    <Tabs defaultValue="buy">
      <TabsList className="grid w-full grid-cols-2 bg-zinc-900">
        <TabsTrigger className="data-[state=active]:bg-zinc-700 data-[state=active]:text-gray-300" value="buy">Buy</TabsTrigger>
        <TabsTrigger className="data-[state=active]:bg-zinc-700 data-[state=active]:text-gray-300" value="sell">Sell</TabsTrigger>
      </TabsList>
      <TabsContent className="" value="buy">
        <Card className="bg-zinc-900 border-0">
          <CardHeader className="px-2 lg:px-6">
            <CardDescription className="text-gray-300">Purchase shares by amount.</CardDescription>
          </CardHeader>
          <CardContent className="px-2 lg:px-6 space-y-3">
            <OrderItem title="Donald Trump" color="red" yesPrice={60} noPrice={40} selected="No" />
            <OrderItem title="Ron Desantis" color="orange" yesPrice={33} noPrice={67} selected="Yes" />
            <OrderItem title="Nikki Haley" color="yellow" yesPrice={4} noPrice={96} selected={null}/>
            <OrderItem title="Vivek Ramaswamy" color="green" yesPrice={3} noPrice={97} selected={null}/>
            <OrderItem title="Joe Biden" color="blue" yesPrice={1} noPrice={99} selected="No" />
            <OrderItem title="Gavin Newsom" color="purple" yesPrice={1} noPrice={99} selected="No" />
          </CardContent>
          <CardFooter className="px-2 lg:px-6">
            <BuyOrderSummary/>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="sell">
        <Card className="bg-zinc-900 border-0">
          <CardHeader className="px-2 lg:px-6">
            <CardDescription className="text-gray-300">Sell shares by number of shares.</CardDescription>
          </CardHeader>
          <CardContent className="px-2 lg:px-6 space-y-3">
            <OrderItem title="Donald Trump" color="red" yesPrice={60} noPrice={40} selected={"No"} />
            <OrderItem title="Ron Desantis" color="orange" yesPrice={33} noPrice={67} selected={"Yes"} />
            <OrderItem title="Nikki Haley" color="yellow" yesPrice={4} noPrice={96} selected={null} />
          </CardContent>
          <CardFooter className="px-2 lg:px-6">
            <SellOrderSummary/>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

