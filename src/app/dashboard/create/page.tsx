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

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const postFormSchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
  category: z.string(),
})



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


  // 1. Define your form.
  const form = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: "",
      category: ""
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof postFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>标题</FormLabel>
                    <FormControl>
                      <Input placeholder="请输入标题" {...field} />
                    </FormControl>
                    <FormDescription>
                      这是你博客的标题.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField control={form.control} name="category" render={
                ({ field }) => (
                  <FormItem>
                    <FormLabel>博客分类</FormLabel>
                    <FormControl>
                      <Select {...field} onValueChange={(value) => setFormData({ ...formData, category: value })}>
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
                    </FormControl>
                    <FormDescription>
                      这是你博客的分类.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>

                )
              }></FormField>
              <Button type="submit" onClick={handleSaveBlogPost}>发布</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section >
  );
}
