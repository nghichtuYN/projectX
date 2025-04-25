"use client";
import { Post } from "@/types/Post";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageCircle, ThumbsDown, ThumbsUp } from "lucide-react";
import { cn, getTimeSince } from "@/lib/utils";
import DialogPost from "./DialogPost";
import { DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";
import { useMutationHook } from "@/hooks/useMutationHook";
import { dislikePost, likePost } from "@/services/posts";
import DialogUD from "./DialogUD";
import { useAuthStore } from "@/store/UserStore";
type Props = {
  post: Post;
  refetch: any;
};
const likeActionMap: { [key: string]: (id: string) => Promise<any> } = {
  like: likePost,
  dislike: dislikePost,
};

const PostComponent = ({ post, refetch }: Props) => {
  const isClone = false;

  const user = useAuthStore((state) => state.user);

  const triggerContent = (post: Post) => {
    return (
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1.5 text-sm font-normal text-gray-400"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <MessageCircle className="h-5 w-5 text-[#636e72]" />
          <span>{post?.commentsCount}</span>
        </Button>
      </DialogTrigger>
    );
  };
  const mutation = useMutationHook(
    (data: { id: string; state: string }) => {
      const { id, state } = data;
      const actionFn = likeActionMap[state];
      if (!actionFn) throw new Error("Invalid process type");
      return actionFn(id);
    },
    () => {
      refetch();
    }
  );
  const handleLikeChange = (id: string, state: string, e: React.MouseEvent) => {
    e.stopPropagation();
    mutation.mutate({ id, state });
  };
  return (
    <div className="bg-[#e0e0e0] cursor-pointer rounded-t-lg border w-full border-t-white text-[#333333]">
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex flex-col items-center gap-3">
            <Avatar className="h-10 w-10 border border-gray-700">
              <AvatarImage
                src={`${process.env.NEXT_PUBLIC_API_URL_IMAGE}${post?.user?.profilePicture}`}
                alt="Profile picture"
              />
              <AvatarFallback>LC</AvatarFallback>
            </Avatar>
            <div className=" flex items-center flex-col mt-1 gap-4">
              <div className="flex items-center flex-col gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "flex items-center gap-1.5 text-sm font-normal"
                  )}
                  onClick={(e) => {
                    handleLikeChange(post?.id, "like", e);
                  }}
                >
                  <ThumbsUp
                    className={cn(
                      `h-5 w-5 `,
                      post?.liked === true && post?.liked !== null
                        ? "fill-red-500 text-red-500"
                        : "text-[#636e72]"
                    )}
                  />
                </Button>
                <span className="text-[#636e72]">{post?.likesCount}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`flex items-center gap-1.5 text-sm font-normal `}
                  onClick={(e) => {
                    handleLikeChange(post?.id, "dislike", e);
                  }}
                >
                  <ThumbsDown
                    className={cn(
                      `h-5 w-5 `,
                      post?.liked === false && post?.liked !== null
                        ? "fill-red-500 text-red-500"
                        : "text-[#636e72]"
                    )}
                  />
                  {/* <span>{post?.likesCount}</span> */}
                </Button>
              </div>

              <DialogPost
                post={post}
                refetch={refetch}
                isClone={isClone}
                triggerContent={triggerContent}
              />
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="font-medium ml-2 text-[#333333]">
                  {post?.user?.name}
                </span>
                <span className="text-sm text-gray-400">
                  {getTimeSince(post?.created!)}
                </span>
              </div>
              {user?.id === post?.user?.id && <DialogUD />}
            </div>
            <div className="flex flex-col gap-2">
              <Link href={`/forum/post/${post?.id}`}>
                <p className="mt-1 ml-2 text-[#666666]">{post?.content}</p>
              </Link>
              {post?.attachedFile?.path && (
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL_IMAGE}${post?.attachedFile?.path}`}
                  alt="Image"
                  width={400}
                  height={400}
                  className="border border-gray-700 rounded-md object-fill"
                  quality={100}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostComponent;
