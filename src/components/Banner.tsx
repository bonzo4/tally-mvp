"use client";

import Image from 'next/image'
import Link from 'next/link'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { LandingBanner } from "@/lib/supabase/landingBanners";
import { MarketsBanner } from "@/lib/supabase/marketsBanners";

type Banner = LandingBanner | MarketsBanner;

function BannerSlide({ src, alt, href }: { src: string, alt: string, href: string }) {
  return (
    <Link href={href} className="min-w-full h-full flex-1">
      <div className="embla__slide relative min-w-full h-full flex-1">
        <Image src={src} alt={alt} fill={true} className="object-cover" />
      </div>
    </Link>
  )
}

const autoplayOptions = {
  delay: 5000,
  stopOnInteraction: false,
}

function BannerCarousel({ banners }: { banners: Banner[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay(autoplayOptions)
  ])


  return (
    <div className="embla overflow-hidden flex flex-grow" ref={emblaRef}>
      <div className="embla__container flex w-full">
        {
          banners.map(({ banner, description, link }, index) => {
            if (banner && description && link) {
              return (
                <BannerSlide key={index} src={banner} alt={description} href={link} />
              )
            }
          })
        }
      </div>
    </div>
  )
}

export default function Banner({ banners }: { banners: Banner[] }) {
  return (
    <div className="w-full min-h-[50vh] flex flex-col bg-orange-100">
      <BannerCarousel banners={banners} />
    </div>
  )
}
