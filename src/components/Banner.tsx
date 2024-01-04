"use client";

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { EmblaCarouselType } from 'embla-carousel'
import { LandingBanner } from "@/lib/supabase/landingBanners";
import { MarketsBanner } from "@/lib/supabase/marketsBanners";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Banner = LandingBanner | MarketsBanner;

function TransparentToBlackGradientOverlay() {
  return (
    <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent"></div>
  )
}

function Info({ src, alt }: { src: string, alt: string }) {
  return (
    <div className="absolute bottom-12 left-0 px-4 lg:px-16 text-white flex flex-col space-y-1">
      <div className="text-white flex space-x-5">
        <div className="relative w-[80px] lg:w-[120px] h-[80px] lg:h-[120px] flex-shrink-0">
          <Image src={src} alt={alt} fill={true} className="object-cover rounded-2xl" />
        </div>
        <div className="flex flex-col h-[80px] lg:h-[120px] justify-between">
          <div>
            <Badge variant="secondary">Climate</Badge>
          </div>
          <div className="lg:hidden">Bet: $2,544,324</div>
          <div className="lg:hidden">Expires: Nov 8th, 2024</div>
          <div className="flex flex-col hidden lg:flex lg:flex-row lg:space-x-5">
            <div>Bet: $2,544,324</div>
            <div>Expires: Nov 8th, 2024</div>
          </div>
          <div className="hidden lg:block">
            <h1 className="text-3xl font-bold">Will global temperatures increase this year?</h1>
          </div>
        </div>
      </div>
      <div className="lg:hidden">
        <h1 className="text-2xl font-bold">Will global temperatures increase this year?</h1>
      </div>
    </div>

  )
}

function ActionItem() {
  return(
    <div className="absolute bottom-2 lg:bottom-12 right-0 w-full flex justify-end px-4 lg:px-16">
      <Button variant="secondary">Bet Now</Button>
    </div>
  )
}

function Slide({ src, alt, href }: { src: string, alt: string, href: string }) {
  return (
    <Link href={href} className="min-w-full h-full flex-1">
      <div className="embla__slide relative min-w-full h-full flex-1">
        <Image src={src} alt={alt} fill={true} className="object-cover" />
        <TransparentToBlackGradientOverlay />
        <Info src={src} alt={alt} />
        <ActionItem />
      </div>
    </Link>
  )
}

interface DotButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isCurrent: boolean;
}

function DotButton(props: DotButtonProps) {
  const { isCurrent, ...restProps } = props
  let opacity = isCurrent ? "opacity-100" : "opacity-50"

  return (
    <button {...restProps} className={`w-[0.6rem] h-[0.6rem] rounded-full bg-white ${opacity}`}>
    </button>
  )
}

const autoplayOptions = {
  delay: 5000,
  stopOnInteraction: false,
}

function Carousel({ banners }: { banners: Banner[] }) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay(autoplayOptions)
  ])

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index), 
    [emblaApi]
  )

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect)
    emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect])
 
  return (
    <div className="embla overflow-hidden relative flex flex-grow" ref={emblaRef}>
      <div className="embla__container flex w-full">
        {
          banners.map(({ banner, description, link }, index) => {
            if (banner && description && link) {
              return (
                <Slide key={index} src={banner} alt={description} href={link} />
              )
            }
          })
        }
      </div>
      <div className="absolute bottom-0 left-0 lg:right-0 flex justify-center items-center px-4 pb-4 space-x-2">
      {
        banners.map((_, index) => {
          return (
            <DotButton key={index} isCurrent={index == selectedIndex} onClick={() => scrollTo(index)} />
          )
        })
      }
      </div>
    </div>
  )
}

export default function Banner({ banners }: { banners: Banner[] }) {
  return (
    <div className="w-full min-h-[50vh] flex flex-col bg-black">
      <Carousel banners={banners} />
    </div>
  )
}
