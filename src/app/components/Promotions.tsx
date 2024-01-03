"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

import { IconContext } from "react-icons";
import { PiLightningLight } from "react-icons/pi";
import { FaUserFriends } from "react-icons/fa";

function SignUpPromotion() {
  return (
    <IconContext.Provider value={{ className: "text-[8em] lg:text-[10em] xl:text-[14em]" }}>
        <Link href="/" className="relative overflow-hidden min-w-[80%] w-full flex flex-col space-y-3 md:space-y-5 border border-tally-primary rounded-2xl px-6 lg:px-8 py-4 lg:py-6">
          <div className="lg:w-[80%]">
            <h2 className="text-2xl lg:text-4xl font-medium text-white">
              Sign up now and get a $10 trade bonus!
            </h2>
          </div>
          <div>
            <Button className="bg-tally-primary hover:bg-tally-secondary text-black">
              Claim Bonus
            </Button>
          </div>
          <div className="absolute -bottom-16 lg:-bottom-8 xl:top-0 -right-3 lg:right-0">
              <PiLightningLight className="text-tally-primary" />
          </div>
        </Link>
    </IconContext.Provider>
  )
}

function ReferralPromotion() {
  return (
    <IconContext.Provider value={{ className: "text-[8em] lg:text-[10em] xl:text-[14em]" }}>
        <Link href="/" className="relative overflow-hidden min-w-[80%] w-full flex flex-col space-y-3 md:space-y-5 border border-tally-primary rounded-2xl px-6 lg:px-8 py-4 lg:py-6">
          <div className="md:w-[70%]">
            <h2 className="text-2xl lg:text-4xl font-medium text-white">
              Refer a friend and win 10,000 USDC!
            </h2>
          </div>
          <div>
            <Button className="bg-tally-primary hover:bg-tally-secondary text-black">
              Refer Now
            </Button>
          </div>
          <div className="absolute -bottom-10 xl:top-0 -right-2 xl:right-10">
              <FaUserFriends className="text-tally-primary" />
          </div>
        </Link>
    </IconContext.Provider>
  )
}

function PseudoMargin() {
  return (
    <div className="w-[24px] md:hidden">
    </div>
  )
}

export default function Promotions() {
  return (
    <div className="flex space-x-5 md:px-4 lg:px-16">
      <div className="overflow-x-auto flex space-x-5 md:space-x-0 md:grid md:grid-cols-2 md:gap-5 no-scrollbar">
        { /* This element needed to give a left margin to the first element for horizontal scrolling that uses overflow. */ }
        <PseudoMargin />
        <SignUpPromotion />
        <ReferralPromotion />
        { /* This element needed to give a right margin to the last element for horizontal scrolling that uses overflow. */ }
        <PseudoMargin />
      </div>
    </div>
  )
}
