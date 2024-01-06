import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ActionItem(props: { status: string }) {
  let actionItem;
  switch (props.status) {
    case "fairLaunch":
      actionItem = (
        <Link href="/">
          <Button>Predict Now</Button>
        </Link>
      );
      break;
    case "trading":
      actionItem = (
        <Link href="/">
          <Button>Start Trading</Button>
        </Link>
      );
      break;
    case "frozen":
      actionItem = <></>;
      break;
    case "resolution":
      actionItem = (
        <Link href="/">
          <Button>Claim Winnings</Button>
        </Link>
      );
      break;
  }

  return (
    <div className="flex w-full items-center justify-center pb-5">
      {actionItem}
    </div>
  );
}
