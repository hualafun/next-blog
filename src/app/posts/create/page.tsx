"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/spinner";
import { GlobalContext } from "@/context";
import { formControls, initialBlogFormData } from "@/config";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { useToast } from "@/components/ui/use-toast";


export default function Create() {
  const { toast } = useToast()
  const { formData, setFormData } = useContext(GlobalContext);
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const { data: session } = useSession();
  const router = useRouter();

  const handleImageChange = async (e: any) => {
    console.log(e);
    const file = e.target.files?.[0];
    if (!file) return
    try {
      setImageLoading(() => true);
      const data = new FormData()
      data.set('file', file)
      console.log(file);
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data
      })
      if (!res.ok) throw new Error(await res.text())
      const { url, path } = await res.json();
      toast({
        title: "上传成功",
        description: `图片地址: ${url}`,
      })
      setFormData({
        ...formData,
        image: url,
      });
    } catch (e: any) {
      console.error(e)
    } finally {
      setImageLoading(() => false);
    }
  }

  async function handleSaveBlogPost() {
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        userid: session?.user?.name,
        userimage: session?.user?.image,
        comments: [],
      }),
    });
    const data = await res.json();
    if (data && data.success) {
      setFormData(initialBlogFormData)
      router.push("/posts");
    }
  }

  console.log(formData, "formData");

  return (
    <section className="overflow-hidden py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mb-12 rounded-md bg-primary/[3%] py-10 dark:bg-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px] px-8">
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                创建属于你的博客
              </h2>
              <div>
                <div className="flex flex-col gap-3">
                  <div className="flex gap-3">
                    <div className={`${imageLoading ? "w-1/2" : "w-full"}`}>
                      <label className="mb-3 block text-sm font-medium text-dark dark:text-white">
                        上传图片
                      </label>
                      <Input
                        id="fileinput"
                        accept="image/*"
                        max={1000000}
                        onChange={(e) => { handleImageChange(e) }}
                        type="file"
                        className="w-full mb-8 rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                      />
                    </div>
                    {imageLoading ? (
                      <div className="w-1/2">
                        <Spinner />
                      </div>
                    ) : null}
                  </div>

                  <div className="-mx-4 flex flex-wrap">
                    {formControls.map((control, index) => (
                      <div key={`control-${index}`} className="w-full px-4">
                        <label className="mb-3 block text-sm font-medium text-dark dark:text-white">
                          {control.label}
                        </label>
                        {control.component === "input" ? (
                          <input
                            type={control.type}
                            name={control.id}
                            placeholder={control.placeholder}
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              setFormData({
                                ...formData,
                                [control.id]: event.target.value,
                              });
                            }}
                            value={formData[control.id as keyof BlogFormData]}
                            className="w-full mb-8 rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                          />
                        ) : control.component === "textarea" ? (
                          <textarea
                            placeholder={control.placeholder}
                            rows={5}
                            name={control.id}
                            onChange={(
                              event: React.ChangeEvent<HTMLTextAreaElement>
                            ) => {
                              setFormData({
                                ...formData,
                                [control.id]: event.target.value,
                              });
                            }}
                            value={formData[control.id as keyof BlogFormData]}
                            className="w-full resize-none rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                          />
                        ) : control.component === "select" ? (
                          <select
                            name={control.id}
                            placeholder={control.placeholder}
                            onChange={(
                              event: React.ChangeEvent<HTMLSelectElement>
                            ) => {
                              setFormData({
                                ...formData,
                                [control.id]: event.target.value,
                              });
                            }}
                            value={formData[control.id as keyof BlogFormData]}
                            className="w-full mb-8 rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                          >
                            <option value={""} id="">
                              Select
                            </option>
                            {control.options.map((optionItem) => (
                              <option
                                id={optionItem.value}
                                value={optionItem.value}
                              >
                                {optionItem.label}
                              </option>
                            ))}
                          </select>
                        ) : null}
                      </div>
                    ))}
                    <Button className="w-full px-4" onClick={handleSaveBlogPost}>
                      发布
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section >
  );
}
