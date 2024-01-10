import { getBlog } from "@/lib/api";

export default async function BlogPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const blog = await getBlog(id);

  return (
    <div className="flex w-full flex-row items-center justify-center bg-black py-10">
      <div className="border-3 rounded-md border-tally-primary bg-tally-primary p-1">
        <div dangerouslySetInnerHTML={{ __html: blog.content.free.web }} />
      </div>
    </div>
  );
}
