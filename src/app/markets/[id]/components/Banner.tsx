import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function BannerTitle(props) {
  switch (props.status) {
    case "fairLaunch":
      return (
        <div className="">
          <h1 className="text-3xl md:text-5xl text-green-500 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] font-bold text-center lg:text-left">TOTAL POT: $0.00</h1>
          <h1 className="text-3xl md:text-5xl text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] font-bold text-center lg:text-left">WHO WILL WIN THE 2024 PRESIDENTIAL ELECTION?</h1>
        </div>
      )
      break;
    case "trading":
      return (
        <div>
          <div className="lg:mb-5 flex flex-col lg:flex-row items-center">
            <div className="mr-5 mb-3 lg:mb-0">
              <h1 className="text-3xl md:text-5xl text-green-500 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] font-bold text-center lg:text-left">WINNER: YES</h1>
            </div>
            <div className="mb-5 lg:mb-0">
              <Link href="/"><Button>Start Trading</Button></Link>
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl text-green-500 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] font-bold text-center lg:text-left">TOTAL POT: $100,000</h1>
          <h1 className="text-3xl md:text-5xl text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] font-bold text-center lg:text-left">WHO WILL WIN THE 2024 PRESIDENTIAL ELECTION?</h1>
        </div>
      )
      break;
    case "frozen":
      return (
        <div>
          <div className="lg:mb-5 flex flex-col lg:flex-row items-center">
            <div className="mr-5 mb-3 lg:mb-0">
              <h1 className="text-3xl md:text-5xl text-blue-400 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] font-bold text-center lg:text-left">LEADING: NO</h1>
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl text-blue-400 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] font-bold text-center lg:text-left">TOTAL POT: $182,000</h1>
          <h1 className="text-3xl md:text-5xl text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] font-bold text-center lg:text-left">WHO WILL WIN THE 2024 PRESIDENTIAL ELECTION?</h1>
        </div>
      )
      break;
    case "resolution":
      return (
        <div>
          <div className="lg:mb-5 flex flex-col lg:flex-row items-center">
            <div className="mr-5 mb-3 lg:mb-0">
              <h1 className="text-3xl md:text-5xl text-green-500 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] font-bold text-center lg:text-left">WINNER: YES</h1>
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl text-green-500 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] font-bold text-center lg:text-left">TOTAL POT: $182,000</h1>
          <h1 className="text-3xl md:text-5xl text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] font-bold text-center lg:text-left">WHO WILL WIN THE 2024 PRESIDENTIAL ELECTION?</h1>
        </div>
      )
      break;
  }
}

function BannerYesContainer(props) {
  let submitButton 
  switch (props.status) {
    case "fairLaunch":
      submitButton = (
        <Link href="/">
          <Button>Buy</Button>
        </Link>
      )
      break;
    case "trading":
      submitButton = (
        <Link href="/">
          <Button>Start Trading</Button>
        </Link>
      )
      break;
    case "frozen":
      submitButton = (
        <Link href="/">
          <Button>Total Pot</Button>
        </Link>
      )
      break;
    case "resolution":
      submitButton = (
        <Link href="/">
          <Button>Total Pot</Button>
        </Link>
      )
      break;
  }

  return (
    <div className="bg-green-500 flex flex-col space-y-2 border border-black rounded p-3">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold">Yes</h1>
        </div>
        <div className="">
          <Input className="w-40 ml-5"/>
        </div>
      </div>
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold">$.50</h1>
        </div>
        <div className="flex justify-end self-end">
          {submitButton}
        </div>
      </div>
    </div>
  )
}

function BannerNoContainer(props) {
  let submitButton 
  switch (props.status) {
    case "fairLaunch":
      submitButton = (
        <Link href="/">
          <Button>Buy</Button>
        </Link>
      )
      break;
    case "trading":
      submitButton = (
        <Link href="/">
          <Button>Start Trading</Button>
        </Link>
      )
      break;
    case "frozen":
      submitButton = (
        <Link href="/">
          <Button>Total Pot</Button>
        </Link>
      )
      break;
    case "resolution":
      submitButton = (
        <Link href="/">
          <Button>Total Pot</Button>
        </Link>
      )
      break;
  }

  return (
    <div className="bg-red-500 flex flex-col space-y-2 border border-black rounded p-3">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold">No</h1>
        </div>
        <div className="">
          <Input className="w-40 ml-5"/>
        </div>
      </div>
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold">$.50</h1>
        </div>
        <div className="flex justify-end self-end">
          { submitButton }
        </div>
      </div>
    </div>
  )
}

export default function Banner(props) {
  return (
    <div className="relative w-full min-h-[60vh] flex justify-center items-center p-3 lg:pt-[10vh] pb-[12vh]">
      <Image 
        src={props.image}
        fill={true}
        alt="test image"
        className="object-cover"
      />
      <div className="lg:w-[70vw] flex flex-col lg:flex-row space-y-5 lg:space-y-0 lg:space-x-3 justify-center items-center z-10">
        <BannerTitle {...props} />
        <div className="h-full flex flex-col space-y-5">
          <BannerYesContainer {...props} />
          <BannerNoContainer  {...props} />
        </div>
      </div>
    </div>
  )
}
