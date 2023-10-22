export async function getAllBlogs() {
  const res = await fetch(`${process.env.URL}/api/blog-post/get-all-posts`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
