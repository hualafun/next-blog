"use client";
import ItemCard from "./item-card";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { deletePostById } from "@/lib/request";

export default function PostList({ lists }: { lists: Post[] }) {
  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, []);

  const handleDelete = async (id: number) => {
    const res = await deletePostById(id);
    const data = await res.json();
    if (data && data.success) router.refresh();
  }

  return (
    <section className="pt-[120px] pb-[120px]">
      <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-1 mt-12">
        {lists && lists.length
          ? lists.map((listItem: Post) => (
            <div className="px-4" key={listItem.id}>
              <ItemCard handleDelete={handleDelete} post={listItem} />
            </div>
          ))
          : null}
      </div>
    </section>
  );
}
