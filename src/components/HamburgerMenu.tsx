"use client"

import { RxHamburgerMenu } from "react-icons/rx";
import { FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
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

export default function HamburgerMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <RxHamburgerMenu/>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="py-3 px-2 space-y-3">
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
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
