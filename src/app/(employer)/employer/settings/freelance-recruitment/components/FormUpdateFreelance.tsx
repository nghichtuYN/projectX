"use client";
import { useEffect, useState } from "react";
import { FreelanceFormValues, freelanceSchema } from "./FormCreateFreelance";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useMutationHook } from "@/hooks/useMutationHook";
import { updateFreelace } from "@/services/freelance";
import FormFreelance from "./FormFreelance";
import { getAFreelance } from "@/queries/queries";

const FormUpdateFreelance = () => {
  const [frontIdCard, setFrontIdCard] = useState<File[]>([]);
  const [backIdCard, setBackIdCard] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { data: freelance } = getAFreelance();
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
    (data: FormData) => updateFreelace(data),
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
  useEffect(() => {
    if (freelance) {
      form.reset({
        frontIdCard: freelance?.freelanceRecruiter?.frontIdCard?.name || "",
        backIdCard: freelance?.freelanceRecruiter?.backIdCard?.name || "",
      });
    }
  }, [freelance, form]);
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

export default FormUpdateFreelance;
