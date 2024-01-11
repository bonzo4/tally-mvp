import Blogs from "./components/Blogs";
import { getBlogs } from "@/lib/api";

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

export default async function Page() {
  const blogs = await getBlogs(12);
  if (!blogs) {
    return;
  }
  return (
    <div className="flex w-full flex-col items-center space-y-12 py-14 lg:space-y-20 lg:py-28">
      <Header />
      {blogs ? <Blogs blogs={blogs} /> : null}
    </div>
  );
}
