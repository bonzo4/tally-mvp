import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
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

import {
  formatDollarsWithCents,
  formatNumberWithCommas,
  formatPercentageWithOneDecimal,
} from "@/lib/formats";
import {
  FairLaunchEstimate,
  FairLaunchUseFormState,
} from "@/lib/api/actions/submitFairLaunch";
import { FEE_RATE } from "@/lib/constants";
import { Estimate } from "@/app/api/estimateBuy/route";

function EstimateLineItem({ txn }: { txn: FairLaunchEstimate }) {
  return (
    <TableRow className="border-0 hover:bg-tally-background">
      <TableCell className="font-medium">{txn.subMarketTitle}</TableCell>
      <TableCell>{txn.choiceMarketTitle}</TableCell>
      <TableCell>{formatNumberWithCommas(txn.cumulativeShares, 2)}</TableCell>
      <TableCell>{formatDollarsWithCents(txn.avgPrice)}</TableCell>
      <TableCell className="text-right">
        {formatDollarsWithCents(txn.cumulativeDollars)}
      </TableCell>
    </TableRow>
  );
}

function Loading() {
  return (
    <TableRow className="flex items-center justify-center text-white">
      <TableCell colSpan={5}>Loading...</TableCell>
    </TableRow>
  );
}

function ReceiptEstimate({
  estimate,
  tradeSide,
}: {
  estimate: FairLaunchEstimate;
  tradeSide: "BUY" | "SELL";
}) {
  const subtotal = estimate?.cumulativeDollars || 0;
  const fees = subtotal * FEE_RATE;
  const total = subtotal && fees ? subtotal + fees : 0;

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
        <EstimateLineItem txn={estimate} />
      </TableBody>
      <TableFooter>
        <TableRow className="bg-tally-background text-tally-gray hover:bg-tally-background">
          <TableCell className="px-4 py-2" colSpan={4}>
            Subtotal
          </TableCell>
          <TableCell className="px-4 py-2 text-right">
            {subtotal
              ? formatDollarsWithCents(subtotal)
              : formatDollarsWithCents(0)}
          </TableCell>
        </TableRow>
        <TableRow className="bg-tally-background text-tally-gray hover:bg-tally-background">
          <TableCell
            className="px-4 py-2"
            colSpan={4}
          >{`Fees (${formatPercentageWithOneDecimal(FEE_RATE)})`}</TableCell>
          <TableCell className="px-4 py-2 text-right">
            {fees ? formatDollarsWithCents(fees) : formatDollarsWithCents(0)}
          </TableCell>
        </TableRow>
        <TableRow className="border-t border-white bg-tally-background hover:bg-tally-background">
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right">
            {total ? formatDollarsWithCents(total) : formatDollarsWithCents(0)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

function BalanceDelta({
  total,
  balance,
  tradeSide,
}: {
  total: number;
  balance: number;
  tradeSide: "BUY" | "SELL";
}) {
  const delta = tradeSide === "BUY" ? balance - total : balance + total;
  return (
    <div className="px-4 text-sm text-tally-gray">
      <div className="grid grid-cols-4">
        <div className="col-span-3 text-right">Current Balance</div>
        <div className="text-right">{formatDollarsWithCents(balance)}</div>
      </div>
      <div className="grid grid-cols-4">
        <div className="col-span-3 text-right">New Balanace</div>
        <div className="text-right">{formatDollarsWithCents(delta)}</div>
      </div>
    </div>
  );
}

export function FairLaunchConfirmation({
  className,
  trigger,
  submit,
  estimate,
}: {
  className: string;
  trigger: React.ReactNode;
  estimate: FairLaunchEstimate | null;
  submit: React.ReactNode;
}) {
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    setOpen(!!estimate);
  }, [estimate]);

  const [balance, setBalance] = useState<number | null>(null);
  useEffect(() => {
    (async () => {
      const res = await fetch("/api/userBalance");
      const { userBalance } = await res.json();
      setBalance(Number(userBalance));
    })();
  }, []);

  const subtotal = estimate?.cumulativeDollars || 0;
  const fees = subtotal * FEE_RATE;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger}
      {estimate ? (
        <DialogContent
          className={cn(className, "border bg-tally-background text-white")}
        >
          <DialogHeader>
            <DialogTitle>Order Cofirmation</DialogTitle>
            <DialogDescription>
              Please note that the price provided below is an estimate. Actual
              transaction prices may vary due. Transactions will proceed only if
              slippage is within 5%; otherwise, they will be cancelled.
            </DialogDescription>
          </DialogHeader>
          <ReceiptEstimate estimate={estimate} tradeSide="BUY" />
          <BalanceDelta
            total={subtotal && fees ? subtotal + fees : 0}
            balance={balance ? balance : 0}
            tradeSide="BUY"
          />
          {submit}
        </DialogContent>
      ) : null}
    </Dialog>
  );
}
