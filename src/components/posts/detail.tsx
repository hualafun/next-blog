"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast"


export default function PostDetail({ detail }: { detail: Post }) {
  const { toast } = useToast();
  const [comment, setComment] = useState<string>("");
  const { data: session } = useSession();
  const router = useRouter();

  const handleCommentSave = async () => {
    const extractComments = [...detail.comments];
    extractComments.push(`${comment}|${session?.user?.name}`);
    const response = await fetch(`/api/posts`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: detail?.id,
        comments: extractComments,
      }),
    });
    if (response.ok) {
      toast({
        title: "评论成功",
        description: "",
      })
    }
    const data = await response.json();
    if (data && data.success) {
      setComment("");
      router.refresh();
    }
  }

  if (!detail) return null;

  return (
    <section className="pt-[150px] pb-[120px]">
      <div className="container">
        <div className="-mx-4 flex flex-col gap-4 items-center justify-center">
          <div className="w-full px-4 lg:w-8/12">
            <div>
              <h2 className="mb-8 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl">
                {detail?.title}
              </h2>
              <div className="mb-10 flex flex-wrap items-center justify-between border-b border-body-color border-opacity-10 pb-4 dark:border-white dark:border-opacity-10">
                <div className="flex flex-wrap items-center">
                  <div className="mr-10 mb-5 flex items-center">
                    <div className="mr-4">
                      <div className="relative h-10 w-10 overflow-hidden rounded-full">
                        <Image src={detail?.userimage} alt="User" fill />
                      </div>
                    </div>
                    <div className="w-full">
                      <h4 className="mb-1 text-base font-medium text-body-color">
                        <span className="pl-2">
                          {detail?.userid.split("_")[0]}
                        </span>
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="mb-5">
                  <Link
                    className="inline-flex items-center justify-center rounded-full bg-primary py-2 px-4 text-sm font-semibold text-white"
                    href={`/category/${detail?.category}`}
                  >
                    {detail?.category}
                  </Link>
                </div>
              </div>
              <div>
                <div className="mb-10 w-full overflow-hidden rounded">
                  <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                    <Image
                      src={detail?.image || ""}
                      alt="Post"
                      className="object-cover object-center"
                      fill
                    />
                  </div>
                </div>
                <p className="mb-8 leading-relaxed text-base font-medium text-body-color sm:text-lg lg:text-base xl:text-lg">
                  {detail?.description}
                </p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-8/12 flex gap-4">
            {session !== null ? (
              <>
                <Input
                  id="comment"
                  name="comment"
                  autoFocus
                  autoComplete="off"
                  placeholder="添加一个评论"
                  value={comment}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setComment(event.target.value)
                  }
                  className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                />
                <Button onClick={handleCommentSave}>
                  添加
                </Button>
              </>
            ) : null}
          </div>



          <section className="dark:bg-gray-900 py-8 lg:py-16 w-full lg:w-8/12">

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg lg:text-2xl font-bold text-black dark:text-white">
                评论 ({detail?.comments.length})
              </h2>
            </div>

            {detail && detail.comments && detail.comments.length > 0
              ? detail.comments.map((comment, index) => (
                <div key={`comment-${index}`} className="p-6 text-base rounded-lg dark:bg-gray-900">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <p className="inline-flex items-center mr-3 text-sm text-black dark:text-white font-semibold">
                        {comment.split("|")[1] === detail?.userid
                          ? `${comment.split("|")[1].split("_")[0]
                          } (Author)`
                          : comment.split("|")[1].split("_")[0]}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">
                    {comment.split("|")[0]}
                  </p>
                </div>
              ))
              : null}
          </section>
        </div>
      </div>
    </section>
  );
}
