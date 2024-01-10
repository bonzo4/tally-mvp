"use client";

import { useState } from "react";

import Filter from "./components/Filter";
import BlogTile from "./components/BlogTile";

function Header() {
  return (
    <div className="max-w-[750px] space-y-4">
      <div className="mb-4 text-center font-bold text-tally-primary">Blog</div>
      <h2 className="text-center text-6xl font-bold text-white">
        The latest happenings in the Tally Market world
      </h2>
    </div>
  );
}

function BlogGrid() {
  return (
    <div className="grid w-full grid-cols-3 gap-8">
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
    <div className="flex w-full flex-col items-center space-y-20 px-16 py-28">
      <Header />
      <div className="flex w-full flex-col items-center space-y-16">
        <Filter selected={selected} setSelected={setSelected} />
        <BlogGrid />
      </div>
    </div>
  );
}
