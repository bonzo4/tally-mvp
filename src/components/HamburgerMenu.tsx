"use client"

import Link from "next/link";
import { useWindowSize } from 'usehooks-ts'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { IconContext } from "react-icons";
import { BsGraphUpArrow } from "react-icons/bs";
import { CgInsights } from "react-icons/cg";
import { FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { GoTrophy } from "react-icons/go";
import { IoMdBook } from "react-icons/io";
import { MdOutlineRocketLaunch } from "react-icons/md";
import { MdQuestionMark } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";

import SearchBar from "@/components/SearchBar";

function SheetLink({href, title}: {href: string, title: string}) {
  return (
    <SheetClose asChild>
      <Link href={href} className="hover:underline whitespace-nowrap">
        {title}
      </Link>
    </SheetClose>
  )
}

export default function HamburgerMenu({className}: {className?: string}) {
  const { width, height } = useWindowSize()
  return (
    <div className={className}>
      <IconContext.Provider value={{ className: "text-tally-primary text-xl" }}>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" className="bg-transparent border-0 hover:bg-zinc-800 focus:ring-0">
            <RxHamburgerMenu className="p-0" />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-3/4 bg-black">
          <SheetHeader className="text-left mb-10">
            <Link href="/" className="text-xl text-tally-primary font-bold whitespace-nowrap">TALLY MARKET</Link>
          </SheetHeader>
          <SearchBar />
          <div className="space-y-5 flex flex-col items-end text-sm text-white font-bold mt-10">
            <SheetLink href="/" title="Fair Launch" />
            <SheetLink href="/markets" title="Markets" />
            <SheetLink href="/" title="Insight" />
            <SheetLink href="/" title="FAQ" />
            <SheetLink href="/leaderboard" title="Leaderboard" />
          </div>
          <div className="flex flex-col space-y-3 mt-10">
            <SheetClose asChild>
              <Link href="/login" className="hover:cursor-pointer underline hover:no-underline" >
                <Button className="w-full bg-black text-tally-primary border border-tally-primary hover:bg-zinc-800">Log In</Button>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href="/login" className="hover:cursor-pointer underline hover:no-underline" >
                <Button className="w-full bg-tally-primary text-black hover:bg-tally-secondary">Sign up</Button>
              </Link>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
      </IconContext.Provider>
    </div>
  )
}
