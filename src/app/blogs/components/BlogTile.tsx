import Image from "next/image";

function BlogImage() {
  return (
    <div className="relative h-[300px] w-full">
      <Image
        src={
          "https://bxjsuelhllhggaosiovg.supabase.co/storage/v1/object/public/prediction-markets/bitcoin-etf.jpeg"
        }
        fill={true}
        alt=""
        className="rounded-2xl object-cover"
      />
    </div>
  );
}

function BlogOverview() {
  return (
    <div className="space-y-2">
      <div className="text-sm font-medium text-tally-primary">Category</div>
      <div>
        <h1 className="text-2xl font-bold text-white">
          Blog title heading will go here
        </h1>
      </div>
      <div>
        <p className="line-clamp-2 text-neutral-400">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          varius enim in eros. Something very long so that it takes up more
          space.
        </p>
      </div>
    </div>
  );
}

function BlogMetaData() {
  return (
    <div className="flex space-x-4">
      <div className="relative h-[48px] w-[48px]">
        <Image
          src={
            "https://bxjsuelhllhggaosiovg.supabase.co/storage/v1/object/public/prediction-markets/bitcoin-etf.jpeg"
          }
          fill={true}
          alt=""
          className="rounded-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <span className="text-sm font-medium text-white">
            Jessica Jackson
          </span>
        </div>
        <div>
          <span className="text-sm text-neutral-400">
            May 12, 2021 • 5 min read
          </span>
        </div>
      </div>
    </div>
  );
}

export default function BlogTile() {
  return (
    <a href="https://www.google.com" className="space-y-6">
      <BlogImage />
      <BlogOverview />
      <BlogMetaData />
    </a>
  );
}
