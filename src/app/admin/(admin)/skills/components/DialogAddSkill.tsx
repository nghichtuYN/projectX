"use client";
import { Button } from "@/components/ui/button";
import { useMutationHook } from "@/hooks/useMutationHook";
import { cn } from "@/lib/utils";
import { createSkill } from "@/services/skills";
import { ListSkills } from "@/types/skills";
import { zodResolver } from "@hookform/resolvers/zod";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { LucideIcon, PlusCircle } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import FormSkill from "./FormSkill";
type Props = {
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<ListSkills, Error>>;
};
export const formSchema = z.object({
  name: z.string().nonempty("Tên kỹ năng không được để trống").min(2, {
    message: "Tên kỹ năng tối thiểu 2 ký tự",
  }),
  description: z.string(),
});
export type FormSkillsValues = z.infer<typeof formSchema>;
const DialogAddSkill = ({ refetch }: Props) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<FormSkillsValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const mutationCreateSkill = useMutationHook(
    (data: { name: string; description: string }) => createSkill(data),
    (data) => {
      toast.success("Tạo kỹ năng thành công");
      setOpen(false);
      form.reset();
      setIsLoading(false);
      refetch();
    },
    (error) => {
      toast.error("Tạo kỹ năng thất bại");
      setIsLoading(false);
    }
  );
  const onSubmit = (values: FormSkillsValues) => {
    setIsLoading(true);
    mutationCreateSkill.mutate(values);
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
    <FormSkill
      open={open}
      setOpen={setOpen}
      form={form}
      onSubmit={onSubmit}
      isLoading={isLoading}
      title="Tạo kỹ năng"
      description="Tạo kỹ năng mới để sử dụng trong hệ thống"
      contentTrigger="Tạo kỹ năng"
      IconTrigger={PlusCircle}
      contentButton="Tạo"
      contentLoading="Đang tiến hành"
      triggerContent={triggerContent}
    />
  );
};

export default DialogAddSkill;
