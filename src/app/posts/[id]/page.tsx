import { PostDetail } from "@/components/posts";
import prisma from "@/database";

interface Param {
  id: string;
}

export default async function PostDetails({ params }: { params: Param }) {
  const { id } = params;
  const postData: Post | null = await prisma.post.findUnique({
    where: {
      id: Number(id),
    },
  });
  if (!postData) return null;
  return <PostDetail detail={postData} />;
}
