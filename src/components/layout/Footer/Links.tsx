import Link from "next/link";
import { FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

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

export default function Links() {
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
