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
        <div className="flex items-center">
          <div className="flex flex-col items-center justify-center w-3/4">
            <p>Ảnh gốc</p>
            <DropZoneComponent handleChange={handleChange} />
          </div>
          <div className="flex flex-col items-center justify-center w-1/4">
            Ảnh hiển thị trên CV
          </div>
        </div>
        <DialogFooter className="flex gap-2 justify-center w-full">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Hủy
            </Button>
          </DialogClose>
          <Button type="submit" form="application-form" disabled={isUpLoading}>
            {isUpLoading ? "Đang xử lý..." : "Hoàn tất"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadDialogComponent;
