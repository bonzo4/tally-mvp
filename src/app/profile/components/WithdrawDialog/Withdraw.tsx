"use client";
import { HelioCheckout } from "@heliofi/checkout-react";
import { ChangeEvent, useState } from "react";
import { Input } from "../../../../components/ui/input";
import { Label } from "@/components/ui/label";

type WithdrawProps = {
  userId: number;
};

export default function Withdraw({ userId }: WithdrawProps) {
  const [amount, setAmount] = useState("5");

  return (
    <div className="flex flex-col space-y-5">
      <div className="flex flex-col space-y-2">
        <Label>Amount</Label>
        <Input
          defaultValue={"5"}
          value={amount}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setAmount(e.target.value)
          }
          className="text-black"
        />
      </div>
      <HelioCheckout
        config={{
          additionalJSON: {
            userId,
          },
          paylinkId: process.env.NEXT_PUBLIC_HELIO_PAYLINK_ID!,
          network: "main",
          theme: {
            themeMode: "dark",
            colors: {
              primaryButtonBackground: "#46FF9B",
              primaryButtonText: "#000000",
              primaryButtonBackgroundHover: "#46FF9B",
            },
          },
          amount: amount,
          onSuccess: (event: {
            data: unknown;
            transaction: string;
            paymentPK?: string;
            swapTransactionSignature?: string;
            blockchainSymbol?: string;
          }) => console.log(event),
          onError: (event: { transaction?: string; errorMessage?: string }) =>
            console.log(event),
          onPending: (event: { data?: unknown; transaction: string }) =>
            console.log(event),
          onCancel: () => console.log("Cancelled payment"),
          onStartPayment: () => console.log("Starting payment"),
        }}
      />
    </div>
  );
}
