"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

import Flash from "../../../public/images/flash.svg";
import Users from "../../../public/images/users.svg";

function SignUpPromotion() {
  return (
    <Link
      href="/"
      className="relative flex w-full min-w-[80%] flex-col space-y-3 overflow-hidden rounded-2xl border border-tally-primary px-6 py-4 md:space-y-5 lg:px-8 lg:py-6"
    >
      <div className="lg:w-[80%]">
        <h2 className="text-2xl font-medium text-white lg:text-4xl">
          Sign up now and get a $10 trade bonus!
        </h2>
      </div>
      <div>
        <Button className="bg-tally-primary px-5 py-2 text-[16px] font-medium text-black hover:bg-tally-secondary">
          Claim Bonus
        </Button>
      </div>
      <div className="absolute -bottom-16 -right-3 lg:-bottom-8 lg:right-0 xl:-top-5">
        <Image src={Flash} alt="Flash" />
      </div>
    </Link>
  );
}

function ReferralPromotion() {
  return (
    <Link
      href="/"
      className="relative flex w-full min-w-[80%] flex-col space-y-3 overflow-hidden rounded-2xl border border-tally-primary px-6 py-4 md:space-y-5 lg:px-8 lg:py-6"
    >
      <div className="md:w-[70%]">
        <h2 className="text-2xl font-medium text-white lg:text-4xl">
          Refer a friend and win 10,000 USDC!
        </h2>
      </div>
      <div>
        <Button className="bg-tally-primary px-5 py-2 text-[16px] font-medium text-black hover:bg-tally-secondary">
          Refer Now
        </Button>
      </div>
      <div className="absolute -bottom-10 -right-2 xl:right-10 xl:top-0">
        <Image src={Users} alt="Users" />
      </div>
    </Link>
  );
}

function PseudoMargin() {
  return <div className="w-[24px] md:hidden"></div>;
}

export default function Promotions() {
  return (
    <div className="flex space-x-5 md:px-4 lg:px-16">
      <div className="no-scrollbar flex w-full space-x-5 overflow-x-auto md:grid md:grid-cols-2 md:gap-5 md:space-x-0">
        {/* This element needed to give a left margin to the first element for horizontal scrolling that uses overflow. */}
        <PseudoMargin />
        <SignUpPromotion />
        <ReferralPromotion />
        {/* This element needed to give a right margin to the last element for horizontal scrolling that uses overflow. */}
        <PseudoMargin />
      </div>
    </div>
  );
}
