import Image from "next/image";

function NewsTile() {
  return (
    <div className="flex flex-col xl:flex-row">
      <div className="relative h-[220px] w-full flex-shrink-0 xl:w-[300px]">
        <Image
          src="https://raw.githubusercontent.com/davidjerleke/embla-carousel/master/packages/embla-carousel-docs/src/assets/images/slide-1.jpg"
          fill={true}
          alt="test image"
          className="rounded-lg object-cover"
        />
      </div>
      <div className="flex w-full flex-col justify-between space-y-3 py-4 xl:px-6">
        <div className="flex flex-col space-y-1">
          <div>
            <h3 className="text-sm font-bold text-tally-primary">Finance</h3>
          </div>
          <div>
            <h2 className="line-clamp-2 text-2xl font-bold text-white">
              Long news article title goes here gentlemen and what happens if
              it&apos;s too long?
            </h2>
          </div>
          <div className="line-clamp-2 w-full text-sm text-gray-400">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et
              eros id massa dictum semper. Vestibulum quis tortor a sem lacinia
              finibus quis et est. Nulla suscipit diam ac interdum aliquam. And
              if there happens to be more text it should cut off see here
              it&apos;s going to keep going and let&apos;s see what happens to
              the text here.
            </p>
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="relative h-[48px] w-[48px]">
            <Image
              src="https://bxjsuelhllhggaosiovg.supabase.co/storage/v1/object/public/live-news-logos/fox-news-logo.jpeg"
              fill={true}
              alt="test image"
              className="rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center space-y-1 self-stretch">
            <div className="text-sm font-medium text-white">Fox News</div>
            <div className="text-sm text-gray-400">
              11 Jan 2023 • 5 minute read
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LiveNewsFeed() {
  return (
    <div className="flex flex-col space-y-5 px-4 lg:px-16">
      <div className="flex justify-between">
        <h2 className="text-4xl font-bold text-white">Live News Feed</h2>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5">
        <NewsTile />
        <NewsTile />
        <NewsTile />
        <NewsTile />
        <NewsTile />
        <NewsTile />
      </div>
    </div>
  );
}
