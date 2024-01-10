"use client";

import { useState } from "react";

import Filter from "./components/Filter";
import BlogTile from "./components/BlogTile";

function Header() {
  return (
    <div className="max-w-[750px] space-y-4 px-4 lg:px-16">
      <div className="mb-4 text-center font-bold text-tally-primary">Blog</div>
      <h2 className="text-center text-2xl font-bold text-white lg:text-6xl">
        The latest happenings in the Tally Market world
      </h2>
    </div>
  );
}

function BlogGrid() {
  return (
    <div className="grid w-full grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:grid-cols-3 lg:px-16">
      <BlogTile />
      <BlogTile />
      <BlogTile />
      <BlogTile />
      <BlogTile />
      <BlogTile />
      <BlogTile />
      <BlogTile />
    </div>
  );
}

export default function Page() {
  const [selected, setSelected] = useState<string>("Category One");

  return (
    <div className="flex w-full flex-col items-center space-y-12 py-14 lg:space-y-20 lg:py-28">
      <Header />
      <div className="flex w-full flex-col items-center space-y-8 lg:space-y-16">
        <Filter selected={selected} setSelected={setSelected} />
        <BlogGrid />
      </div>
    </div>
  );
}
