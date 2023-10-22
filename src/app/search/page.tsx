"use client";

import { ItemCard } from "@/components/posts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useContext } from "react";
import { deletePostById } from "@/lib/request";
import { GlobalContext } from "@/context";




export default function Search() {
  const { searchResults, setSearchQuery, setSearchResults, searchQuery } =
    useContext(GlobalContext);

  const helperFuncToFetchSearchResults = async (query: string) => {
    const res = await fetch(`/api/search?query=${query}`, {
      method: "GET",
      cache: "no-store",
    });

    const data = await res.json();

    console.log(data, "searchdata");

    if (data.success) {
      setSearchResults(data.data);
    }
  }

  const handleSearch = async () => {
    helperFuncToFetchSearchResults(searchQuery);
  }

  const handleDelete = async (id: number) => {
    const res = await deletePostById(id);
    const data = await res.json();
    if (data && data.success) helperFuncToFetchSearchResults(searchQuery);
  }

  return (
    <section className="overflow-hidden py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mb-12 rounded-md bg-primary/[3%] py-11 px-8 dark:bg-dark sm:p-[50px] lg:mb-5 lg:px-8 xl:p-[55px]">
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                搜索任何博客文章
              </h2>
              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <Input
                    name="search"
                    id="search"
                    type="text"
                    placeholder="搜索博客"
                    autoFocus
                    autoComplete="off"
                    className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                    value={searchQuery}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setSearchQuery(e.target.value)
                    }
                  />
                </div>
                <div>
                  <Button onClick={handleSearch} >检索</Button>
                </div>
              </div>
            </div>
          </div>
          <section className="pt-[80px] w-full pb-[120px]">
            <div className="container">
              <div className="-mx-4 flex flex-wrap">
                {searchResults && searchResults.length ? (
                  searchResults.map((searchBlogItem: Post) => (
                    <div
                      key={searchBlogItem.id}
                      className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3"
                    >
                      <ItemCard
                        handleDelete={handleDelete}
                        post={searchBlogItem}
                      />
                    </div>
                  ))
                ) : (
                  <h1>没有搜索结果 </h1>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
