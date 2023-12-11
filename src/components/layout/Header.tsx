import Link from 'next/link'
import { Input } from "@/components/ui/input"
import HamburgerMenu from "@/components/HamburgerMenu"

export default function Header() {
  return (
    <header className="flex flex-row bg-red-300 items-center justify-between px-3 py-2">
      <div className="flex flex-row space-x-3 items-center">
        <Link href="/">
          LOGO
        </Link>
        <Input placeholder="Search markets" />
      </div>
      <div className="space-x-3">
        <Link href="/" className="hover:cursor-pointer underline hover:no-underline">Fair Launch</Link>
        <Link href="/" className="hover:cursor-pointer underline hover:no-underline">Markets</Link>
        <Link href="/" className="hover:cursor-pointer underline hover:no-underline">Insight</Link>
        <Link href="/" className="hover:cursor-pointer underline hover:no-underline">FAQ</Link>
        <Link href="/" className="hover:cursor-pointer underline hover:no-underline">Leaderboard</Link>
      </div>
      <div className="flex flex-row items-center justify-center space-x-3">
        <Link href="/" className="hover:cursor-pointer underline hover:no-underline">Sign Up</Link>
        <HamburgerMenu />
      </div>
    </header>
  );
}
