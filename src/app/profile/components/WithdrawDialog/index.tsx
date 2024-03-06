import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Withdraw from "./Withdraw";

type WithdrawDialogProps = {
  userId: number;
};

export default function WithdrawDialog({ userId }: WithdrawDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-tally-primary text-black hover:bg-tally-primary/90">
          Withdraw
        </Button>
      </DialogTrigger>
      <DialogContent className="border-tally-background bg-tally-background text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Withdraw</DialogTitle>
          <DialogDescription>
            Purchase Tally Credits to use on the platform
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center">
          <Withdraw userId={userId} />
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
