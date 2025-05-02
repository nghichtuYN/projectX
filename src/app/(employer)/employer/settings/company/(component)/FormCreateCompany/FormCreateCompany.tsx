"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useMutationHook } from "@/hooks/useMutationHook";
import { BusinessVerify } from "@/services/company";
import FormCompany from "./FormCompany";
export const companySchema = z.object({
  companyName: z.string().min(1, "Tên công ty không được để trống"),
  taxCode: z.string().min(1, "Mã số thuế không được để trống"),
  shortName: z.string().min(1, "Tên chi nhánh là bắt buộc"),
  website: z.string(),
  headQuarterAddress: z.string().min(1, "Địa chỉ không được để trống"),
  logo: z.string(),
  contactEmail: z
    .string()
    .nonempty("Email không được để trống")
    .email("Email không hợp lệ"),
  foundedYear: z.string().min(1, "Địa chỉ văn phòng là bắt buộc"),
  size: z.string().nonempty("Quy mô không được để trống"),
  introduction: z.string(),
  LocationId: z.string().nonempty("Thành phố không được để trống"),
  major: z.array(z.string()).min(1, "Phải có ít nhất một kỹ năng"),
  RegistrationFile: z
    .string()
    .nonempty("Giấy phép kinh doanh không được để trống"),
  contactPhone: z
    .string()
    .regex(/^[0-9]{10,11}$/, "Số điện thoại không hợp lệ"),
});
export type CompanyFormValues = z.infer<typeof companySchema>;
const FormCreateCompany = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [logoImage, setLogoImage] = useState<File[]>([]);
  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      companyName: "",
      taxCode: "",
      shortName: "",
      website: "",
      headQuarterAddress: "",
      logo: "",
      contactEmail: "",
      contactPhone: "",
      foundedYear: "",
      size: "",
      introduction: "",
      LocationId: "",
      major: [],
      RegistrationFile: "",
    },
  });
  const onSuccess = (data: any) => {
    toast.success("Cập nhật tin thành công");
  };
  const onError = (errors: any) => {
    console.log(errors);
  };
  const mutation = useMutationHook(
    (data: FormData) => BusinessVerify(data),
    onSuccess,
    onError
  );
  const onSubmit = (values: z.infer<typeof companySchema>) => {
    console.log(values);
    const formData = new FormData();
    formData.append("companyName", values.companyName);
    formData.append("taxCode", values.taxCode);
    formData.append("shortName", values.shortName);
    formData.append("LocationId", values.LocationId);
    formData.append("website", values.website);
    formData.append("headQuarterAddress", values.headQuarterAddress);
    formData.append("contactEmail", values.contactEmail);
    formData.append("contactPhone", values.contactPhone);
    formData.append("foundedYear", values.foundedYear);
    formData.append("size", values.size);
    formData.append("introduction", values.introduction);
    formData.append("businessVerified", "true");
    values.major.forEach((major) => formData.append("majorIds[]", major));
    if (logoImage && logoImage.length > 0) {
      formData.append("logo", logoImage[0]);
    }
    if (files && files.length > 0) {
      files.forEach((file) => {
        formData.append("RegistrationFile", file);
      });
    } else if (values.RegistrationFile) {
      formData.append("RegistrationFile", values.RegistrationFile);
    }
    mutation.mutate(formData);
  };
  const removeItem = (field: keyof CompanyFormValues, value: string) => {
    const current = form.getValues(field) as string[];

    form.setValue(
      field,
      current.filter((item) => item !== value)
    );
  };
  return (
    <FormCompany
      form={form}
      files={files}
      onSubmit={onSubmit}
      setFiles={setFiles}
      setLogoImage={setLogoImage}
      removeItem={removeItem}
    />
  );
};

export default FormCreateCompany;
