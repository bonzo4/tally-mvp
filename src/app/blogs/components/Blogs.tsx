"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import BlogTile from "./BlogTile";
import Filter from "./Filter";
import { Newsletter } from "@/app/api/blogs/route";
import { getBlogs } from "@/lib/api/data/blogs";
import { throttle } from "@/lib/utils";

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

  // Wrap in useCallback so we can use it in useEffect
  // without triggering useEffect on every render.
  const fetchMoreBlogs = useCallback(async () => {
    const blogs = await getBlogs({ limit: 12, page: page + 1 });
    setBlogsFetched((prev) => [...prev, ...(blogs || [])]);
    setPage((prev) => prev + 1);
  }, [page]);

  useEffect(() => {
    const throttleHandleScroll = throttle(() => handleScroll(), 250);
    window.addEventListener("scroll", throttleHandleScroll);
    return () => window.removeEventListener("scroll", throttleHandleScroll);
  }, []);

  useEffect(() => {
    if (isInView) {
      fetchMoreBlogs();
    }
  }, [fetchMoreBlogs, isInView]);

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
