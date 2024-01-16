import Image from "next/image";
import { getFairLaunch } from "@/lib/api/fetch";

function TransparentToBlackGradientOverlay() {
  return (
    <div className="absolute bottom-0 left-0 h-full w-full bg-gradient-to-t from-[#0C0D0C] to-transparent"></div>
  );
}

function Banner({ src }: { src: string }) {
  return (
    <div className="relative h-[738px] w-full">
      <Image
        src={src}
        alt=""
        fill={true}
        className="rounded-2xl object-cover"
      />
      <TransparentToBlackGradientOverlay />
    </div>
  );
}

export default async function FairLaunchPage({
  params,
}: {
  params: { slug: string };
}) {
  const market = await getFairLaunch(params.slug);
  if (!market) return;
  console.log("market", market);
  return (
    <div className="w-full">
      <Banner src={market.banner} />
      <div className="text-white">{market.title}</div>
    </div>
  );
}
