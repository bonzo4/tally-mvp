"use client";
import { HelioCheckout } from "@heliofi/checkout-react";
import { ChangeEvent, useState } from "react";
import { Input } from "../../../../components/ui/input";
import { Label } from "@/components/ui/label";

type PaymentProps = {
  amount: string;
};

export default function Deposit() {
  const [amount, setAmount] = useState("5");

  const onAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (parseInt(event.target.value) < 0) setAmount("0.01");
    else setAmount(event.target.value);
  };

  return (
    <div className="flex flex-col">
      <Label htmlFor="link" className="sr-only">
        Link
      </Label>
      <Input
        defaultValue={"5"}
        value={amount}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setAmount(e.target.value)
        }
      />
      <HelioCheckout
        config={{
          paylinkId: process.env.NEXT_PUBLIC_HELIO_PAYLINK_ID!,
          network: "main",
          theme: {
            themeMode: "dark",
            colors: {
              primaryButtonBackground: "46FF9B",
              primaryButtonText: "FFFFFF",
              primaryButtonBackgroundHover: "46FF9B",
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
