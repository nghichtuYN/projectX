"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import TittleComponent from "./TittleComponent";
import AddressComponent from "./AddressComponent";
import EducationLevelComponent from "./EducationLevelComponent";
import JobTypeComponent from "./JobTypes/JobTypesComponent";
import JobLevelComponent from "./JobLevels/JobLevelsComponent";
import ContractTypeComponent from "./ContractType/ContractsTypeComponent";
import SkillComponent from "./Skill/SkillsComponent";
import SalaryComponent from "./SalaryComponent";
import DescriptionComponent from "./DescriptionComponent";
import ExperienceComponent from "./ExperienceComponent";
import JDComponent from "./JDComponent";
import MajorsComponent from "./Major/MajorsComponent";
import LocationsComponent from "./Location/LocationsComponent";

// Zod schema for validation
const jobSchema = z.object({
  title: z.string().min(1, "Tiêu đề tin là bắt buộc"),
  description: z.string().min(1, "Mô tả là bắt buộc"),
  majorId: z.string().min(1, "Chuyên ngành là bắt buộc"),
  locationId: z.string().min(1, "Thành phố là bắt buộc"),
  schoolLevel: z.number().min(0, "Trình độ học vấn là bắt buộc"),
  officeAddress: z.string().min(1, "Địa chỉ văn phòng là bắt buộc"),
  minSalary: z.number().min(0, "Mức lương tối thiểu phải là số dương"),
  maxSalary: z.number().min(0, "Mức lương tối đa phải là số dương"),
  minYearOfExperience: z.number().min(0, "Kinh nghiệm phải là số dương"),
  skills: z.array(z.string()).min(1, "Phải có ít nhất một kỹ năng"),
  jobTypes: z.array(z.string()).min(1, "Phải có ít nhất một loại công việc"),
  jobLevels: z
    .array(z.string())
    .min(1, "Phải có ít nhất một chức vụ công việc"),
  contractTypes: z
    .array(z.string())
    .min(1, "Phải có ít nhất một loại hợp đồng"),
});

// Type definition
export type JobFormValues = z.infer<typeof jobSchema>;

// Options for multi-select fields (translated)

const FormCreateJobComponent = () => {
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: "",
      description: "",
      majorId: "",
      locationId: "",
      schoolLevel: -1,
      officeAddress: "",
      minSalary: 0,
      maxSalary: 0,
      minYearOfExperience: 0,
      skills: [],
      jobTypes: [],
      jobLevels: [],
      contractTypes: [],
    },
  });

  const onSubmit = (values: z.infer<typeof jobSchema>) => {
    console.log("run")
    console.log(values);
  };
  const onError = (errors: any) => {
    console.log("Form validation errors:", errors);
  };
  // Multi-select handlers
  const addItem = (field: keyof JobFormValues, value: string) => {
    const current = form.getValues(field) as string[];
    if (value && !current.includes(value)) {
      form.setValue(field, [...current, value]);
    }
  };

  const removeItem = (field: keyof JobFormValues, value: string) => {
    const current = form.getValues(field) as string[];
    form.setValue(
      field,
      current.filter((item) => item !== value)
    );
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit,onError)}
        className="grid grid-cols-2 gap-3"
      >
        <div className="flex flex-col gap-3">
          <TittleComponent form={form} />
          <AddressComponent form={form} />
          <DescriptionComponent form={form} />
          <JDComponent form={form} />
        </div>

        <div className=" grid grid-cols-2 gap-3">
          <LocationsComponent form={form} />

          <MajorsComponent form={form} />

          <JobTypeComponent
            form={form}
            addItem={addItem}
            removeItem={removeItem}
          />
          <JobLevelComponent
            form={form}
            addItem={addItem}
            removeItem={removeItem}
          />
          <SkillComponent
            form={form}
            addItem={addItem}
            removeItem={removeItem}
          />
          <ContractTypeComponent
            form={form}
            addItem={addItem}
            removeItem={removeItem}
          />
          <EducationLevelComponent form={form} />
          <ExperienceComponent form={form} />
          <div className="col-span-2">
            <SalaryComponent form={form} />
          </div>
        </div>

        <Button type="submit">Tạo công việc</Button>
      </form>
    </Form>
  );
};

export default FormCreateJobComponent;
