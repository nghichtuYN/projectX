'use client'
import { Button } from "@/components/ui/button";
import { useMutationHook } from "@/hooks/useMutationHook";
import { cn } from "@/lib/utils";
import { createContractType } from "@/services/contractType";
import { ListContractTypes } from "@/types/ContractType";
import { zodResolver } from "@hookform/resolvers/zod";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { LucideIcon, PlusCircle } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import FormContractType from "./FormContractType";
type Props = {
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<ListContractTypes, Error>>;
};
export const formSchema = z.object({
  name: z.string().nonempty("Tên hợp đồng không được để trống").min(2, {
    message: "Tên hợp đồng tối thiểu 2 ký tự",
  }),
});
export type FormContractTypeValues = z.infer<typeof formSchema>;
const DialogAddContractType = ({ refetch }: Props) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<FormContractTypeValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  const mutationCreateJobType = useMutationHook(
    (data: { name: string }) => createContractType(data),
    (data) => {
      toast.success("Tạo hợp đồng thành công");
      setOpen(false);
      form.reset();
      setIsLoading(false);
      refetch();
    },
    (error) => {
      toast.error("Tạo hợp đồng thất bại");
      setIsLoading(false);
    }
  );
  const onSubmit = (values: FormContractTypeValues) => {
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
    <FormContractType
      open={open}
      setOpen={setOpen}
      form={form}
      onSubmit={onSubmit}
      isLoading={isLoading}
      title="Tạo hợp đồng"
      description="Tạo hợp đồng mới để sử dụng trong hệ thống"
      contentTrigger="Tạo hợp đồng"
      IconTrigger={PlusCircle}
      contentButton="Tạo"
      contentLoading="Đang tiến hành"
      triggerContent={triggerContent}
    />
  );
};

export default DialogAddContractType;
