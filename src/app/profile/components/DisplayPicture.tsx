import Image from "next/image";

export default function DisplayPicture() {
  return (
    <div className="relative mr-4 h-[100px] w-[100px] lg:mr-12 lg:h-[200px] lg:w-[200px]">
      <Image
        src="https://raw.githubusercontent.com/davidjerleke/embla-carousel/master/packages/embla-carousel-docs/src/assets/images/slide-2.jpg"
        fill={true}
        alt="test image"
        className="rounded-full object-cover"
      />
    </div>
  );
}
