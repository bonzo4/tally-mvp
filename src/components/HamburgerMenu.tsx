"use client";

import Link from "next/link";
import { useWindowSize } from "usehooks-ts";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

import { IconContext } from "react-icons";
import { RxHamburgerMenu } from "react-icons/rx";

import SearchBar from "@/components/SearchBar";

function SheetLink({ href, title }: { href: string; title: string }) {
  return (
    <SheetClose asChild>
      <Link href={href} className="whitespace-nowrap hover:underline">
        {title}
      </Link>
    </SheetClose>
  );
}

export default function HamburgerMenu({ className }: { className?: string }) {
  const { width, height } = useWindowSize();
  return (
    <div className={className}>
      <IconContext.Provider value={{ className: "text-tally-primary text-xl" }}>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="border-0 bg-transparent hover:bg-zinc-800 focus:ring-0"
            >
              <RxHamburgerMenu className="p-0" />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-3/4 bg-black">
            <SheetHeader className="mb-10 text-left">
              <Link
                href="/"
                className="whitespace-nowrap text-xl font-bold text-tally-primary"
              >
                TALLY MARKET
              </Link>
            </SheetHeader>
            <SearchBar />
            <div className="mt-10 flex flex-col items-end space-y-5 text-sm font-bold text-white">
              <SheetLink href="/" title="Fair Launch" />
              <SheetLink href="/markets" title="Markets" />
              <SheetLink href="/" title="Insight" />
              <SheetLink href="/" title="FAQ" />
              <SheetLink href="/leaderboard" title="Leaderboard" />
            </div>
            <div className="mt-10 flex flex-col space-y-3">
              <SheetClose asChild>
                <Link
                  href="/login"
                  className="underline hover:cursor-pointer hover:no-underline"
                >
                  <Button className="w-full border border-tally-primary bg-black text-tally-primary hover:bg-zinc-800">
                    Log In
                  </Button>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href="/login"
                  className="underline hover:cursor-pointer hover:no-underline"
                >
                  <Button className="w-full bg-tally-primary text-black hover:bg-tally-secondary">
                    Sign up
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </IconContext.Provider>
    </div>
  );
}
