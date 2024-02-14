import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { BuyEstimate } from "@/app/api/estimatePrice/route";
import { BuyFormState } from "./BuyCard";
import {
  formatDollarsWithCents,
  formatNumberWithCommasNoDecimals,
} from "@/lib/formats";
import { BuyUseFormState } from "@/lib/api/actions/submitBuy";

function BuyEstimateLineItem({ txn }: { txn: BuyEstimate }) {
  return (
    <TableRow className="hover:bg-tally-layer-1">
      <TableCell className="font-medium">{txn.subMarketTitle}</TableCell>
      <TableCell>{txn.choiceMarketTitle}</TableCell>
      <TableCell>
        {formatNumberWithCommasNoDecimals(txn.cumulativeShares)}
      </TableCell>
      <TableCell>{formatDollarsWithCents(txn.avgPrice)}</TableCell>
      <TableCell className="text-right">
        {formatDollarsWithCents(txn.cumulativeDollars)}
      </TableCell>
    </TableRow>
  );
}

function ReceiptEstimate({
  buyEstimate,
}: {
  buyEstimate: BuyEstimate[] | null;
}) {
  const total = buyEstimate?.reduce(
    (acc, txn) => acc + txn.cumulativeDollars,
    0
  );
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-tally-layer-1">
          <TableHead className="w-[100px]">Market</TableHead>
          <TableHead>Choice</TableHead>
          <TableHead>Shares</TableHead>
          <TableHead>Price per share</TableHead>
          <TableHead className="text-right">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {buyEstimate?.map((txn, index) => (
          <BuyEstimateLineItem key={index} txn={txn} />
        ))}
      </TableBody>
      <TableFooter>
        <TableRow className="bg-tally-layer-1 hover:bg-tally-layer-2">
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right">
            {total ? formatDollarsWithCents(total) : formatDollarsWithCents(0)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

export default function Popup({
  children,
  trigger,
  formState,
  validateFormState,
}: {
  children: React.ReactNode;
  trigger: React.ReactNode;
  formState: BuyFormState[];
  validateFormState: BuyUseFormState;
}) {
  const [buyEstimate, setBuyEstimate] = useState<BuyEstimate[] | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (open) {
      (async () => {
        const res = await fetch("/api/estimatePrice", {
          method: "POST",
          body: JSON.stringify(formState),
        });
        const data = await res.json();
        setBuyEstimate(data);
      })();
    }
  }, [open, formState]);

  useEffect(() => {
    setOpen(validateFormState?.status === "success");
  }, [validateFormState]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger}
      <DialogContent className="border border-tally-primary bg-tally-background text-white">
        <DialogHeader>
          <DialogTitle>Order Cofirmation</DialogTitle>
          <DialogDescription>
            Please note that the price provided for your transaction is an
            estimate based on current market conditions. Actual transaction
            prices may vary due to market volatility, timing, and order
            execution factors. We strive to provide the most accurate estimates
            possible, but cannot guarantee the final transaction price will
            match the estimated price. Proceed with awareness of potential price
            adjustments.
          </DialogDescription>
        </DialogHeader>
        <ReceiptEstimate buyEstimate={buyEstimate} />
        <form action={() => console.log("actioning!")}>{children}</form>
      </DialogContent>
    </Dialog>
  );
}
