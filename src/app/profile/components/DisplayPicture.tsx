import Image from "next/image";

export default function DisplayPicture() {
  return(
    <div className="relative w-[100px] h-[100px] lg:w-[200px] lg:h-[200px]">
      <Image
        src="https://raw.githubusercontent.com/davidjerleke/embla-carousel/master/packages/embla-carousel-docs/src/assets/images/slide-2.jpg"
        fill={true}
        alt="test image"
        className="object-cover rounded-full"
      />
    </div>
  )
}

