"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/spinner";
import { GlobalContext } from "@/context";
import { formControls, initialBlogFormData, categories } from "@/config";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardTitle, CardFooter, CardHeader, CardDescription, CardContent } from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import Editor from "@/components/editor";

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
      <Card className="w-full px-4">
        <CardHeader>
          <CardTitle className="text-2xl">新博客</CardTitle>
          <CardDescription>创建属于你的博客</CardDescription>
        </CardHeader>

        <CardContent>
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
                  className="border-primary mb-8 rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
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
                      className="border-primary w-full mb-8 rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                    />
                  ) : control.component === "textarea" ? (
                    <>
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

                      <Editor className="border-primary" />
                    </>
                  ) : null}
                </div>
              ))}

              <Select onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="分类" />
                </SelectTrigger>
                <SelectContent>
                  {
                    categories.map((item) => (
                      <SelectItem value={item.value}>{item.label}</SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>


            </div>
          </div>
        </CardContent>

        <CardFooter>
          <Button className="px-4" onClick={handleSaveBlogPost}>
            发布
          </Button>
        </CardFooter>
      </Card>
    </section >
  );
}
