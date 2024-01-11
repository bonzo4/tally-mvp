import Image from "next/image";
import { Newsletter } from "@/app/api/blogs/route";

function BlogImage({ src }: { src: string }) {
  return (
    <div className="relative h-[300px] w-full">
      <Image
        src={src}
        fill={true}
        alt=""
        className="rounded-2xl object-cover"
      />
    </div>
  );
}

function BlogOverview({
  title,
  previewText,
}: {
  title: string;
  previewText: string;
}) {
  return (
    <div className="space-y-2">
      <div className="text-sm font-medium text-tally-primary">Category</div>
      <div>
        <h1 className="text-2xl font-bold text-white">{title}</h1>
      </div>
      <div>
        <p className="line-clamp-2 text-neutral-400">{previewText}</p>
      </div>
    </div>
  );
}

function BlogAuthors({ authors }: { authors: string[] }) {
  return (
    <div>
      {authors.map((author, index) => {
        return (
          <span key={index} className="text-sm font-medium text-white">
            <span className="text-sm font-medium text-white">{author}</span>
            {index === authors.length - 1 ? "" : ", "}
          </span>
        );
      })}
    </div>
  );
}

function BlogMetaData({ authors, date }: { authors: string[]; date: string }) {
  const dateObj = new Date(date);
  const m = dateObj.toLocaleString("default", { month: "short" });
  const d = dateObj.getDate();
  const y = dateObj.getFullYear();

  return (
    <div className="flex space-x-4">
      <div className="relative h-[48px] w-[48px]">
        <Image
          src={
            "https://bxjsuelhllhggaosiovg.supabase.co/storage/v1/object/public/syndicate/syndicate_logo.jpeg"
          }
          fill={true}
          alt=""
          className="rounded-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-between">
        <BlogAuthors authors={authors} />
        <div>
          <span className="text-sm text-neutral-400">
            {d} {m} {y}
          </span>
        </div>
      </div>
    </div>
  );
}

function convertUnixToIsoString(unix: number) {
  return new Date(unix * 1000).toString();
}

export default function BlogTile(props: Newsletter) {
  const {
    authors,
    preview_text,
    publish_date,
    thumbnail_url,
    title,
    web_url,
    ...rest
  } = props;

  const date = convertUnixToIsoString(publish_date);

  return (
    <a href={web_url} className="flex h-full flex-col space-y-6">
      <BlogImage src={thumbnail_url} />
      <BlogOverview title={title} previewText={preview_text} />
      <BlogMetaData authors={authors} date={date} />
    </a>
  );
}
