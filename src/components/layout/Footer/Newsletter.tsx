"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { subscribe } from "@/lib/api/actions/subscribe";
import { SubscribeState } from "@/lib/api/actions/subscribeForm";
import { useRef } from "react";
import { useFormState } from "react-dom";

export default function Newsletter() {
  const [state, formAction] = useFormState<SubscribeState, FormData>(
    subscribe,
    null
  );

  const ref = useRef<HTMLFormElement>(null);

  return (
    <div className="flex-shrink-1 flex max-w-[500px] flex-col items-center justify-between space-y-4 md:items-start md:space-y-2">
      <div>
        <h2 className="text-3xl font-bold text-tally-primary">TALLY MARKET</h2>
      </div>
      <div className="text-center text-white md:text-left">
        Join our newsletter to stay up to date on features and releases.
      </div>
      <form
        ref={ref}
        action={(payload: FormData) => {
          formAction(payload);
          ref.current?.reset();
        }}
        className="flex w-full flex-col  items-center space-y-4 md:flex-row md:space-x-2 md:space-y-0"
      >
        <Input
          id="email"
          name="email"
          required
          placeholder="Enter your email"
          className="border-0 bg-zinc-900 text-white caret-white focus-visible:ring-0 focus-visible:ring-offset-0 "
        />
        <Button
          type="submit"
          variant="outline"
          className="w-full border border-tally-primary bg-transparent text-tally-primary hover:bg-tally-primary/10 hover:text-tally-primary md:w-min"
        >
          Subscribe
        </Button>
      </form>
      {state?.status === "success" && (
        <div className="text-tally-primary">{state.message}</div>
      )}
      {state?.status === "error" && (
        <div className="text-tally-red">{state.message}</div>
      )}
      <div className="text-center text-xs text-gray-400 md:text-left">
        By subscribing you agree to with our Privacy Policy and provide consent
        to receive updates from our company.
      </div>
    </div>
  );
}
