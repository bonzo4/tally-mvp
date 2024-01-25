import Image from "next/image";

export default function DisplayPicture({
  image,
  alt,
}: {
  image: string | null;
  alt?: string;
}) {
  return (
    <div className="mr-4 flex h-[100px] w-[100px] items-center justify-center rounded-full bg-tally-layer-1 lg:mr-12 lg:h-[200px] lg:w-[200px]">
      <Image
        src={
          image ||
          "https://bxjsuelhllhggaosiovg.supabase.co/storage/v1/object/public/user_icons/logomark-2.png"
        }
        width={150}
        height={150}
        alt={alt || "Display picture"}
        className="object-scale-down"
      />
    </div>
  );
}
