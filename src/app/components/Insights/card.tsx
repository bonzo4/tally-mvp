import { Newsletter } from "@/app/api/blogs/route";
import Link from "next/link";
import Image from "next/image";
type InsightCardProps = {
  blog: Newsletter;
} & React.HTMLAttributes<HTMLDivElement>;

export default function InsightCard({ blog }: InsightCardProps) {
  const date = new Date(blog.publish_date);

  const month = date.toLocaleString("default", { month: "short" });
  const day =
    date.getDate() +
    (date.getDate() % 10 === 1
      ? "st"
      : date.getDate() % 10 === 2
        ? "nd"
        : "th");

  return (
    <div className="w-full">
      <Link href={`/blogs/${blog.id}`}>
        <div className="flex w-full">
          <div className="relative h-[100px] w-[100px] flex-shrink-0">
            <Image
              src={blog.thumbnail_url}
              fill={true}
              alt="test image"
              className="rounded-lg object-cover"
            />
          </div>
          <div className="flex w-full flex-col justify-center space-y-1 self-stretch px-3">
            <div className="flex w-full flex-row items-center justify-between">
              <h3 className="w-full text-xs font-bold text-tally-primary">
                {blog.subtitle}
              </h3>
              <div className="flex w-[20%] flex-row items-center justify-end">
                <span className="text-nowrap text-xs font-medium text-gray-400">
                  {month} {day}
                </span>
              </div>
            </div>
            <div>
              <h2 className="font-bold text-white">{blog.title}</h2>
            </div>
            <div className="line-clamp-2 w-full text-sm text-white">
              {blog.preview_text}
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et
                eros id massa dictum semper. Vestibulum quis tortor a sem
                lacinia finibus quis et est. Nulla suscipit diam ac interdum
                aliquam. And if there happens to be more text it should cut off
                see here it&apos;s going to keep going and let&apos;s see what
                happens to the text here.
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
