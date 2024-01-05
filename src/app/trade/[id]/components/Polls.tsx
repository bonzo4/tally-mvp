import Image from "next/image";
import Link from "next/link";

function Poll() {
  return (
    <div>
      <Link href="/">
        <div className="bg-pink-200 flex w-full h-[20vh]">
          <div className="relative h-full w-1/4">
            <Image 
              src="https://raw.githubusercontent.com/davidjerleke/embla-carousel/master/packages/embla-carousel-docs/src/assets/images/slide-1.jpg" 
              fill={true}
              alt="test image"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col space-y-2 justify-center w-3/4 h-full p-3">
            <div>
              <h3 className="text-2xl font-bold">Insight Title</h3>
            </div>
            <div className="w-full overflow-hidden">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et eros id massa dictum semper. Vestibulum quis tortor a sem lacinia finibus quis et est. Nulla suscipit diam ac interdum aliquam.
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default function Polls() {
  return (
    <div className="flex flex-col space-y-5">
      <Poll />
      <Poll />
      <Poll />
      <Poll />
    </div>
  )
}

