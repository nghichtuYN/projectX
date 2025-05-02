"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { User } from "@/store/UserStore";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useMutationHook } from "@/hooks/useMutationHook";
import { commentPost, createPost } from "@/services/posts";
import { toast } from "sonner";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { ListPosts, Post } from "@/types/Post";
import { Button } from "@/components/ui/button";
type Props = {
  post?: Post;
  user: User;
  placeholder: string;
  isClone: boolean;
  refetch: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
};
const FormCreatePost = ({
  post,
  isClone,
  user,
  placeholder,
  refetch,
  setOpen,
}: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [file, setFile] = useState<File[]>([]);
  const [content, setContent] = useState<string>("");
  const [attach, setAttach] = useState<string>("");
  const mutationCreate = useMutationHook(
    (data: FormData) => {
      return createPost(data);
    },
    (data) => {
      toast.success("Tạo bài thành công");
      setOpen(false);
      refetch();
    },
    (error) => {
      toast.error("Bình luận thất bại");
      setIsLoading(false);
    }
  );
  const mutationComment = useMutationHook(
    (data: { id: string; formData: FormData }) => {
      const { id, formData } = data;
      return commentPost(id, formData);
    },
    (data) => {
      toast.success("Bình luận thành công");
      setIsLoading(false);
      setOpen(false);
      refetch();
    },
    (error) => {
      toast.error("Bình luận thất bại");
      setIsLoading(false);
    }
  );
  const onSubmit = () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("Content", content);
    if (file && file.length > 0) {
      formData.append("attachedFile", file[0]);
    }
    if (isClone && post === undefined) {
      mutationCreate.mutate(formData);
    } else {
      if (post !== undefined) {
        mutationComment.mutate({ id: post?.id, formData });
      }
    }
  };
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const file = e.target.files?.[0];
    if (file) {
      setFile((prev) => [file]);
      const reader = new FileReader();
      reader.onload = (event) => {
        setAttach(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const triggerFileInput = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    setTimeout(() => {
      fileInputRef.current?.click();
    }, 0);
  };
  return (
    <>
      <div className="space-y-4 p-2 ">
        <div className="flex gap-3 ml-2">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={
                user?.provider === "Google"
                  ? user?.profilePicture
                  : `${process.env.NEXT_PUBLIC_API_URL_IMAGE}${user?.profilePicture}`
              }
              alt={user?.fullName}
            />
            <AvatarFallback>LC</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm">{user?.fullName}</span>
            </div>
            <Input
              placeholder={placeholder}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => {
                setContent(e.target.value);
              }}
              className="border-none h-6 px-0 focus-visible:ring-0 placeholder:font-medium"
            />
            {attach ? (
              <Image src={attach || ""} alt="Avatar" width={100} height={100} />
            ) : null}
            <div>
              <ImageIcon
                onClick={(e) => {
                  triggerFileInput(e);
                }}
                className="h-4 w-4 mt-2 cursor-pointer"
              />
              <Input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onSubmit();
            }}
            disabled={isLoading}
            className="bg-white hover:bg-white/90 text-black rounded-full px-4 py-1 h-auto text-sm font-semibold"
          >
            {isLoading ? "Đang đăng..." : "Đăng"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default FormCreatePost;
