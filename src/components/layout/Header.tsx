"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

import HamburgerMenu from "@/components/HamburgerMenu";
import SearchBar from "@/components/SearchBar";

import { cn } from "@/lib/utils";
import Tickers from "../Tickers";

import Image from "next/image";
import { UserDoc } from "@/lib/supabase/user";

type HeaderProps = {
  user: UserDoc | null;
};

function HeaderLink({ href, title }: { href: string; title: string }) {
  return (
    <Link href={href} className="whitespace-nowrap hover:underline">
      {title}
    </Link>
  );
}

export default function Header({ user }: HeaderProps) {
  return (
    <div className="flex w-full flex-col">
      <header className="flex flex-row items-center justify-between space-x-5 bg-black px-4 py-3 lg:px-16">
        <div className="flex flex-grow flex-row items-center space-x-5">
          <Link href="/" className="">
            <h1
              className={cn(
                "whitespace-nowrap text-[25px] font-bold leading-[30px] -tracking-[0.07em] text-tally-primary"
              )}
            >
              TALLY MARKET
            </h1>
          </Link>
          <div className="hidden max-w-[400px] flex-grow lg:block">
            <SearchBar />
          </div>
        </div>
        <div className="hidden space-x-3 text-sm font-bold text-white lg:flex">
          <HeaderLink href="/" title="Fair Launch" />
          <HeaderLink href="/markets" title="Markets" />
          <HeaderLink href="/blogs" title="Blogs" />
          <HeaderLink href="/" title="FAQ" />
          <HeaderLink href="/leaderboard" title="Leaderboard" />
        </div>
        <div className="hidden flex-row items-center justify-center space-x-3 lg:flex">
          {user ? (
            <>
              <Link
                href="/"
                className="flex flex-row items-center justify-center space-x-3 text-white underline hover:cursor-pointer hover:no-underline"
              >
                {user.icon && (
                  <div className="overflow-hidden rounded-full border-2 border-transparent hover:border-tally-primary">
                    <Image
                      src={user.icon}
                      width={35}
                      height={35}
                      alt="Icon"
                      quality={100}
                    />
                  </div>
                )}
                <span className="">{user.name}</span>
              </Link>
              <form
                action="/auth/signout"
                method="post"
                className="flex flex-row items-center justify-center space-x-2"
              >
                <Button className="w-full bg-tally-primary text-black hover:bg-tally-secondary">
                  Sign Out
                </Button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="underline hover:cursor-pointer hover:no-underline"
              >
                <Button className="border border-tally-primary bg-black text-tally-primary hover:bg-zinc-800">
                  Log In
                </Button>
              </Link>
              <Link
                href="/signup"
                className="underline hover:cursor-pointer hover:no-underline"
              >
                <Button className="bg-tally-primary text-black hover:bg-tally-secondary">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
        <div className="flex flex-row items-center justify-center space-x-2 lg:hidden">
          {user && (
            <div className="overflow-hidden rounded-full border-2 border-tally-primary lg:hidden">
              {user.icon && (
                <Image
                  src={user.icon}
                  width={28}
                  height={28}
                  alt="User icon"
                  className="object-cover"
                />
              )}
            </div>
          )}
          <HamburgerMenu user={user} className="" />
        </div>
      </header>
      <Tickers />
    </div>
  );
}
