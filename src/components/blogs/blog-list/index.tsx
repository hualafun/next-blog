"use client";

import SingleBlog from "../single-blog";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

async function extractAllBlogs() {
  const res = await fetch(`${process.env.URL}/api/blog-post/get-all-posts`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default function BlogList({ lists }: { lists: Blog[] }) {
  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, []);

  const handleDelete = async (id: number) => {
    const res = await fetch(`/api/blog-post/delete-post?id=${id}`, {
      method: "DELETE",
      cache: "no-store",
    });
    const data = await res.json();
    if (data && data.success) router.refresh();
  }

  return (
    <section className="pt-[120px] pb-[120px]">
      <div className="container">
        <div className="-mx-4 grid grid-cols-3 gap-2">
          {lists && lists.length
            ? lists.map((listItem: Blog) => (
              <div className="px-4" key={listItem.id}>
                <SingleBlog handleDelete={handleDelete} blogItem={listItem} />
              </div>
            ))
            : null}
        </div>
      </div>
    </section>
  );
}
