"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";

import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useMutationHook } from "@/hooks/useMutationHook";
import { createJob } from "@/services/jobs";
import FormJob from "./FormJob";

// Zod schema for validation
export const jobSchema = z
  .object({
    Title: z.string().nonempty("Tiêu đề tin là bắt buộc"),
    Description: z.string().min(1, "Mô tả là bắt buộc"),
    majorId: z.string().min(1, "Chuyên ngành là bắt buộc"),
    LocationId: z.string().nonempty("Thành phố là bắt buộc"),
    educationLevelRequire: z.string().nonempty("Trình độ học vấn là bắt buộc"),
    OfficeAddress: z.string().min(1, "Địa chỉ văn phòng là bắt buộc"),
    minSalary: z.number().min(0, "Mức lương tối thiểu phải là số dương"),
    maxSalary: z.number().min(0, "Mức lương tối đa phải là số dương"),
    yearOfExperience: z.number().min(0, "Kinh nghiệm phải là số dương"),
    skills: z.array(z.string()).nonempty("Phải có ít nhất một kỹ năng"),
    jobTypes: z
      .array(z.string())
      .nonempty("Phải có ít nhất một loại công việc"),
    jobLevels: z
      .array(z.string())
      .min(1, "Phải có ít nhất một chức vụ công việc"),
    contractTypes: z
      .array(z.string())
      .min(1, "Phải có ít nhất một loại hợp đồng"),
    quantity: z.number().min(1, "Số lượng không được để trống"),
    start: z
      .date({
        required_error: "Ngày bắt đầu không được để trống",
        invalid_type_error: "Ngày bắt đầu không hợp lệ",
      })
      .refine((val) => val !== undefined, {
        message: "Ngày bắt đầu không được để trống",
      }),
    end: z
      .date({
        required_error: "Ngày kết thúc không được để trống",
        invalid_type_error: "Ngày kết thúc không hợp lệ",
      })
      .refine((val) => val !== undefined, {
        message: "Ngày kết thúc không được để trống",
      }),
    serviceIds: z.array(z.string()).optional(),
    paymentMethod: z.string().optional(),
    gateway: z.string().optional(),
  })
  .refine(
    (data) => {
      if (
        data.serviceIds &&
        data.serviceIds.length > 0 &&
        !data.paymentMethod
      ) {
        return false;
      }
      return true;
    },
    {
      message: "Phương thức thanh toán là bắt buộc khi chọn dịch vụ",
      path: ["method"],
    }
  )
  .refine(
    (data) => {
      if (data.paymentMethod === "1" && !data.gateway) {
        return false;
      }
      return true;
    },
    {
      message: "Cổng thanh toán là bắt buộc khi chọn phương thức tiền mặt",
      path: ["gateway"],
    }
  )
  .refine((data) => data.start && data.end && data.start <= data.end, {
    message: "Ngày kết thúc phải sau ngày bắt đầu",
    path: ["end"],
  });

export type JobFormValues = z.infer<typeof jobSchema>;

const FormCreateJobComponent = () => {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const router = useRouter();
  if (!id) {
    throw new Error("Campaign ID is required");
  }
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      Title: "",
      Description: "",
      majorId: "",
      LocationId: "",
      educationLevelRequire: "",
      OfficeAddress: "",
      minSalary: 0,
      maxSalary: 0,
      yearOfExperience: 0,
      skills: [],
      jobTypes: [],
      jobLevels: [],
      contractTypes: [],
      quantity: 0,
      serviceIds: [],
      paymentMethod: "0",
      gateway: "0",
    },
  });
  const onSucces = (data: any) => {
    toast.success("Tạo tin thành công");
    if (form.getValues("paymentMethod") === "0")
      router.push(`/employer/recruitment-campaigns/${id}`, { scroll: false });
    else(
      router.push(`/employer/order/${data?.orderId}?type=job`)
    )
  };
  const onError = (errors: any) => {
    console.log(errors);
  };
  const mutationPost = useMutationHook(createJob, onSucces, onError);
  const onSubmit = (values: z.infer<typeof jobSchema>) => {
    const formData = new FormData();
    formData.append("CampaignId", id);
    formData.append("Title", values.Title);
    formData.append("Description", values.Description);
    formData.append("majorId", values.majorId);
    formData.append("LocationId", values.LocationId);
    formData.append(
      "educationLevelRequire",
      values.educationLevelRequire.toString()
    );
    formData.append("OfficeAddress", values.OfficeAddress);
    formData.append("minSalary", values.minSalary.toString());
    formData.append("maxSalary", values.maxSalary.toString());
    formData.append("yearOfExperience", values.yearOfExperience.toString());
    formData.append("quantity", values.quantity.toString());
    values.skills.forEach((skill) => formData.append("skills[]", skill));
    values.jobTypes.forEach((jobType) =>
      formData.append("jobTypes[]", jobType)
    );
    values.jobLevels.forEach((jobLevel) =>
      formData.append("jobLevels[]", jobLevel)
    );
    values.contractTypes.forEach((contractType) =>
      formData.append("contractTypes[]", contractType)
    );
    if (values.serviceIds) {
      values.serviceIds.forEach((service) =>
        formData.append("serviceIds[]", service)
      );
    }
    formData.append("StartDate", values.start.toISOString());
    formData.append("EndDate", values.end.toISOString());

    if (
      values.serviceIds &&
      values.serviceIds.length > 0 &&
      values.paymentMethod
    ) {
      formData.append("paymentMethod", values.paymentMethod);
      if (values.paymentMethod === "1" && values.gateway) {
        formData.append("gateway", values.gateway);
      }
    }
    mutationPost.mutate(formData);
  };

  const removeItem = (field: keyof JobFormValues, value: string) => {
    const current = form.getValues(field) as string[];
    form.setValue(
      field,
      current.filter((item) => item !== value)
    );
  };
  return (
    <FormJob
      removeItem={removeItem}
      onSubmit={onSubmit}
      form={form}
      mutation={mutationPost}
      title={" Tạo Tin Tuyển Dụng Mới"}
      content="Tạo tin"
    />
  );
};

export default FormCreateJobComponent;
