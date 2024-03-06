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
import Deposit from "./Deposit";

type DepositDialogProps = {
  userId: number;
};

export default function DepositDialog({ userId }: DepositDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-tally-primary text-black hover:bg-tally-primary/90">
          Deposit
        </Button>
      </DialogTrigger>
      <DialogContent className="border-tally-background bg-tally-background text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Deposit</DialogTitle>
          <DialogDescription>
            Purchase Tally Credits to use on the platform
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center">
          <Deposit userId={userId} />
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
