"use client";
import { Button } from "@/components/ui/button";
import { useMutationHook } from "@/hooks/useMutationHook";
import { cn } from "@/lib/utils";
import { createLevel } from "@/services/jobLevels";
import { ListJobLevel } from "@/types/JobLevelType";
import { zodResolver } from "@hookform/resolvers/zod";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { LucideIcon, PlusCircle } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import FormJobLevel from "./FormJobLevel";
type Props = {
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<ListJobLevel, Error>>;
};
export const formSchema = z.object({
  name: z.string().nonempty("Tên chức vụ không được để trống").min(2, {
    message: "Tên chức vụ tối thiểu 2 ký tự",
  }),
});
export type FormJobLevelValues = z.infer<typeof formSchema>;

const DialogAddJobLevel = ({ refetch }: Props) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<FormJobLevelValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  const mutationCreateJobLevel = useMutationHook(
    (data: { name: string }) => createLevel(data),
    (data) => {
      toast.success("Tạo chức vụ công việc thành công");
      setOpen(false);
      form.reset();
      setIsLoading(false);
      refetch();
    },
    (error) => {
      toast.error("Tạo chức vụ công việc thất bại");
      setIsLoading(false);
    }
  );
  const onSubmit = (values: FormJobLevelValues) => {
    setIsLoading(true);
    mutationCreateJobLevel.mutate(values);
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
    <FormJobLevel
      open={open}
      setOpen={setOpen}
      form={form}
      onSubmit={onSubmit}
      isLoading={isLoading}
      title="Tạo chức vụ"
      description="Tạo chức vụ mới để sử dụng trong hệ thống"
      contentTrigger="Tạo chức vụ"
      IconTrigger={PlusCircle}
      contentButton="Tạo"
      contentLoading="Đang tiến hành"
      triggerContent={triggerContent}
    />
  );
};

export default DialogAddJobLevel;
