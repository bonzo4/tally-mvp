export async function getNews() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/news`, {
      next: {
        revalidate: 60,
      },
    });

    return await response.json();
  } catch {
    return null;
  }
}
