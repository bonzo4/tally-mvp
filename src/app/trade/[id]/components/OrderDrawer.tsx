'use client'
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import Order from "./Order"

export default function OrderDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div className="fixed lg:hidden z-50 bottom-4 w-full px-4">
        <Button className="w-full bg-tally-primary hover:bg-tally-primary text-black">
          Place Bet
        </Button>
        </div>
      </DrawerTrigger>
      <DrawerContent className="bg-zinc-900 mt-5 max-h-[96%] px-4 border-0">
        <DrawerHeader>
        { /* Header is for margin between top of content and drag bar. */ }
        </DrawerHeader>
        <Order />
      </DrawerContent>
    </Drawer>
  )
}

