import { getJobByID } from "@/queries/queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  JobFormValues,
  jobSchema,
} from "../../../create_job/(components)/FormCreateJobComponent";
import { toast } from "sonner";
import { z } from "zod";

import { updateJob } from "@/services/jobs";
import { useMutationHook } from "@/hooks/useMutationHook";
import FormJob from "../../../create_job/(components)/FormJob";

const FormEditJob = () => {
  const param = useParams();
  const id = param.id as string;
  const jobId = param.jobid as string;
  if (!id || !jobId) {
    return <div>Missing id or jobId</div>;
  }
  const { data } = getJobByID(jobId);
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
    },
  });
  useEffect(() => {
    if (data) {
      form.reset({
        Title: data.title || "",
        Description: data.description || "",
        majorId: data.major.id || "",
        LocationId: data.location.id || "",
        educationLevelRequire: data.educationLevelRequire.toString() || "",
        OfficeAddress: data.officeAddress || "",
        minSalary: data.minSalary || 0,
        maxSalary: data.maxSalary || 0,
        yearOfExperience: data.yearOfExperience || 0,
        skills: data.skills.map((skill) => skill.id) || [],
        jobTypes: data.jobTypes.map((jobType) => jobType.id) || [],
        jobLevels: data.jobLevels.map((jobLevel) => jobLevel.id) || [],
        contractTypes:
          data.contractTypes.map((contractType) => contractType.id) || [],
        quantity: data.quantity || 0,
      });
    }
  }, [data, form]);
  const errors = form.formState.errors;
  const removeItem = (field: keyof JobFormValues, value: string) => {
    const current = form.getValues(field) as string[];
    form.setValue(
      field,
      current.filter((item) => item !== value)
    );
  };
  const onSuccess = (data: any) => {
    toast.success("Cập nhật tin thành công");
  };
  const onError = (errors: any) => {
    console.log(errors);
  };
  const mutationUpdate = useMutationHook((data: any) => {
    const { id, formData } = data;
    if (id && formData) {
      return updateJob(id, formData);
    }
    return Promise.reject(new Error("ID hoặc formData không hợp lệ"));
  }, onSuccess);
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
    mutationUpdate.mutate({ id: jobId, formData });
  };
  return (
    <FormJob
      content="Lưu"
      title="Chỉnh sửa tin tuyển dụng"
      onSubmit={onSubmit}
      removeItem={removeItem}
      form={form}
      mutation={mutationUpdate}
    />
  );
};

export default FormEditJob;
