import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import { FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="flex flex-row px-16 py-10 space-x-5 bg-green-100">
      <div className="bg-blue-100 flex flex-col justify-between w-full">
        <div>
          <h2 className="text-2xl font-bold">Tally Newsletter</h2>
        </div>
        <div>
        <p>Email Address</p>
        </div>
        <div className="flex w-full items-center space-x-2">
          <Input />
          <Button>Subscribe</Button>
        </div>
      </div>
      <div className="bg-yellow-100 flex flex-col justify-between w-full">
        <div className="flex justify-end py-2 px-3 bg-indigo-100">
          <Link href="/" className="text-xl">LOGO</Link>
        </div>
        <div className="flex justify-end space-x-5 px-3 py-2 bg-orange-100">
          <Link
            href="/"
            className="hover:cursor-pointer underline hover:no-underline"
          >
            Fair Launch
          </Link>
          <Link
            href="/"
            className="hover:cursor-pointer underline hover:no-underline"
          >
            Markets
          </Link>
          <Link
            href="/"
            className="hover:cursor-pointer underline hover:no-underline"
          >
            Insight
          </Link>
          <Link
            href="/"
            className="hover:cursor-pointer underline hover:no-underline"
          >
            FAQ
          </Link>
          <Link
            href="/"
            className="hover:cursor-pointer underline hover:no-underline"
          >
            Leaderboard
          </Link>
        </div>
        <div className="flex justify-end bg-yellow-200">
          <Button variant="link" className="hover:cursor-pointer underline hover:no-underline" asChild>
            <div className="flex space-x-2">
              <FaDiscord/>
              <p className="text-[16px]">Discord</p>
            </div>
          </Button>
          <Button variant="link" className="hover:cursor-pointer underline hover:no-underline" asChild>
            <div className="flex space-x-2">
              <FaXTwitter/>
              <p className="text-[16px]">Twitter</p>
            </div>
          </Button>
        </div>
      </div>
    </footer>
  );
}
