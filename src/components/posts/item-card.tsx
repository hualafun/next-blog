import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";

import { TrashIcon } from '@radix-ui/react-icons'

export default function ItemItemCard({
  post,
  handleDelete,
}: {
  post: Post;
  handleDelete: (id: number) => {};
}) {

  const { image, category, title, description, userimage, userid, id } =
    post;


  const { data: session } = useSession();

  return (
    <Card>
      <CardHeader className="relative p-0 overflow-hidden rounded-md bg-white shadow-one dark:bg-dark">
        <Link className="relative block h-[250px] w-full" href={`/posts/${id}`}>
          <span className="absolute top-6 right-6 z-20 inline-flex items-center justify-center rounded-full bg-primary py-2 px-4 text-sm font-semibold capitalize text-white">
            {category}
          </span>
          <Image src={image} alt="Post Post" fill />
        </Link>
      </CardHeader>
      <CardContent className="p-6 sm:p-8 md:py-8 md:px-6 lg:p-8 xl:py-8 xl:px-5 2xl:p-8">
        <h3>
          <Link
            className="mb-4 text-ellipsis overflow-hidden whitespace-nowrap block text-xl font-bold text-black hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl"
            href={`/posts/${id}`}
          >
            {title}
          </Link>
        </h3>
        <p className="h-[20px] text-ellipsis overflow-hidden whitespace-nowrap mb-6 pb-6 text-base font-medium text-body-color dark:border-white dark:border-opacity-10">
          {description}
        </p>
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5">
          <div className="mr-4">
            <div className="h-10 relative w-10 overflow-hidden rounded-full">
              <Image alt="Author" fill src={userimage} />
            </div>
          </div>
          <p className="text-sm font-medium text-dark dark:text-white">
            {userid.split("_")[0].toUpperCase()}
          </p>
          <div>
            {session !== null && session?.user?.name === userid ? (
              <Button size="icon" variant="link">
                <TrashIcon className="red" onClick={() => handleDelete(id)} />
              </Button>
            ) : null}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
