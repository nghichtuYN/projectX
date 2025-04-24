import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormReason from "./FormReason";
import { CircleX, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
export const formSchema = z.object({
  reason: z.string().nonempty("Lý do không được để trống").min(2, {
    message: "Lý do tối thiểu 2 ký tự",
  }),
});
export type FormReasonValues = z.infer<typeof formSchema>;
type Props = {
  id: string;
  handleReject: (id: string, reason: string) => void;
};
const DialogReject = ({ id, handleReject }: Props) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<FormReasonValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reason: "",
    },
  });
  const onSubmit = (values: FormReasonValues) => {
    setIsLoading(true);
    handleReject(id, values.reason);
    setIsLoading(false);
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
    <FormReason
      open={open}
      setOpen={setOpen}
      form={form}
      onSubmit={onSubmit}
      isLoading={isLoading}
      title="Nguyên nhân từ chối"
      description="Nêu rõ nguyên nhân từ chối để công ty có thể cập nhật lại thông tin"
      IconTrigger={CircleX}
      contentButton="Cập nhật"
      contentLoading="Đang tiến hành"
      colorIconTrigger="text-red-500"
      triggerContent={triggerContent}
    />
  );
};

export default DialogReject;
