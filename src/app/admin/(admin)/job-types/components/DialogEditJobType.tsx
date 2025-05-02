"use client";
import React, { useEffect, useState } from "react";
import FormJobType from "./FormJobType";
import { FormJobTypeValues, formSchema } from "./DialogAddJobType";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LucideIcon, Pencil } from "lucide-react";
import { getDetailJobType } from "@/queries/queries";
import { updateJobType } from "@/services/jobTypes";
import { toast } from "sonner";
import { useMutationHook } from "@/hooks/useMutationHook";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { ListJobType } from "@/types/JobType";
import { cn } from "@/lib/utils";
type Props = {
  id: string;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<ListJobType, Error>>;
};
const DialogEditJobType = ({ id, refetch }: Props) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<FormJobTypeValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  const { data } = getDetailJobType(id, open);
  useEffect(() => {
    if (data) {
      form.reset({
        name: data.name || "",
      });
    }
  }, [data, form]);
  const mutationUpdateJobType = useMutationHook(
    (data: { id: string; name: string }) => {
      const { id, ...rest } = data;
      return updateJobType(id, rest);
    },
    (data) => {
      toast.success("Cập nhật loại hình công việc thành công");
      setOpen(false);
      form.reset({
        name: "",
      });
      refetch();
    },
    (error) => {
      toast.error("Cập nhật loại hình công việc thất bại");
    }
  );
  const onSubmit = (values: FormJobTypeValues) => {
    setIsLoading(true);
    mutationUpdateJobType.mutate({ id, ...values });
  };
  const triggerContent = (
    IconTrigger: LucideIcon,
    contentTrigger?: string,
    colorIconTrigger?: string
  ) => {
    return (
      <div>
        <IconTrigger className={cn("h-5 w-5", colorIconTrigger)} />
        {contentTrigger ? contentTrigger : null}
      </div>
    );
  };
  return (
    <FormJobType
      open={open}
      setOpen={setOpen}
      form={form}
      onSubmit={onSubmit}
      isLoading={isLoading}
      title="Cập nhật loại hình công việc"
      description="Cập nhật loại hình công việc để sử dụng trong hệ thống"
      IconTrigger={Pencil}
      contentButton="Cập nhật"
      contentLoading="Đang tiến hành"
      colorIconTrigger="text-yellow-500"
      triggerContent={triggerContent}
    />
  );
};

export default DialogEditJobType;
