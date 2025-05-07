"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMutationHook } from "@/hooks/useMutationHook";
import { zodResolver } from "@hookform/resolvers/zod";
import { FolderPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { createCampaign } from "@/services/campaign";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import FormCampaign from "./FormCampaign";

// Cập nhật schema để thêm trường status
export const formSchema = z.object({
  name: z
    .string()
    .nonempty({ message: "Tên chiến dịch không được để trống" })
    .min(6, { message: "Tên chiến dịch phải có ít nhất 6 ký tự" })
    .max(255, { message: "Tên chiến dịch không được vượt quá 255 ký tự" }),
  description: z
    .string()
    .max(1000, { message: "Mô tả không được vượt quá 1000 ký tự" }),
  status: z.enum(["0", "1", "2"], {
    required_error: "Vui lòng chọn trạng thái chiến dịch",
  }), // Thêm trường status với giá trị "0" (Nháp), "1" (Mở), "2" (Đóng)
});

type Props = {
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<any, Error>>;
};
export type FormCampaignValues = z.infer<typeof formSchema>;
const DialogAddCampaignComponent = ({ refetch }: Props) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<FormCampaignValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      status: "0",
    },
  });

  const errors = form.formState.errors;

  const onSuccess = useCallback(
    (data: any) => {
      toast.success("Tạo chiến dịch thành công 🚀");
      setIsLoading(false);
      form.reset();
      setOpen(false);
      refetch();
    },
    [form, router]
  );

  const onError = useCallback(
    (error: any) => {
      setIsLoading(false);
      const errorMessage =
        error.response?.data?.message || "Có lỗi xảy ra khi tạo chiến dịch";
      toast.error(errorMessage);

      if (error.response?.status === 400) {
        form.setError("name", {
          type: "manual",
          message: errorMessage,
        });
      } else if (error.response?.status === 422) {
        const errors = error.response.data.errors;
        Object.keys(errors).forEach((key) => {
          form.setError(key as any, {
            type: "manual",
            message: errors[key][0],
          });
        });
      }
    },
    [form]
  );

  const mutation = useMutationHook(
    (data: z.infer<typeof formSchema>) =>
      createCampaign({
        ...data,
        status: parseInt(data.status),
      }),
    onSuccess,
    onError
  );

  const onSubmit = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      try {
        setIsLoading(true);
        await mutation.mutateAsync(values);
      } catch (error) {
        setIsLoading(false);
      }
    },
    [mutation]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button onClick={() => setOpen(true)} disabled={isLoading}>
        <FolderPlus className="mr-2" />
        Thêm chiến dịch mới
      </Button>
      <DialogContent className="h-fit max-w-2xl">
        <DialogHeader className="border-b-2 pb-2">
          <DialogTitle className="text-ellipsis line-clamp-2 pt-1 leading-8">
            Tạo chiến dịch tuyển dụng của bạn
          </DialogTitle>
        </DialogHeader>
        
        <FormCampaign
          errors={errors}
          form={form}
          isLoading={isLoading}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};

export default DialogAddCampaignComponent;
