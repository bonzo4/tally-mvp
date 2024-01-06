import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function BannerTitle(props: { status: string }) {
  switch (props.status) {
    case "fairLaunch":
      return (
        <div className="">
          <h1 className="text-center text-3xl font-bold text-green-500 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] md:text-5xl lg:text-left">
            TOTAL POT: $0.00
          </h1>
          <h1 className="text-center text-3xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] md:text-5xl lg:text-left">
            WHO WILL WIN THE 2024 PRESIDENTIAL ELECTION?
          </h1>
        </div>
      );
      break;
    case "trading":
      return (
        <div>
          <div className="flex flex-col items-center lg:mb-5 lg:flex-row">
            <div className="mb-3 mr-5 lg:mb-0">
              <h1 className="text-center text-3xl font-bold text-green-500 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] md:text-5xl lg:text-left">
                WINNER: YES
              </h1>
            </div>
            <div className="mb-5 lg:mb-0">
              <Link href="/">
                <Button>Start Trading</Button>
              </Link>
            </div>
          </div>
          <h1 className="text-center text-3xl font-bold text-green-500 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] md:text-5xl lg:text-left">
            TOTAL POT: $100,000
          </h1>
          <h1 className="text-center text-3xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] md:text-5xl lg:text-left">
            WHO WILL WIN THE 2024 PRESIDENTIAL ELECTION?
          </h1>
        </div>
      );
      break;
    case "frozen":
      return (
        <div>
          <div className="flex flex-col items-center lg:mb-5 lg:flex-row">
            <div className="mb-3 mr-5 lg:mb-0">
              <h1 className="text-center text-3xl font-bold text-blue-400 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] md:text-5xl lg:text-left">
                LEADING: NO
              </h1>
            </div>
          </div>
          <h1 className="text-center text-3xl font-bold text-blue-400 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] md:text-5xl lg:text-left">
            TOTAL POT: $182,000
          </h1>
          <h1 className="text-center text-3xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] md:text-5xl lg:text-left">
            WHO WILL WIN THE 2024 PRESIDENTIAL ELECTION?
          </h1>
        </div>
      );
      break;
    case "resolution":
      return (
        <div>
          <div className="flex flex-col items-center lg:mb-5 lg:flex-row">
            <div className="mb-3 mr-5 lg:mb-0">
              <h1 className="text-center text-3xl font-bold text-green-500 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] md:text-5xl lg:text-left">
                WINNER: YES
              </h1>
            </div>
          </div>
          <h1 className="text-center text-3xl font-bold text-green-500 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] md:text-5xl lg:text-left">
            TOTAL POT: $182,000
          </h1>
          <h1 className="text-center text-3xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] md:text-5xl lg:text-left">
            WHO WILL WIN THE 2024 PRESIDENTIAL ELECTION?
          </h1>
        </div>
      );
      break;
  }
}

function BannerYesContainer(props: { status: string }) {
  let submitButton;
  switch (props.status) {
    case "fairLaunch":
      submitButton = (
        <Link href="/">
          <Button>Buy</Button>
        </Link>
      );
      break;
    case "trading":
      submitButton = (
        <Link href="/">
          <Button>Start Trading</Button>
        </Link>
      );
      break;
    case "frozen":
      submitButton = (
        <Link href="/">
          <Button>Total Pot</Button>
        </Link>
      );
      break;
    case "resolution":
      submitButton = (
        <Link href="/">
          <Button>Total Pot</Button>
        </Link>
      );
      break;
  }

  return (
    <div className="flex flex-col space-y-2 rounded border border-black bg-green-500 p-3">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-bold md:text-5xl">Yes</h1>
        </div>
        <div className="">
          <Input className="ml-5 w-40" />
        </div>
      </div>
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold md:text-5xl">$.50</h1>
        </div>
        <div className="flex justify-end self-end">{submitButton}</div>
      </div>
    </div>
  );
}

function BannerNoContainer(props: { status: string }) {
  let submitButton;
  switch (props.status) {
    case "fairLaunch":
      submitButton = (
        <Link href="/">
          <Button>Buy</Button>
        </Link>
      );
      break;
    case "trading":
      submitButton = (
        <Link href="/">
          <Button>Start Trading</Button>
        </Link>
      );
      break;
    case "frozen":
      submitButton = (
        <Link href="/">
          <Button>Total Pot</Button>
        </Link>
      );
      break;
    case "resolution":
      submitButton = (
        <Link href="/">
          <Button>Total Pot</Button>
        </Link>
      );
      break;
  }

  return (
    <div className="flex flex-col space-y-2 rounded border border-black bg-red-500 p-3">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-bold md:text-5xl">No</h1>
        </div>
        <div className="">
          <Input className="ml-5 w-40" />
        </div>
      </div>
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold md:text-5xl">$.50</h1>
        </div>
        <div className="flex justify-end self-end">{submitButton}</div>
      </div>
    </div>
  );
}

export default function Banner(props: { image: string; status: string }) {
  return (
    <div className="relative flex min-h-[60vh] w-full items-center justify-center p-3 pb-[12vh] lg:pt-[10vh]">
      <Image
        src={props.image}
        fill={true}
        alt="test image"
        className="object-cover"
      />
      <div className="z-10 flex flex-col items-center justify-center space-y-5 lg:w-[70vw] lg:flex-row lg:space-x-3 lg:space-y-0">
        <BannerTitle {...props} />
        <div className="flex h-full flex-col space-y-5">
          <BannerYesContainer {...props} />
          <BannerNoContainer {...props} />
        </div>
      </div>
    </div>
  );
}
