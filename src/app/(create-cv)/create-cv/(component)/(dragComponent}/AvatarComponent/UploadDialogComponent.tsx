"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Upload } from "lucide-react";
import React, { useState } from "react";
import DropZoneComponent from "./DropZoneComponent";
import { FormType } from "@/types/formCvtype";
import Image from "next/image";
type Props = {
  handleChange: (
    field: keyof FormType,
    value: any,
    subField?: string,
    index?: number
  ) => void;
};
const UploadDialogComponent = ({ handleChange }: Props) => {
  const [isUpLoading, setIsUpLoading] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState("");

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(!open);
      }}
    >
      <Button onClick={() => setOpen(true)}>
        <Upload /> Sửa ảnh
      </Button>
      <DialogContent
        className=" h-[40vh] max-w-2xl"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-ellipsis line-clamp-2 pt-1">
            Cập nhật ảnh đại diện
          </DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center justify-center w-2/3">
            <p>Ảnh gốc</p>
            <DropZoneComponent  handleChange={handleChange} setData={setData} />
          </div>
          <div className="flex flex-col items-center w-1/3">
            Ảnh hiển thị trên CV
            <div className="w-32 h-32 relative">
              {" "}
              {/* Kích thước cố định + position */}
              <Image
                src={data || "https://github.com/shadcn.png"}
                alt="Avatar CV"
                fill
                className="object-cover "
              />
            </div>
          </div>
        </div>
        <DialogFooter className="flex gap-2 justify-center w-full">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Hủy
            </Button>
          </DialogClose>
          <Button
            onClick={() => {
              setIsUpLoading(true)
              handleChange("avatar", data);
              setIsUpLoading(false)
              setOpen(false);
            }}
            disabled={isUpLoading}
          >
            {isUpLoading ? "Đang xử lý..." : "Hoàn tất"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadDialogComponent;
