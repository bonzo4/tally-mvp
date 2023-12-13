"use client";

import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'

const TEST_IMAGE_SRCS = [
  {
    src: "https://raw.githubusercontent.com/davidjerleke/embla-carousel/master/packages/embla-carousel-docs/src/assets/images/slide-1.jpg",
    alt: "test image1"
  },
  {
    src: "https://raw.githubusercontent.com/davidjerleke/embla-carousel/master/packages/embla-carousel-docs/src/assets/images/slide-2.jpg",
    alt: "test image2"
  },
  {
    src: "https://raw.githubusercontent.com/davidjerleke/embla-carousel/master/packages/embla-carousel-docs/src/assets/images/slide-3.jpg",
    alt: "test image3"
  },
  {
    src: "https://raw.githubusercontent.com/davidjerleke/embla-carousel/master/packages/embla-carousel-docs/src/assets/images/slide-4.jpg",
    alt: "test image4"
  },
]

interface BannerSlideProps {
  src: string,
  alt: string
}

function BannerSlide({ src, alt }: BannerSlideProps) {
  return (
    <div className="embla__slide relative min-w-full h-full flex-1">
      <Image src={src} alt={alt} fill={true} className="object-cover" />
    </div>
  )
}

const autoplayOptions = {
  delay: 4000,
  stopOnInteraction: false,
}

function BannerCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay(autoplayOptions)
  ])


  return (
    <div className="embla overflow-hidden flex flex-grow" ref={emblaRef}>
      <div className="embla__container flex w-full">
        {
          TEST_IMAGE_SRCS.map(({ src, alt }, index) => {
            return (
              <BannerSlide key={index} src={src} alt={alt} />
            )
          })
        }
      </div>
    </div>
  )
}

export default function Banner() {
  return (
    <div className="w-full min-h-[50vh] flex flex-col bg-orange-100">
      <BannerCarousel />
    </div>
  )
}

