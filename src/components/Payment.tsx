"use client";
import { HelioCheckout } from "@heliofi/checkout-react";
import { useState } from "react";
import { Input } from "./ui/input";

type PaymentProps = {
  amount: string;
};

export default function Payment() {
  const [amount, setAmount] = useState("5");

  const onAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  return (
    <>
      <Input value={amount} onChange={onAmountChange} type="number" />
      <HelioCheckout
        config={{
          paylinkId: process.env.NEXT_PUBLIC_HELIO_PAYLINK_ID!,
          network: "test",
          theme: {
            themeMode: "dark",
            colors: {
              primaryButtonBackground: "46FF9B",
              primaryButtonText: "FFFFF",
            },
          },
          amount: amount,
          // display: "button",
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
    </>
  );
}
