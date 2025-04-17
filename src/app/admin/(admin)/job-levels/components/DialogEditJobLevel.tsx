"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LucideIcon, Pencil } from "lucide-react";
import { toast } from "sonner";
import { useMutationHook } from "@/hooks/useMutationHook";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { ListContractTypes } from "@/types/ContractType";
import { FormContractTypeValues } from "../../contract-type/components/DialogAddContractType";
import { formSchema } from "./DialogAddJobLevel";
import FormContractType from "../../contract-type/components/FormContractType";
import { getDetailJobLevel } from "@/queries/queries";
import { updateLevel } from "@/services/jobLevels";
type Props = {
  id: string;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<ListContractTypes, Error>>;
};
const DialogEditJobLevel = ({ id, refetch }: Props) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<FormContractTypeValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      
    },
  });
  const { data } = getDetailJobLevel(id, open);
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
      return updateLevel(id, rest);
    },
    (data) => {
      toast.success("Cập nhật hợp đồng thành công");
      setOpen(false);
      form.reset({
        name: "",
      });
      refetch();
    },
    (error) => {
      toast.error("Cập nhật hợp đồng thất bại");
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
      title="Cập nhật chức vụ"
      description="Cập nhật chức vụ để sử dụng trong hệ thống"
      IconTrigger={Pencil}
      contentButton="Cập nhật"
      contentLoading="Đang tiến hành"
      colorIconTrigger="text-yellow-500"
      triggerContent={triggerContent}
    />
  );
};

export default DialogEditJobLevel;
