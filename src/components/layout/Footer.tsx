import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function WhiteToBlackGradientOverlay() {
  return (
    <div className="absolute bottom-0 left-0 h-full w-full bg-gradient-to-t from-black to-white"></div>
  );
}

function Newsletter() {
  return (
    <div className="flex-shrink-1 flex max-w-[500px] flex-col items-center justify-between space-y-4 md:items-start md:space-y-2">
      <div>
        <h2 className="text-3xl font-bold text-tally-primary">TALLY MARKET</h2>
      </div>
      <div className="text-center text-white md:text-left">
        Join our newsletter to stay up to date on features and releases.
      </div>
      <div className="flex w-full flex-col  items-center space-y-4 md:flex-row md:space-x-2 md:space-y-0">
        <Input
          placeholder="Enter your email"
          className="border-0 bg-zinc-900 text-white caret-white focus-visible:ring-0 focus-visible:ring-offset-0 "
        />
        <Button
          variant="outline"
          className="w-full border border-tally-primary bg-transparent text-tally-primary hover:bg-tally-primary/10 hover:text-tally-primary md:w-min"
        >
          Subscribe
        </Button>
      </div>
      <div className="text-center text-xs text-gray-400 md:text-left">
        By subscribing you agree to with our Privacy Policy and provide consent
        to receive updates from our company.
      </div>
    </div>
  );
}

function Subtitle({ title }: { title: string }) {
  return <div className="mb-3 text-lg font-medium text-white">{title}</div>;
}

function TextLink({ href, name }: { href: string; name: string }) {
  return (
    <Link
      href={href}
      className="text-white hover:cursor-pointer hover:underline"
    >
      {name}
    </Link>
  );
}

function LogoLink({
  name,
  children,
}: React.PropsWithChildren<{ name: string }>) {
  const iconMap: Record<string, React.ReactNode> = {
    Discord: <FaDiscord className="text-tally-primary" />,
    Twitter: <FaXTwitter className="text-tally-primary" />,
  };
  const IconComponent = iconMap[name];

  const hrefMap: Record<string, string> = {
    Discord: "https://discord.com/invite/syndicatenetwork",
    Twitter: "https://twitter.com/SyndicateNTWRK",
  };
  const href = hrefMap[name];

  return (
    <Link href={href}>
      <div className="flex items-center space-x-2">
        {IconComponent}
        <p className="text-white hover:underline">{name}</p>
      </div>
    </Link>
  );
}

function Links() {
  return (
    <div className="flex w-full md:justify-end">
      <div className="mr-12 flex flex-grow flex-col space-y-2 md:flex-grow-0 lg:mr-24">
        <Subtitle title="Explore" />
        <TextLink href="/" name="Fair Launch" />
        <TextLink href="/markets" name="Markets" />
        <TextLink href="/blogs" name="Blogs" />
        <TextLink href="/" name="FAQ" />
        <TextLink href="/leaderboard" name="Leaderboard" />
      </div>
      <div className="flex flex-grow flex-col space-y-2 md:flex-grow-0 lg:mr-24">
        <Subtitle title="Follow us" />
        <LogoLink name="Discord" />
        <LogoLink name="Twitter" />
      </div>
    </div>
  );
}

function Legal() {
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

export default function Footer() {
  return (
    <footer className="flex w-full flex-col bg-gradient-to-t from-black to-neutral-900 px-4 pb-8 pt-10 md:px-16">
      <div className="flex flex-col space-y-12 pb-12 md:flex-row md:space-x-5 md:space-y-0 md:space-y-0 ">
        <Newsletter />
        <Links />
      </div>
      <Legal />
    </footer>
  );
}
