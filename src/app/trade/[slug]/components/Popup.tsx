import { useEffect, useState } from "react";
import { BuyFormState } from "./BuyCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Txn = {
  choiceMarketId: number;
  amount: number;
  tradeSide: "BUY" | "SELL";
  shares?: number;
};

export default function Popup({ formState }: { formState: BuyFormState[] }) {
  // useEffect(() => {
  //   const getPriceEstimates = async () => {
  //     const response = await fetch("/api/estimatePrice", {
  //       body: JSON.stringify(formState),
  //     });
  //     console.log(response);
  //     const data = await response.json();
  //     console.log(data);
  //   };
  //   getPriceEstimates();
  //   console.log("here");
  // }, [formState]);

  return (
    <Dialog>
      <DialogTrigger
        onClick={async () => {
          const res = await fetch("/api/estimatePrice", {
            method: "POST",
            body: JSON.stringify(formState),
          });
          const data = await res.json();
          console.log(data);
        }}
      >
        Open
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
