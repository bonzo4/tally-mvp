"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/supabase/queries/user";
import { SupabaseClient } from "@supabase/supabase-js";
import { getTallyClob } from "@/lib/solana/program";
import { getManagerKeyPair } from "@/lib/solana/wallet";
import { getUserPDA } from "@/lib/solana/pdas";
import { PublicKey } from "@solana/web3.js";
import {
  createAssociatedTokenAccount,
  getAssociatedTokenAddressSync,
} from "@solana/spl-token";
import { AnchorError, BN } from "@coral-xyz/anchor";
import { sendTransactions } from "@/lib/solana/transaction";

export type BuyErrorMessages = {
  radio: string;
  text: string;
};

type BuyErrors = {
  [key: number]: BuyErrorMessages;
};

export type WithdrawUseFormState =
  | {
      status: "success";
      message: string;
    }
  | {
      status: "error";
      message: string;
      errors: BuyErrors;
    }
  | null;

class FormError extends Error {
  errors: BuyErrors;

  constructor(errors: BuyErrors) {
    super("Form validation failed.");
    this.errors = errors;
  }
}

type FormattedWithdrawFormData = {
  amount: number;
  walletKey: string;
};

async function checkUserLoggedIn({ supabase }: { supabase: SupabaseClient }) {
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) {
    throw Error("AuthError: User is not authenticated.");
  }
  const user = authUser
    ? await getUser({
        supabase: supabase,
        options: { userId: authUser.id },
      })
    : null;

  if (!user) {
    throw Error("AuthError: User could not be found.");
  }
  return user;
}

function validateFormData(
  formData: FormData,
  balance: number
): FormattedWithdrawFormData {
  const walletKey = formData.get("walletKey") as string;
  if (!walletKey) {
    throw new FormError({
      1: {
        radio: "Wallet key is required.",
        text: "Wallet key is required.",
      },
    });
  }
  const amount = formData.get("amount") as string;
  if (!amount) {
    throw new FormError({
      2: {
        radio: "Amount is required.",
        text: "Amount is required.",
      },
    });
  }
  if (parseFloat(amount) < 0) {
    throw new FormError({
      2: {
        radio: "Amount must be greater than 0.",
        text: "Amount must be greater than 0.",
      },
    });
  }
  if (parseFloat(amount) <= balance) {
    throw new FormError({
      2: {
        radio: "Amount must be less than or equal to your balance.",
        text: "Amount must be less than or equal to your balance.",
      },
    });
  }
  return { walletKey, amount: parseFloat(amount) };
}

export async function withdraw(
  prevState: any,
  formData: FormData
): Promise<WithdrawUseFormState> {
  try {
    const supabase = createServerSupabaseClient();
    const user = await checkUserLoggedIn({ supabase });
    const { data, error } = await supabase
      .from("user_balances")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (error) {
      throw Error(error.message);
    }

    let formData_ = validateFormData(formData, data.usdc_balance);

    const program = getTallyClob();
    const managerWallet = getManagerKeyPair();
    const userPDA = getUserPDA(new PublicKey(data.public_key), program);
    const to = getAssociatedTokenAddressSync(
      new PublicKey(process.env.USDC_MINT!),
      new PublicKey(data.public_key)
    );

    await createAssociatedTokenAccount(
      program.provider.connection,
      managerWallet,
      new PublicKey(process.env.USDC_MINT!),
      new PublicKey(data.public_key)
    ).catch((_) => {});
    // const userData = await program.account.user.fetch(userPDA);

    const withdrawTx = await program.methods
      .withdrawFromBalance(
        new BN(formData_.amount * Math.pow(10, 9)),
        new BN(user.id),
        new BN(0)
      )
      .signers([managerWallet])
      .accounts({
        mint: new PublicKey(process.env.USDC_MINT!),
        fromUsdcAccount: getAssociatedTokenAddressSync(
          new PublicKey(process.env.USDC_MINT!),
          new PublicKey(process.env.MANAGER_PUBLIC_KEY!)
        ),
        feeUsdcAccount: getAssociatedTokenAddressSync(
          new PublicKey(process.env.USDC_MINT!),
          new PublicKey(process.env.FEE_MANAGER_KEY!)
        ),
        user: userPDA,
        signer: managerWallet.publicKey,
        toUsdcAccount: to,
      })
      .instruction();

    await sendTransactions({
      connection: program.provider.connection,
      transactions: [withdrawTx],
      signer: managerWallet,
    });

    await supabase
      .from("user_balances")
      .update({ usdc_balance: data.usdc_balance - formData_.amount });

    return {
      status: "success",
      message: "Withdrawal successful.",
    };
  } catch (error: any) {
    console.log(error);
    if (error instanceof AnchorError) {
      const err = error as AnchorError;
      const useFormState: WithdrawUseFormState = {
        status: "error",
        message: err.message,
        errors: [],
      };
      return useFormState;
    }
    if (error instanceof FormError) {
      const useFormState: WithdrawUseFormState = {
        status: "error",
        message: "Form validation failed.",
        errors: error.errors,
      };
      return useFormState;
    }
    return {
      status: "error",
      message: error.message,
      errors: {},
    };
  }
}
