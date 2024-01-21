import { NewsletterWithContent } from "@/app/api/blogs/[id]/route";
import { Newsletter } from "@/app/api/blogs/route";
import { fetchData } from "../fetch";

type GetBlogsOptions = {
  limit?: number;
  page?: number;
};

export async function getBlogs({ limit = 12, page = 1 }: GetBlogsOptions) {
  const url = `${process.env.NEXT_PUBLIC_URL}/api/blogs?limit=${limit}&page=${page}`;
  const blogs = await fetchData<Newsletter[], {}>({ url, options: {} });

  return blogs;
}

export async function getBlog(id: string) {
  const url = `${process.env.NEXT_PUBLIC_URL}/api/blogs/${id}`;
  const blog = await fetchData<NewsletterWithContent, {}>({
    url,
    options: {},
  });

  return blog;
}
