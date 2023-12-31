import CategoryList from "@/components/category";
import prisma from "@/lib/prisma";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "分类 | Huala Blog",
  description: "Generated by create next app",
};

export default async function Category({ params }: { params: any }) {
  const { id } = params;
  const postsData = await prisma.post.findMany({
    where: {
      category: id || "",
    },
  });
  return <CategoryList list={postsData} />;
}
