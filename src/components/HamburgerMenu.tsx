"use client"

import Link from "next/link";
import { useWindowSize } from 'usehooks-ts'

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { BsGraphUpArrow } from "react-icons/bs";
import { CgInsights } from "react-icons/cg";
import { FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { GoTrophy } from "react-icons/go";
import { IoMdBook } from "react-icons/io";
import { MdOutlineRocketLaunch } from "react-icons/md";
import { MdQuestionMark } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";

// Source: https://tailwindcss.com/docs/responsive-design
const tailwindWidthBreakpoints = {
  "sm": 640,
  "md": 768,
  "lg": 1024,
  "xl": 1280,
  "2xl": 1536,
}

export default function HamburgerMenu() {
  const { width, height } = useWindowSize()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <RxHamburgerMenu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        { width < tailwindWidthBreakpoints["md"] ? (
          <>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <MdOutlineRocketLaunch className="mr-2 h-4 w-4" />
                <Link href="/">
                <span>Fair Launch</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BsGraphUpArrow className="mr-2 h-4 w-4" />
                <span>Markets</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CgInsights className="mr-2 h-4 w-4" />
                <span>Insights</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MdQuestionMark className="mr-2 h-4 w-4" />
                <span>FAQ</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <GoTrophy className="mr-2 h-4 w-4" />
                <span>Leaderboard</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
          </>
        ) : null }
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <IoMdBook className="mr-2 h-4 w-4"/>
            <span>Documentation</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FaDiscord className="mr-2 h-4 w-4"/>
            <span>Discord</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FaXTwitter className="mr-2 h-4 w-4"/>
            <span>Twitter</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
