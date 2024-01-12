"use client";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";

export default function Legal() {
  const year = new Date().getFullYear();

  return (
    <div className="flex w-full flex-col">
      <Separator className="mb-8 bg-zinc-800" />
      <div className="flex flex-col justify-center space-y-4 md:flex-row md:justify-between md:space-y-0">
        <div className="text-center text-xs text-gray-400">{`© ${year} Tally Market. All rights reserved.`}</div>
        <div className="flex justify-between md:justify-start md:space-x-8">
          <Link href="/" className="text-xs text-gray-400 hover:underline">
            Privacy Policy
          </Link>
          <Link href="/" className="text-xs text-gray-400 hover:underline">
            Terms of Service
          </Link>
          <Link href="/" className="text-xs text-gray-400 hover:underline">
            Cookies Settings
          </Link>
        </div>
      </div>
    </div>
  );
}
