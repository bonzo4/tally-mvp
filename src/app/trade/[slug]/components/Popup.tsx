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

import { BuyFormState } from "./BuyCard";
import { SellFormState } from "./SellCard";
import {
  formatDollarsWithCents,
  formatNumberWithCommasNoDecimals,
  formatPercentageWithOneDecimal,
} from "@/lib/formats";
import { BuyUseFormState } from "@/lib/api/actions/submitBuy";
import { SellUseFormState } from "@/lib/api/actions/submitSell";
import { FEE_RATE } from "@/lib/constants";
import { Estimate } from "@/app/api/estimateBuy/route";

function EstimateLineItem({ txn }: { txn: Estimate }) {
  return (
    <TableRow className="border-0 hover:bg-tally-background">
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
  estimate: Estimate[] | null;
  tradeSide: "BUY" | "SELL";
}) {
  const subtotal = estimate?.reduce(
    (acc, txn) => acc + txn.cumulativeDollars,
    0
  );
  const fees = estimate?.reduce((acc, txn) => acc + txn.fees, 0);
  const total =
    !subtotal || !fees
      ? undefined
      : tradeSide === "BUY"
        ? subtotal + fees
        : tradeSide === "SELL"
          ? subtotal - fees
          : undefined;

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
        {estimate ? (
          estimate.map((txn, index) => (
            <EstimateLineItem key={index} txn={txn} />
          ))
        ) : (
          <Loading />
        )}
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

export function SellConfirmation({
  trigger,
  submit,
  formState,
  validateFormState,
  estimate,
  setEstimate,
}: {
  trigger: React.ReactNode;
  submit: React.ReactNode;
  formState: SellFormState;
  validateFormState: SellUseFormState;
  estimate: Estimate[] | null;
  setEstimate: (value: Estimate[] | null) => void;
}) {
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    if (open) {
      (async () => {
        const res = await fetch("/api/estimateSell", {
          method: "POST",
          body: JSON.stringify(formState),
        });
        const data = await res.json();
        setEstimate(data);
      })();
    }
  }, [open, formState, setEstimate]);

  const [balance, setBalance] = useState<number | null>(null);
  useEffect(() => {
    (async () => {
      const res = await fetch("/api/userBalance");
      const { userBalance } = await res.json();
      setBalance(Number(userBalance));
    })();
  }, []);

  useEffect(() => {
    setOpen(validateFormState?.status === "success");
  }, [validateFormState]);

  const subtotal = estimate?.reduce(
    (acc, txn) => acc + txn.cumulativeDollars,
    0
  );
  const fees = estimate?.reduce((acc, txn) => acc + txn.fees, 0);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger}
      <DialogContent className="border border-tally-red bg-tally-background text-white">
        <DialogHeader>
          <DialogTitle>Order Cofirmation</DialogTitle>
          <DialogDescription>
            Please note that the price provided below is an estimate. Actual
            transaction prices may vary due. Transactions will proceed only if
            slippage is within 5%; otherwise, they will be cancelled.
          </DialogDescription>
        </DialogHeader>
        <ReceiptEstimate estimate={estimate} tradeSide="SELL" />
        <BalanceDelta
          total={subtotal && fees ? subtotal - fees : 0}
          balance={balance ? balance : 0}
          tradeSide="SELL"
        />
        {submit}
      </DialogContent>
    </Dialog>
  );
}

export function BuyConfirmation({
  children,
  trigger,
  submit,
  formState,
  validateFormState,
  estimate,
  setEstimate,
}: {
  children: React.ReactNode;
  trigger: React.ReactNode;
  submit: React.ReactNode;
  formState: BuyFormState[];
  validateFormState: BuyUseFormState;
  estimate: Estimate[] | null;
  setEstimate: (value: Estimate[] | null) => void;
}) {
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    if (open) {
      (async () => {
        const res = await fetch("/api/estimateBuy", {
          method: "POST",
          body: JSON.stringify(formState),
        });
        const data = await res.json();
        setEstimate(data);
      })();
    }
  }, [open, formState, setEstimate]);

  const [balance, setBalance] = useState<number | null>(null);
  useEffect(() => {
    (async () => {
      const res = await fetch("/api/userBalance");
      const { userBalance } = await res.json();
      setBalance(Number(userBalance));
    })();
  }, []);

  useEffect(() => {
    setOpen(validateFormState?.status === "success");
  }, [validateFormState]);

  const subtotal = estimate?.reduce(
    (acc, txn) => acc + txn.cumulativeDollars,
    0
  );
  const fees = estimate?.reduce((acc, txn) => acc + txn.fees, 0);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger}
      <DialogContent className="border border-tally-primary bg-tally-background text-white">
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
    </Dialog>
  );
}
