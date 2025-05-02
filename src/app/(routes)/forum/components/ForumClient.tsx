// src/app/(routes)/forum/ForumClient.tsx
"use client";
import { useSearchParams } from "next/navigation";
import { getAllPost } from "@/queries/queries";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dispatch, SetStateAction } from "react";
import { User } from "@/store/UserStore";
import { DialogTrigger } from "@/components/ui/dialog";
import { Post } from "@/types/Post";
import { Skeleton } from "@/components/ui/skeleton";
import DialogPost from "./DialogPost";
import PostComponent from "./PostComponent";

export default function ForumClient() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const pageSize = parseInt(searchParams.get("pageSize") || "20", 10);
  const isClone = true;
  const { data: posts, isLoading, refetch } = getAllPost(search, pageSize);

  const triggerContent = (
    post: Post,
    setOpen?: Dispatch<SetStateAction<boolean>>,
    user?: User | null
  ) => {
    return (
      <DialogTrigger className="w-full border p-1 bg-[#e0e0e0] rounded-t-lg">
        <div className="flex justify-between items-center gap-2 px-6 w-full">
          <div className="flex items-center gap-2 w-full">
            <Avatar>
              <AvatarImage
                src={user?.provider==="Google" ? user?.profilePicture : `${process.env.NEXT_PUBLIC_API_URL_IMAGE}${user?.profilePicture}`}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="text-[15px] font-normal text-gray-400">Có gì mới?</p>
          </div>
          <span
            onClick={() => {
              if (setOpen) setOpen(true);
            }}
            className="text-[15px] w-[90px] rounded-md font-semibold p-2 bg-[#1e1e2f] text-white"
          >
            Đăng
          </span>
        </div>
      </DialogTrigger>
    );
  };

  return (
    <div className="container w-2/5 min-h-screen rounded-t-lg border-2 border-white bg-white flex flex-col items-start justify-start my-8">
      <DialogPost
        triggerContent={triggerContent}
        contentHeader="Bài viết mới"
        isClone={isClone}
        refetch={refetch}
      />
      {/* <Separator className="my-4" /> */}
      <div className="flex w-full flex-col">
        {isLoading ? (
          <div className="w-full p-4 space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        ) : (
          posts &&
          posts.items.map((post) => (
            <PostComponent refetch={refetch} key={post.id} post={post} />
          ))
        )}
      </div>
    </div>
  );
}
