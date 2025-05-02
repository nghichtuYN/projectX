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
import FormFreelance from "./FormFreelance";
export const freelanceSchema = z.object({
  frontIdCard: z.string().nonempty("Vui lòng chọn ảnh mặt trước CMND/CCCD"),
  backIdCard: z.string().nonempty("Vui lòng chọn ảnh mặt sau CMND/CCCD"),
});
export type FreelanceFormValues = z.infer<typeof freelanceSchema>;

const FormCreateFreelance = () => {
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
    <FormFreelance
      form={form}
      onSubmit={onSubmit}
      isLoading={isLoading}
      frontIdCard={frontIdCard}
      setFrontIdCard={setFrontIdCard}
      backIdCard={backIdCard}
      setBackIdCard={setBackIdCard}
    />
  );
};

export default FormCreateFreelance;
