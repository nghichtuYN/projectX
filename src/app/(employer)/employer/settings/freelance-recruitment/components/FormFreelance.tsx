"use client";
import { Form } from "@/components/ui/form";
import { useMutationHook } from "@/hooks/useMutationHook";
import { creatFreelanceRecruitment } from "@/services/freelance";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import FrontIdCard from "./FrontIdCard";
import BackIdCard from "./BackIdCard";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
export const freelanceSchema = z.object({
  frontIdCard: z.string().nonempty("Vui lòng chọn ảnh mặt trước CMND/CCCD"),
  backIdCard: z.string().nonempty("Vui lòng chọn ảnh mặt sau CMND/CCCD"),
});
export type FreelanceFormValues = z.infer<typeof freelanceSchema>;

const FormFreelance = () => {
  const [frontIdCard, setFrontIdCard] = useState<File[]>([]);
  const [backIdCard, setBackIdCard] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<FreelanceFormValues>({
    resolver: zodResolver(freelanceSchema),
    defaultValues: {
      frontIdCard: "",
      backIdCard: "",
    },
  });

  const onSuccess = (data: any) => {
    setIsLoading(false);
    
    toast.success("Cập nhật tin thành công");
  };
  const onError = (errors: any) => {
    console.log(errors);
  };
  const mutation = useMutationHook(
    (data: FormData) => creatFreelanceRecruitment(data),
    onSuccess,
    onError
  );
  const onSubmit = (values: FreelanceFormValues) => {
    setIsLoading(true);
    console.log(values);
    const formData = new FormData();

    if (frontIdCard && frontIdCard.length > 0) {
      formData.append("frontIdCard", frontIdCard[0]);
    }
    if (backIdCard && backIdCard.length > 0) {
      formData.append("backIdCard", backIdCard[0]);
    }
    mutation.mutate(formData);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 border p-2"
      >
        <FrontIdCard
          form={form}
          files={frontIdCard}
          setFiles={setFrontIdCard}
        />
        <BackIdCard form={form} files={backIdCard} setFiles={setBackIdCard} />
        <Button type="submit" className="w-full " disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Đang lưu
            </>
          ) : (
            "Lưu"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default FormFreelance;
