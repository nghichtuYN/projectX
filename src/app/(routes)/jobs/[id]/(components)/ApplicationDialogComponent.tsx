"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "../../../../../components/ui/button";
import { Feather, FolderUp, Send } from "lucide-react";
import { ScrollArea } from "../../../../../components/ui/scroll-area";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "../../../../../components/ui/form";
import { Textarea } from "../../../../../components/ui/textarea";
import FormFieldComponent from "../../../../(auth)/(components)/FormFieldComponent";
import DropzoneComponent from "./DropzoneComponent";
import { AlertDialogCompoent } from "./AlertDialogCompoent";
import { useMutationHook } from "@/hooks/useMutationHook";
import { createApplication } from "@/services/application";
import { toast } from "sonner";
import { error } from "node:console";

export const formSchema = z.object({
  name: z.string().min(2, {
    message: "Tên phải có ít nhất 2 ký tự.",
  }),
  email: z.string().email({
    message: "Vui lòng nhập một địa chỉ email hợp lệ.",
  }),
  phone: z.string().regex(/^[0-9]{10,11}$/, "Số điện thoại không hợp lệ"),
  decription: z.string(),
});
type Props = {
  id: string;
};
const ApplicationDialogComponent = ({ id }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [files, setFiles] = React.useState<File[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      decription: "",
    },
  });
  const mutation = useMutationHook(
    (data: { id: string; formData: FormData }) => {
      const { id, formData } = data;
      return createApplication(id, formData);
    },
    (data) => {
      toast.success("Tạo hồ sơ thành công!");
      setIsLoading(false);
      setOpen(false);
      form.reset();
      setFiles([]);
    },
    (error) => {
      toast.error("Tạo hồ sơ thất bại!");
      setIsLoading(false);
    }
  );
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Simulate API call
    if (files.length < 1) {
      setOpenAlert(true);
      return;
    }
    setIsLoading(true);
    const formData = new FormData();
    formData.append("fullName", values.name);
    formData.append("email", values.email);
    formData.append("phoneNumber", values.phone);
    formData.append("introduction", values.decription);
    formData.append("status", "1");
    formData.append("resume", files[0]);
    mutation.mutate({ id: id, formData });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(!open);
        form.reset();
        setFiles([]);
      }}
    >
      <Button
        className="flex items-center font-semibold w-full"
        onClick={() => setOpen(true)}
      >
        <Send />
        <p>Ứng tuyển ngay</p>
      </Button>
      <DialogContent
        className="h-[90vh] max-w-2xl"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-ellipsis line-clamp-2 pt-1">
            Ứng tuyển Nhân Viên Kế Toán Tổng Hợp (Nữ, Tối Thiểu Trên 1 Năm Kinh
            Nghiệm) - Tại Hoàng Mai, HN (Lương 11 - 16 Triệu, Nghỉ Thứ 7 + CN)
          </DialogTitle>
        </DialogHeader>
        <AlertDialogCompoent
          openAlert={openAlert}
          setOpenAlert={setOpenAlert}
        />
        <Form {...form}>
          <form
            id="application-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div className="h-4/5">
              <ScrollArea className="h-[55vh] w-full">
                <div className="flex items-center gap-2 pb-2">
                  <FolderUp className="text-secondaryColor pb-1" />
                  <p className="font-semibold">Chọn CV để ứng tuyển</p>
                </div>

                <DropzoneComponent
                  form={form}
                  files={files}
                  setFiles={setFiles}
                />
                <div className=" px-4">
                  <div className="flex items-center gap-2 mt-4 ">
                    <Feather className="text-secondaryColor text-[22px]" />
                    <p className="text-base font-semibold">Thư giới thiệu</p>
                  </div>
                  <span className="text-sm text-gray-500 mt-2 text-ellipsis line-clamp-2 mb-2">
                    Một thư giới thiệu ngắn gọn, chỉn chu sẽ giúp bạn trở nên
                    chuyên nghiệp và gây ấn tượng hơn với nhà tuyển dụng.
                  </span>
                  <FormFieldComponent
                    icon={null}
                    control={form.control}
                    name="decription"
                  >
                    {(field) => (
                      <Textarea
                        className="pt-2 placeholder:text-sm placeholder:leading-5"
                        placeholder="Viết giới thiệu ngắn gọn về bản thân (điểm mạnh, điểm yếu) và nêu rõ mong muốn, lý do bạn muốn ứng tuyển cho vị trí này."
                        {...field}
                      />
                    )}
                  </FormFieldComponent>
                </div>
              </ScrollArea>
            </div>
          </form>
        </Form>
        <DialogFooter className="flex gap-2">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Hủy
            </Button>
          </DialogClose>
          <Button
            type="submit"
            className="w-full"
            form="application-form"
            disabled={isLoading}
          >
            {isLoading ? "Đang xử lý..." : "Nộp Hồ sơ ứng tuyển"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationDialogComponent;
