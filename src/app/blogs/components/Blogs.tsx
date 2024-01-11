"use client";

import { useState } from "react";

import BlogTile from "./BlogTile";
import Filter from "./Filter";
import { Newsletter } from "@/app/api/blogs/route";

export default function Blogs({ blogs }: { blogs: Newsletter[] }) {
  const [selected, setSelected] = useState<string>("Category One");
  return (
    <div className="flex w-full flex-col items-center space-y-8 lg:space-y-16">
      <Filter selected={selected} setSelected={setSelected} />
      <div className="grid w-full grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:grid-cols-3 lg:px-16">
        {blogs.map((blog, index) => (
          <BlogTile key={index} {...blog} />
        ))}
      </div>
    </div>
  );
}
