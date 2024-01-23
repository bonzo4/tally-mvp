import Image from "next/image";

export default function DisplayPicture({
  image,
  alt,
}: {
  image: string;
  alt?: string;
}) {
  return (
    <div className="relative mr-4 h-[100px] w-[100px] lg:mr-12 lg:h-[200px] lg:w-[200px]">
      <Image
        src={image}
        fill={true}
        alt={alt || "Display picture"}
        className="rounded-full object-cover"
      />
    </div>
  );
}
