import { Newsletter } from "@/app/api/blogs/route";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import InsightCard from "./card";

type InsightProps = {
  blogs: Newsletter[];
};

export default function Insights({ blogs }: InsightProps) {
  return (
    <div className="flex flex-col space-y-5 px-4 lg:px-16">
      <div className="flex justify-between">
        <Link href="/blogs">
          <h2 className="text-4xl font-bold text-white hover:underline">
            Insights
          </h2>
        </Link>
        <Button
          className="border border-tally-primary bg-black text-tally-primary"
          asChild
        >
          <Link href="/blogs">View All</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-5">
        {blogs.map((blog) => (
          <InsightCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
}
