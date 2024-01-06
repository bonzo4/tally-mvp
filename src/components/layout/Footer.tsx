import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function WhiteToBlackGradientOverlay() {
  return (
    <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black to-white"></div>
  )
}

function Newsletter() {
  return (
    <div className="flex flex-col space-y-4 md:space-y-2 items-center md:items-start justify-between max-w-[500px] flex-shrink-1">
      <div>
        <h2 className="text-3xl text-tally-primary font-bold">TALLY MARKET</h2>
      </div>
      <div className="text-white text-center md:text-left">
        Join our newsletter to stay up to date on features and releases.  
      </div>
      <div className="flex flex-col md:flex-row  w-full items-center space-y-4 md:space-y-0 md:space-x-2">
        <Input placeholder="Enter your email" className="bg-zinc-900 border-0 text-white caret-white focus-visible:ring-0 focus-visible:ring-offset-0 " />
        <Button variant="outline" className="text-tally-primary w-full md:w-min border border-tally-primary bg-transparent hover:bg-tally-primary/10 hover:text-tally-primary">Subscribe</Button>
      </div>
      <div className="text-xs text-gray-400 text-center md:text-left">
        By subscribing you agree to with our Privacy Policy and provide consent to receive updates from our company.
      </div>
    </div>
  )
}

function Subtitle({title}: {title: string}) {
  return (
    <div className="text-white text-lg font-medium mb-3">
      {title}
    </div>
  )
}

function TextLink({ href, name }: { href: string, name: string }) {
  return (
    <Link href={href} className="text-white hover:cursor-pointer hover:underline" >
      {name}
    </Link>
  )
}

function LogoLink({ name, children }: React.PropsWithChildren<{name: string}>) {
  const iconMap: Record<string, React.ReactNode> = {
    "Discord": <FaDiscord className="text-tally-primary"/>,
    "Twitter": <FaXTwitter className="text-tally-primary"/>,
  }
  const IconComponent = iconMap[name]

  const hrefMap: Record<string, string> = {
    "Discord": "https://discord.com/invite/syndicatenetwork",
    "Twitter": "https://twitter.com/SyndicateNTWRK",
  }
  const href= hrefMap[name]
  
  return (
    <Link href={href}>
      <div className="flex items-center space-x-2">
        {IconComponent}
        <p className="text-white hover:underline">{name}</p>
      </div>
    </Link>
  )
}

function Links() {
  return (
    <div className="flex md:justify-end w-full">
      <div className="flex flex-col space-y-2 flex-grow mr-12 md:flex-grow-0 lg:mr-24">
        <Subtitle title="Explore" />
        <TextLink href="/" name="Fair Launch" />
        <TextLink href="/" name="Markets" />
        <TextLink href="/" name="Insights" />
        <TextLink href="/" name="FAQ" />
        <TextLink href="/" name="Leaderboard" />
      </div>
      <div className="flex flex-col space-y-2 flex-grow md:flex-grow-0 lg:mr-24">
        <Subtitle title="Follow us" />
        <LogoLink name="Discord" />
        <LogoLink name="Twitter" />
      </div>
    </div>
  )
}

function Legal() {
  const year = new Date().getFullYear()

  return (
    <div className="w-full flex flex-col">
      <Separator className="bg-zinc-800 mb-8"/>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 justify-center md:justify-between">
        <div className="text-gray-400 text-xs text-center">{`© ${year} Tally Market. All rights reserved.`}</div>
        <div className="flex justify-between md:justify-start md:space-x-8">
          <Link href="/" className="text-gray-400 text-xs hover:underline">Privacy Policy</Link>
          <Link href="/" className="text-gray-400 text-xs hover:underline">Terms of Service</Link>
          <Link href="/" className="text-gray-400 text-xs hover:underline">Cookies Settings</Link>
        </div>
      </div>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="flex flex-col px-4 md:px-16 pt-10 pb-8 w-full bg-gradient-to-t from-black to-neutral-900">
      <div className="flex flex-col md:flex-row space-y-12 pb-12 md:space-y-0 md:space-y-0 md:space-x-5 ">
      <Newsletter />
      <Links />
      </div>
      <Legal />
    </footer>
  );
}
