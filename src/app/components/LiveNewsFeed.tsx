import Image from "next/image";

function NewsTile() {
  return (
    <div className="flex flex-col xl:flex-row">
      <div className="relative w-full xl:w-[300px] h-[220px] flex-shrink-0">
        <Image 
          src="https://raw.githubusercontent.com/davidjerleke/embla-carousel/master/packages/embla-carousel-docs/src/assets/images/slide-1.jpg" 
          fill={true}
          alt="test image"
          className="object-cover rounded-lg"
        />
      </div>
      <div className="flex flex-col justify-between w-full xl:px-6 py-4 space-y-3">
        <div className="flex flex-col space-y-1">
          <div>
            <h3 className="font-bold text-sm text-tally-primary">Finance</h3>
          </div>
          <div>
            <h2 className="font-bold text-2xl text-white line-clamp-2">Long news article title goes here gentlemen and what happens if it&apos;s too long?</h2>
          </div>
          <div className="text-sm text-gray-400 w-full line-clamp-2">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et eros id massa dictum semper. Vestibulum quis tortor a sem lacinia finibus quis et est. Nulla suscipit diam ac interdum aliquam. And if there happens to be more text it should cut off see here it&apos;s going to keep going and let&apos;s see what happens to the text here.
            </p>
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="relative w-[48px] h-[48px]">
            <Image 
              src="https://bxjsuelhllhggaosiovg.supabase.co/storage/v1/object/public/live-news-logos/fox-news-logo.jpeg" 
              fill={true}
              alt="test image"
              className="object-cover rounded-full"
            />
          </div>
          <div className="flex flex-col self-stretch justify-center space-y-1">
            <div className="text-white font-medium text-sm">
              Fox News
            </div>
            <div className="text-gray-400 text-sm">
              11 Jan 2023 • 5 minute read
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default function LiveNewsFeed() {
  return(
    <div className="flex flex-col space-y-5 px-4 lg:px-16">
      <div className="flex justify-between">
        <h2 className="text-4xl text-white font-bold">Live News Feed</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
        <NewsTile />
        <NewsTile />
        <NewsTile />
        <NewsTile />
        <NewsTile />
        <NewsTile />
      </div>
    </div>
  )
}

