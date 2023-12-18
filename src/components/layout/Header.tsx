"use client";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import HamburgerMenu from "@/components/HamburgerMenu";
import { Database } from "@/lib/types";
import { useUser } from "@/hooks/useUser";
import { User } from "@supabase/supabase-js";
import { createBrowserClient } from "@supabase/ssr";

type HeaderProps = {
  authUser: User | null;
};

export default function Header({ authUser }: HeaderProps) {
  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const user = useUser({ supabase, user: authUser });

  return (
    <header className="flex flex-row bg-red-300 items-center justify-between px-3 py-2">
      <div className="flex flex-row space-x-3 items-center">
        <Link href="/">LOGO</Link>
        <Input placeholder="Search markets" />
      </div>
      <div className="space-x-3 hidden md:flex">
        <Link
          href="/"
          className="hover:cursor-pointer underline hover:no-underline"
        >
          Fair Launch
        </Link>
        <Link
          href="/markets"
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
          href="/leaderboard"
          className="hover:cursor-pointer underline hover:no-underline"
        >
          Leaderboard
        </Link>
      </div>
      <div className="flex flex-row items-center justify-center space-x-3">
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
          <Link
            href="/login"
            className="hover:cursor-pointer underline hover:no-underline"
          >
            Login
          </Link>
        )}

        <HamburgerMenu />
      </div>
    </header>
  );
}
