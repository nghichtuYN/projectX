'use client'
import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LucideIcon, Pencil } from "lucide-react";
import { getDetailContractType } from "@/queries/queries";
import { toast } from "sonner";
import { useMutationHook } from "@/hooks/useMutationHook";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { FormContractTypeValues, formSchema } from "./DialogAddContractType";
import FormContractType from "./FormContractType";
import { ListContractTypes } from "@/types/ContractType";
import { updateContractType } from "@/services/contractType";
type Props = {
  id: string;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<ListContractTypes, Error>>;
};
const DialogEditContractType = ({ id, refetch }: Props) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<FormContractTypeValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  const { data } = getDetailContractType(id, open);
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
      return updateContractType(id, rest);
    },
    (data) => {
      toast.success("Cập nhật hình thức thành công");
      setOpen(false);
      form.reset({
        name: "",
      });
      refetch();
    },
    (error) => {
      toast.error("Cập nhật hình thức thất bại");
    }
  );
  const onSubmit = (values: FormContractTypeValues) => {
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
    <FormContractType
      open={open}
      setOpen={setOpen}
      form={form}
      onSubmit={onSubmit}
      isLoading={isLoading}
      title="Cập nhật hình thức"
      description="Cập nhật hình thức để sử dụng trong hệ thống"
      IconTrigger={Pencil}
      contentButton="Cập nhật"
      contentLoading="Đang tiến hành"
      colorIconTrigger="text-yellow-500"
      triggerContent={triggerContent}
    />
  );
};

export default DialogEditContractType;
