'use client'
import React from "react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutationHook } from "@/hooks/useMutationHook";
import { createJobType } from "@/services/jobTypes";
import { toast } from "sonner";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { ListJobType } from "@/types/JobType";
import FormJobType from "./FormJobType";
import { LucideIcon, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
type Props = {
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<ListJobType, Error>>;
};
export const formSchema = z.object({
  name: z
    .string()
    .nonempty("Tên loại hình làm việc không được để trống")
    .min(2, {
      message: "Tên loại hình làm việc tối thiểu 2 ký tự",
    }),
});
export type FormJobTypeValues = z.infer<typeof formSchema>;
const DialogAddJobType = ({ refetch }: Props) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<FormJobTypeValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  const mutationCreateJobType = useMutationHook(
    (data: { name: string }) => createJobType(data),
    (data) => {
      toast.success("Tạo loại hình công việc thành công");
      setOpen(false);
      form.reset();
      setIsLoading(false);
      refetch();
    },
    (error) => {
      toast.error("Tạo loại hình công việc thất bại");
      setIsLoading(false);
    }
  );
  const onSubmit = (values: FormJobTypeValues) => {
    setIsLoading(true);
    mutationCreateJobType.mutate(values);
  };
  const triggerContent = (
    IconTrigger: LucideIcon,
    contentTrigger?: string,
    colorIconTrigger?: string
  ) => {
    return (
      <Button className="gap-2">
        <IconTrigger className={(cn("h-4 w-4"), colorIconTrigger)} />
        {contentTrigger ? contentTrigger : null}
      </Button>
    );
  };
  return (
    <FormJobType
      open={open}
      setOpen={setOpen}
      form={form}
      onSubmit={onSubmit}
      isLoading={isLoading}
      title="Tạo loại hình công việc"
      description="Tạo loại hình công việc mới để sử dụng trong hệ thống"
      contentTrigger="Tạo loại hình công việc"
      IconTrigger={PlusCircle}
      contentButton="Tạo"
      contentLoading="Đang tiến hành"
      triggerContent={triggerContent}
    />
  );
};

export default DialogAddJobType;
