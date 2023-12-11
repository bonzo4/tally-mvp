"use client"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { useWindowSize } from 'usehooks-ts'

import { FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";

// Source: https://tailwindcss.com/docs/responsive-design
const tailwindWidthBreakpoints = {
  "sm": 640,
  "md": 768,
  "lg": 1024,
  "xl": 1280,
  "2xl": 1536,
}

function HamburgerMenuLinks() {
  const { width, height } = useWindowSize()
  return (
    <ul className="py-3 px-2 space-y-3">
      {
        width < tailwindWidthBreakpoints["md"] ? (
          <>
            <li>
            <NavigationMenuLink>
              Fair Launch
            </NavigationMenuLink>
            </li>
            <li>
            <NavigationMenuLink>
              Markets
            </NavigationMenuLink>
            </li>
            <li>
            <NavigationMenuLink>
              Insights
            </NavigationMenuLink>
            </li>
            <li>
            <NavigationMenuLink>
              FAQ
            </NavigationMenuLink>
            </li>
            <li>
            <NavigationMenuLink>
              Leaderboard
            </NavigationMenuLink>
            </li>
          </>
        ) : null
      }
      <li>
      <NavigationMenuLink>
        Documentation
      </NavigationMenuLink>
      </li>
      <li>
      <NavigationMenuLink>
        <FaDiscord />
      </NavigationMenuLink>
      </li>
      <li>
      <NavigationMenuLink>
        <FaXTwitter />
      </NavigationMenuLink>
      </li>
    </ul>
  )
}

export default function HamburgerMenu() {

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <RxHamburgerMenu/>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <HamburgerMenuLinks />
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
