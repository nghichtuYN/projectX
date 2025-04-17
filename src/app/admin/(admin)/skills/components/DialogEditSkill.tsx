"use client";
import { ListSkills } from "@/types/skills";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { formSchema, FormSkillsValues } from "./DialogAddSkill";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutationHook } from "@/hooks/useMutationHook";
import { updateSkill } from "@/services/skills";
import { toast } from "sonner";
import { LucideIcon, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { getDetailSkill } from "@/queries/queries";
import FormSkill from "./FormSkill";
type Props = {
  id: string;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<ListSkills, Error>>;
};
const DialogEditSkill = ({ id, refetch }: Props) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<FormSkillsValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const { data } = getDetailSkill(id, open);
  useEffect(() => {
    if (data) {
      form.reset({
        name: data.name || "",
        description: data.description || "",
      });
    }
  }, [data, form]);
  const mutationUpdateSkill = useMutationHook(
    (data: { id: string; name: string; description: string }) => {
      const { id, ...rest } = data;
      return updateSkill(id, rest);
    },
    (data) => {
      toast.success("Cập nhật kỹ năng thành công");
      setOpen(false);
      form.reset({
        name: "",
        description: "",
      });
      refetch();
    },
    (error) => {
      toast.error("Cập nhật kỹ năng thất bại");
    }
  );
  const onSubmit = (values: FormSkillsValues) => {
    setIsLoading(true);
    mutationUpdateSkill.mutate({ id, ...values });
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
    <FormSkill
      open={open}
      setOpen={setOpen}
      form={form}
      onSubmit={onSubmit}
      isLoading={isLoading}
      title="Cập nhật kỹ năng"
      description="Cập nhật kỹ năng để sử dụng trong hệ thống"
      IconTrigger={Pencil}
      contentButton="Cập nhật"
      contentLoading="Đang tiến hành"
      colorIconTrigger="text-yellow-500"
      triggerContent={triggerContent}
    />
  );
};

export default DialogEditSkill;
