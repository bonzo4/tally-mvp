import { cn } from "@/lib/utils";

import { Button, ButtonProps } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input, InputProps } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { VscCircleFilled } from "react-icons/vsc";

type ColorName =
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "purple"
  | "indigo";
type ColorClass =
  | "text-tally-red"
  | "text-tally-orange"
  | "text-tally-yellow"
  | "text-tally-green"
  | "text-tally-blue"
  | "text-tally-purple"
  | "text-tally-indigo";

const COLOR_MAP: Record<ColorName, ColorClass> = {
  red: "text-tally-red",
  orange: "text-tally-orange",
  yellow: "text-tally-yellow",
  green: "text-tally-green",
  blue: "text-tally-blue",
  purple: "text-tally-purple",
  indigo: "text-tally-indigo",
};

export interface OrderButtonProps extends ButtonProps {
  price: number;
  selected: string | null;
}

function YesButton(props: OrderButtonProps) {
  const { price, selected, ...rest } = props;

  let color =
    "bg-transparent hover:bg-tally-primary/10 text-tally-primary/50 hover:text-tally-primary/60 border border-tally-primary/50";
  if (selected === "Yes") {
    color =
      "bg-tally-primary/20 hover:bg-tally-primary/30 text-tally-primary hover:text-tally border border-tally-primary";
  }

  return (
    <Button
      variant="outline"
      className={cn(color, "font-bold")}
    >{`Yes ${price}¢`}</Button>
  );
}

function NoButton(props: OrderButtonProps) {
  const { price, selected, ...rest } = props;

  let color =
    "bg-transparent hover:bg-tally-red/10 text-tally-red/50 hover:text-tally-red/60 border border-tally-red/50";
  if (selected === "No") {
    color =
      "bg-tally-red/20 hover:bg-tally-red/30 text-tally-red border border-tally-red";
  }

  return (
    <Button
      variant="outline"
      className={cn(color, "font-bold")}
    >{`No ${price}¢`}</Button>
  );
}

interface AmountInputProps extends InputProps {
  amount: number;
}

function AmountInput(props: AmountInputProps) {
  const { amount, className, ...rest } = props;

  let color =
    "bg-transparent hover:bg-neutral-400/10 focus:bg-neutral-400/10 text-neutral-400/40 hover:text-neutral-400/40 border border-neutral-400/40";
  if (amount > 0) {
    color =
      "bg-neutral-400/10 text-neutral-400 hover:text-neutral-400 border border-neutral-400";
  }

  return (
    <Input {...rest} placeholder="$0" className={cn(color, className)}></Input>
  );
}

function OrderItem({
  title,
  color,
  yesPrice,
  noPrice,
  selected,
}: {
  title: string;
  color: string;
  yesPrice: number;
  noPrice: number;
  selected: string | null;
}) {
  let dotColor = "text-black";
  if (color in COLOR_MAP) {
    dotColor = COLOR_MAP[color as ColorName];
  }

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center space-x-1">
        <VscCircleFilled className={cn(dotColor, "")} />
        <h2 className="text-xl text-white">{title}</h2>
      </div>
      <div className="grid w-full grid-cols-3 gap-3">
        <YesButton name="Yes" price={yesPrice} selected={selected} />
        <NoButton name="No" price={noPrice} selected={selected} />
        <AmountInput amount={0} />
      </div>
    </div>
  );
}

function BuyOrderSummary() {
  return (
    <div className="flex w-full flex-col space-y-5">
      <div className="space-y-2">
        <div className="flex w-full items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Order Amount</h2>
          </div>
          <div className="text-2xl font-bold text-white">$100</div>
        </div>
        <Button className="w-full bg-tally-primary px-5 py-2 text-black hover:bg-tally-primary/90 hover:text-black">
          Buy
        </Button>
      </div>
      <div className="space-y-1 text-sm text-white">
        <div className="flex w-full justify-between">
          <div className="text-sm text-gray-400">Average Price:</div>
          <div>$.50</div>
        </div>
        <div className="flex w-full justify-between">
          <div className="text-sm text-gray-400">Shares:</div>
          <div>45000</div>
        </div>
        <div className="flex w-full justify-between">
          <div className="text-sm text-gray-400">Potential Return:</div>
          <div>$1000 (50%)</div>
        </div>
      </div>
    </div>
  );
}

function SellOrderSummary() {
  return (
    <div className="flex w-full flex-col space-y-5">
      <div className="space-y-2">
        <div className="flex w-full items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Shares</h2>
          </div>
          <div className="text-2xl font-bold text-white">$100</div>
        </div>
        <Button className="w-full bg-tally-red px-5 py-2 text-black hover:bg-tally-red/90 hover:text-black">
          Sell
        </Button>
      </div>
      <div className="space-y-1 text-sm text-white">
        <div className="flex w-full justify-between">
          <div className="text-sm text-gray-400">Shares</div>
          <div>100</div>
        </div>
        <div className="flex w-full justify-between">
          <div className="text-sm text-gray-400">
            Estimated Amount Received:
          </div>
          <div>$74.15</div>
        </div>
      </div>
    </div>
  );
}

export default function Order() {
  return (
    <Tabs className="flex flex-col overflow-auto" defaultValue="buy">
      <TabsList className="grid w-full grid-cols-2 bg-zinc-800">
        <TabsTrigger
          className="data-[state=active]:bg-zinc-700 data-[state=active]:text-gray-300"
          value="buy"
        >
          Buy
        </TabsTrigger>
        <TabsTrigger
          className="data-[state=active]:bg-zinc-700 data-[state=active]:text-gray-300"
          value="sell"
        >
          Sell
        </TabsTrigger>
      </TabsList>
      <TabsContent className="flex flex-col overflow-auto" value="buy">
        <Card className="flex flex-col overflow-auto border-0 bg-zinc-900">
          <CardContent className="space-y-3 overflow-auto px-2 py-4 lg:px-6">
            <OrderItem
              title="Donald Trump"
              color="red"
              yesPrice={60}
              noPrice={40}
              selected="No"
            />
            <OrderItem
              title="Ron Desantis"
              color="orange"
              yesPrice={33}
              noPrice={67}
              selected="Yes"
            />
            <OrderItem
              title="Nikki Haley"
              color="yellow"
              yesPrice={4}
              noPrice={96}
              selected={null}
            />
            <OrderItem
              title="Vivek Ramaswamy"
              color="green"
              yesPrice={3}
              noPrice={97}
              selected={null}
            />
            <OrderItem
              title="Joe Biden"
              color="blue"
              yesPrice={1}
              noPrice={99}
              selected="No"
            />
            <OrderItem
              title="Gavin Newsom"
              color="purple"
              yesPrice={1}
              noPrice={99}
              selected="No"
            />
          </CardContent>
          <CardFooter className="px-2 py-4 lg:px-6">
            <BuyOrderSummary />
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent className="flex flex-col overflow-auto" value="sell">
        <Card className="flex flex-col overflow-auto border-0 bg-zinc-900">
          <CardContent className="space-y-3 overflow-auto px-2 py-4 lg:px-6">
            <OrderItem
              title="Donald Trump"
              color="red"
              yesPrice={60}
              noPrice={40}
              selected={"No"}
            />
            <OrderItem
              title="Ron Desantis"
              color="orange"
              yesPrice={33}
              noPrice={67}
              selected={"Yes"}
            />
            <OrderItem
              title="Nikki Haley"
              color="yellow"
              yesPrice={4}
              noPrice={96}
              selected={null}
            />
          </CardContent>
          <CardFooter className="px-2 py-4 lg:px-6">
            <SellOrderSummary />
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
