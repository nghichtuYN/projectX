"use client";

import { getAPost } from "@/queries/queries";
import PostComponent from "../../components/PostComponent";
import { useParams } from "next/navigation";

// Simulated database of posts

export default function ForumPostPage() {
  const param = useParams();
  const postId = param.id as string;
  const { data: post, refetch } = getAPost(postId);
  if (!post) {
    return <div>Post not found</div>;
  }
  console.log(post);
  return (
    <div className=" bg-[#1e1e2f]  grid grid-cols-1 place-items-center">
      <div className="container w-2/5 min-h-screen rounded-t-lg border-2 border-white  bg-white flex flex-col items-start justify-start my-8">
        <PostComponent refetch={refetch} post={post.post} />
        <div className="flex w-full flex-col  ">
          {post?.post?.comments && post?.post?.comments?.length > 0 && (
            <div className="bg-[#e0e0e0] pl-5 border border-t p-2 font-semibold text-[15px] ">
              Bình luận
            </div>
          )}
          {post &&
            post?.post?.comments?.map((post) => (
              <PostComponent refetch={refetch} key={post.id} post={post} />
            ))}
        </div>
      </div>
    </div>
  );
}
