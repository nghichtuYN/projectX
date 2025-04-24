"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/store/UserStore";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ImageIcon, List, MapPin, MoreHorizontal, Smile } from "lucide-react";
import { Input } from "@/components/ui/input";
import FormCreatePost from "./FormCreatePost";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { ListPosts, Post } from "@/types/Post";
import { getTimeSince } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

type Props = {
  post?: Post;
  contentHeader?: string;
  triggerContent: any;
  isClone: boolean;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<ListPosts, Error>>;
};
const DialogPost = ({
  post,
  contentHeader,
  triggerContent,
  isClone,
  refetch,
}: Props) => {
  const [open, setOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  if (!user) return <div>Loading...</div>;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {triggerContent(post, setOpen, user)}
      <DialogContent className="sm:max-w-md  p-0 gap-0 bg-[#121212] text-white border-[#2a2a2a] [&>button]:hidden">
        <DialogHeader className="p-4 border-b border-[#2a2a2a] flex flex-row items-center justify-between">
          <Button
            variant="ghost"
            className="text-white hover:bg-transparent hover:text-white/70 p-0 h-auto font-normal"
            onClick={() => setOpen(false)}
          >
            Hủy
          </Button>
          <DialogTitle className="text-center text-base font-normal">
            {contentHeader ? contentHeader : "Thread trả lời"}
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full h-8 w-8 text-white"
          >
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </DialogHeader>
        {isClone ? (
          <FormCreatePost
            setOpen={setOpen}
            isClone={isClone}
            refetch={refetch}
            placeholder="Có gì mới?"
            user={user}
          />
        ) : (
          <div className="flex flex-col overflow-y-scroll">
            <div className="px-4 py-3">
              <div className="flex gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={`${process.env.NEXT_PUBLIC_API_URL_IMAGE}${post?.user?.profilePicture}`}
                    alt="Profile picture"
                  />
                  <AvatarFallback>LC</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">
                      {post?.user?.name}
                    </span>
                    <span className="text-xs text-gray-400">
                      {getTimeSince(post?.created!)}
                    </span>
                  </div>
                  <p className="text-sm mt-1">{post?.content}</p>
                </div>
              </div>
            </div>
            <Separator className="h-5 ml-8" orientation="vertical" />

            <FormCreatePost
              setOpen={setOpen}
              post={post}
              isClone={isClone}
              refetch={refetch}
              placeholder={`Trả lời ${post?.user?.name}`}
              user={user}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DialogPost;
