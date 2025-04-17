"use client";
import React from "react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutationHook } from "@/hooks/useMutationHook";
import { toast } from "sonner";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { LucideIcon, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import FormMajor from "./FormMajor";
import { createMajor } from "@/services/majors";
import { ListMajors } from "@/types/majors";
type Props = {
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<ListMajors, Error>>;
};
export const formSchema = z.object({
  name: z
    .string()
    .nonempty("Tên lĩnh vực công việc không được để trống")
    .min(2, {
      message: "Tên lĩnh vực công việc tối thiểu 2 ký tự",
    }),
});
export type FormMajorValues = z.infer<typeof formSchema>;
const DialogAddMajor = ({ refetch }: Props) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<FormMajorValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  const mutationCreateMajor = useMutationHook(
    (data: { name: string }) => createMajor(data),
    (data) => {
      toast.success("Tạo lĩnh vực công việc thành công");
      setOpen(false);
      form.reset();
      setIsLoading(false);
      refetch();
    },
    (error) => {
      toast.error("Tạo lĩnh vực công việc thất bại");
      setIsLoading(false);
    }
  );
  const onSubmit = (values: FormMajorValues) => {
    setIsLoading(true);
    mutationCreateMajor.mutate(values);
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
    <FormMajor
      open={open}
      setOpen={setOpen}
      form={form}
      onSubmit={onSubmit}
      isLoading={isLoading}
      title="Tạo lĩnh vực công việc"
      description="Tạo lĩnh vực công việc mới để sử dụng trong hệ thống"
      contentTrigger="Tạo lĩnh vực công việc"
      IconTrigger={PlusCircle}
      contentButton="Tạo"
      contentLoading="Đang tiến hành"
      triggerContent={triggerContent}
    />
  );
};

export default DialogAddMajor;
