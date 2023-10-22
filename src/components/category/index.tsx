"use client";

import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { categories } from "@/config";
import Link from "next/link";

import { Card, CardHeader } from "@/components/ui/card";

export default function CategoryList({ list }: { list: Post[] }) {

  const router = useRouter();

  const getMaxId = Math.max(...list.map((item) => item.id));

  const getLatestBlogForCurrentCategory =
    list && list.length ? list.find((item) => item.id === getMaxId) : null;

  const relatedBlogs =
    list && list.length ? list.filter((item) => item.id !== getMaxId) : [];

  return (
    <>
      <section className="overflow-hidden pt-[180px] pb-[120px]">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-8/12">
            {getLatestBlogForCurrentCategory === null ? (
              <div className="flex flex-col gap-4">
                <h2 className="mb-8 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl">
                  没有可用于此类别的博客！请创建一个
                </h2>
                <Button
                  onClick={() => router.push("/posts/create")}
                >新的博客
                </Button>
              </div>
            ) : (
              <div>
                <h2 className="mb-8 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl">
                  {getLatestBlogForCurrentCategory?.title}
                </h2>
                <div className="mb-10 w-full overflow-hidden rounded">
                  <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                    <Image
                      src={getLatestBlogForCurrentCategory?.image || ""}
                      alt="Blog"
                      fill
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                </div>
                <p className="mb-8 leading-relaxed text-base font-medium text-body-color sm:text-lg lg:text-base xl:text-lg">
                  {getLatestBlogForCurrentCategory?.description}
                </p>
              </div>
            )}
          </div>
          <div className="w-full px-4 lg:w-4/12">
            <Card className="mb-10 rounded-md  bg-opacity-5 dark:bg-opacity-10">
              <CardHeader className="border-b border-body-color border-opacity-10 py-4 px-8 text-lg font-semibold text-black dark:border-white dark:border-opacity-10 dark:text-white">
                按类别筛选
              </CardHeader>
              <div className="flex flex-wrap py-6 px-8">
                {categories.map((catItem) => (
                  <button
                    onClick={() => router.push(`/category/${catItem.value}`)}
                    className="mr-3 mb-3 inline-flex items-center justify-center rounded-md bg-primary  py-2 px-4 text-white duration-300"
                  >
                    {catItem.label}
                  </button>
                ))}
              </div>
            </Card>
            <Card className="mb-10 rounded-md  bg-opacity-5 dark:bg-opacity-10">
              <CardHeader className="border-b border-body-color border-opacity-10 py-4 px-8 text-lg font-semibold text-black dark:border-white dark:border-opacity-10 dark:text-white">
                相关的博客
              </CardHeader>
              <ul className="p-8">
                {relatedBlogs && relatedBlogs.length ? (
                  relatedBlogs.map((item) => (
                    <li
                      className="mb-6 border-b border-body-color border-opacity-10 pb-6 dark:border-white dark:border-opacity-10"
                      key={item.id}
                    >
                      <div className="flex items-center lg:block xl:flex">
                        <div className="mr-5 lg:mb-3 xl:mb-0">
                          <div className="relative h-[60px] w-[70px] overflow-hidden rounded-md sm:h-[75px] sm:w-[85px]">
                            <Image src={item.image} alt="Blog" fill />
                          </div>
                        </div>
                        <div className="w-full">
                          <h5>
                            <Link
                              href={"/"}
                              className="mb-[8px] block text-base font-medium text-black dark:text-white hover:text-primary dark:hover:text-primary"
                            >
                              {item.title}
                            </Link>
                          </h5>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <h1>没有可用的相关博客
                  </h1>
                )}
              </ul>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
