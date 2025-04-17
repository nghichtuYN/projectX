"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LucideIcon, Pencil } from "lucide-react";
import { toast } from "sonner";
import { useMutationHook } from "@/hooks/useMutationHook";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { ListMajors } from "@/types/majors";
import { FormMajorValues, formSchema } from "./DialogAddMajor";
import FormMajor from "./FormMajor";
import { getDetailMajors } from "@/queries/queries";
import { updateMajor } from "@/services/majors";
type Props = {
  id: string;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<ListMajors, Error>>;
};
const DialogEditMajor = ({ id, refetch }: Props) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<FormMajorValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  const { data } = getDetailMajors(id, open);
  useEffect(() => {
    if (data) {
      form.reset({
        name: data.name || "",
      });
    }
  }, [data, form]);
  const mutationUpdateMajor = useMutationHook(
    (data: { id: string; name: string }) => {
      const { id, ...rest } = data;
      return updateMajor(id, rest);
    },
    (data) => {
      toast.success("Cập nhật lĩnh vực công việc thành công");
      setOpen(false);
      form.reset({
        name: "",
      });
      refetch();
    },
    (error) => {
      toast.error("Cập nhật lĩnh vực công việc thất bại");
    }
  );
  const onSubmit = (values: FormMajorValues) => {
    setIsLoading(true);
    mutationUpdateMajor.mutate({ id, ...values });
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
    <FormMajor
      open={open}
      setOpen={setOpen}
      form={form}
      onSubmit={onSubmit}
      isLoading={isLoading}
      title="Cập nhật lĩnh vực công việc"
      description="Cập nhật lĩnh vực công việc để sử dụng trong hệ thống"
      IconTrigger={Pencil}
      contentButton="Cập nhật"
      contentLoading="Đang tiến hành"
      colorIconTrigger="text-yellow-500"
      triggerContent={triggerContent}
    />
  );
};

export default DialogEditMajor;
