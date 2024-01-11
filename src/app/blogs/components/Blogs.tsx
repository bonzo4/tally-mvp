"use client";

import { useEffect, useRef, useState } from "react";
// import { debounce } from "lodash";

import BlogTile from "./BlogTile";
import Filter from "./Filter";
import { Newsletter } from "@/app/api/blogs/route";
import { getBlogs } from "@/lib/api";

export default function Blogs({ blogs }: { blogs: Newsletter[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<string>("Category One");
  const [page, setPage] = useState<number>(1);
  const [isInView, setIsInView] = useState<boolean>(false);
  const [blogsFetched, setBlogsFetched] = useState<Newsletter[]>(blogs);

  const handleScroll = () => {
    if (containerRef.current && typeof window !== "undefined") {
      const container = containerRef.current;
      const { bottom } = container.getBoundingClientRect();
      const { innerHeight } = window;
      setIsInView((prev) => bottom <= innerHeight);
    }
  };

  const fetchMoreBlogs = async () => {
    const blogs = await getBlogs(12, page + 1);
    setBlogsFetched((prev) => [...prev, ...blogs]);
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isInView) {
      fetchMoreBlogs();
    }
  }, [isInView]);

  return (
    <div className="flex w-full flex-col items-center space-y-8 lg:space-y-16">
      <Filter selected={selected} setSelected={setSelected} />
      <div
        ref={containerRef}
        className="grid w-full grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:grid-cols-3 lg:px-16"
      >
        {blogsFetched.map((blog, index) => (
          <BlogTile key={index} {...blog} />
        ))}
      </div>
    </div>
  );
}
