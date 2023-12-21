"use client";

import { Database } from "@/lib/types";
import Link from "next/link";
import { User } from "@supabase/supabase-js";
import { createBrowserClient } from "@supabase/ssr";
import { useUser } from "@/hooks/useUser";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import HamburgerMenu from "@/components/HamburgerMenu";
import SearchBar from "@/components/SearchBar";

type HeaderProps = {
  authUser: User | null;
};

function HeaderLink({href, title}: {href: string, title: string}) {
  return (
    <Link href={href} className="hover:underline whitespace-nowrap" >
      {title}
    </Link>
  )
}

export default function Header({ authUser }: HeaderProps) {
  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const user = useUser({ supabase, user: authUser });

  return (
    <header className="flex flex-row bg-black items-center justify-between px-4 lg:px-16 py-3 space-x-5">
      <div className="flex flex-row flex-grow space-x-5 items-center">
        <Link href="/" className="text-xl text-primary font-bold whitespace-nowrap">TALLY MARKET</Link>
        <div className="hidden lg:block flex-grow max-w-[400px]">
          <SearchBar />
        </div>
      </div>
      <div className="space-x-3 hidden lg:flex text-sm text-white font-bold">
        <HeaderLink href="/" title="Fair Launch" />
        <HeaderLink href="/markets" title="Markets" />
        <HeaderLink href="/" title="Insight" />
        <HeaderLink href="/" title="FAQ" />
        <HeaderLink href="/leaderboard" title="Leaderboard" />
      </div>
      <div className="hidden lg:flex flex-row items-center justify-center space-x-3">
        {user ? (
          <>
            <Link
              href="/"
              className="hover:cursor-pointer underline hover:no-underline"
            >
              {user.name}
            </Link>
            <form
              action="/auth/signout"
              method="post"
              className="flex flex-row items-center justify-center space-x-2"
            >
              <button
                className="underline hover:no-underline hover:cursor-pointer"
                type="submit"
              >
                Sign out
              </button>
            </form>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="hover:cursor-pointer underline hover:no-underline"
            >
              <Button className="bg-black text-primary border border-primary hover:bg-zinc-800">Log In</Button>
            </Link>
            <Link
              href="/login"
              className="hover:cursor-pointer underline hover:no-underline"
            >
              <Button className="bg-primary text-black hover:bg-secondary">Sign up</Button>
            </Link>
          </>
        )}
      </div>
      <HamburgerMenu className="lg:hidden" />
    </header>
  );
}
