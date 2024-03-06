"use client";
import { ChangeEvent, useState } from "react";
import { Input } from "../../../../components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState } from "react-dom";
import { WithdrawUseFormState, withdraw } from "@/lib/api/actions/withdraw";
import { Button } from "@/components/ui/button";

type WithdrawProps = {
  userId: number;
};

export type WithdrawFormState = {
  walletKey: string;
  amount: number;
};

export default function Withdraw({ userId }: WithdrawProps) {
  const [withdrawFormState, withdrawFormAction] = useFormState<
    WithdrawUseFormState,
    FormData
  >(withdraw, null);

  const [formState, setFormState] = useState<WithdrawFormState>({
    walletKey: "",
    amount: 0,
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const { walletKey, amount } = formState;

  return (
    <div className="flex flex-col space-y-5">
      <form className="flex flex-col space-y-2" action={withdrawFormAction}>
        <Label>Amount</Label>
        <Input
          name="amount"
          type="number"
          defaultValue={"5"}
          value={amount}
          onChange={onChange}
          className="text-black"
        />
        <Label>Wallet Address</Label>
        <Input
          name="walletKey"
          type="text"
          value={walletKey}
          onChange={onChange}
          className="text-black"
        />
        <Button type="submit" className="w-full">
          Withdraw
        </Button>
      </form>
    </div>
  );
}
