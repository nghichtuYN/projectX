"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useMutationHook } from "@/hooks/useMutationHook";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState, useCallback, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { getDetailsCampaign, updateCampaign } from "@/services/campaign";
import { useQueryHook } from "@/hooks/useQueryHook";
import { campaignType } from "@/types/campaign";
import { CampaignContext } from "@/contexts/CampaignContex";
import FormCampaign from "./FormCampaign";
import { FormCampaignValues, formSchema } from "./DialogAddCampaignComponent";

type Props = {
  id: string;
};

const DialogEditCampaignComponent = ({ id }: Props) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const context = useContext(CampaignContext);
  const { refetch } = context;

  const { data } = useQueryHook<campaignType>(
    ["campaign", id],
    () => getDetailsCampaign(id),
    { enabled: !!open }
  );
  const form = useForm<FormCampaignValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      status: "0",
    },
  });

  // Đồng bộ dữ liệu từ API vào form khi data thay đổi
  useEffect(() => {
    if (data) {
      const statusValue =
        data.status === 0
          ? "0"
          : data.status === 1
          ? "1"
          : data.status === 2
          ? "2"
          : "0";
      form.reset({
        name: data.name || "",
        description: data.description || "",
        status: statusValue,
      });
    }
  }, [data, form]);
  const errors = form.formState.errors;

  const onSuccess = useCallback(
    (data: any) => {
      toast.success("Cập nhật chiến dịch thành công 🚀");
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
        error.response?.data?.message ||
        "Có lỗi xảy ra khi cập nhật chiến dịch";
      toast.error(errorMessage);
      console.log(error);
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
    (dataUpdate: FormCampaignValues) =>
      updateCampaign(id, {
        name: dataUpdate?.name,
        description: dataUpdate?.description,
        status: parseInt(dataUpdate.status),
      }),
    onSuccess,
    onError
  );

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    mutation.mutate(values);
  };

  const formatDateForInput = (date: Date | undefined) => {
    return date ? date.toISOString().split("T")[0] : "";
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <span
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
          setOpen(true);
        }}
        className="after:content-['|'] after:ml-0.5 after:text-accent cursor-pointer hover:text-secondaryColor"
      >
        Sửa chiến dịch
      </span>
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

export default DialogEditCampaignComponent;
