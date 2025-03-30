"use client";
import React, { useState } from "react";
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
  description: z.string().min(1, "Mô tả là bắt buộc"),
  majorId: z.string().min(1, " chuyên ngành là bắt buộc"),
  locationId: z.string().min(1, " địa điểm là bắt buộc"),
  position: z.string().min(1, "Vị trí là bắt buộc"),
  schoolLevel: z.enum(["HighSchool", "Bachelor", "Master", "PhD"]),
  status: z.string().min(1, "Trạng thái là bắt buộc"),
  officeAddress: z.string().min(1, "Địa chỉ văn phòng là bắt buộc"),
  minSalary: z.number().min(0, "Mức lương tối thiểu phải là số dương"),
  maxSalary: z.number().min(0, "Mức lương tối đa phải là số dương"),
  minYearOfExperience: z.number().min(0, "Kinh nghiệm phải là số dương"),
  skills: z.array(z.string()).min(1, "Phải có ít nhất một kỹ năng"),
  jobTypes: z.array(z.string()).min(1, "Phải có ít nhất một loại công việc"),
  jobLevels: z.array(z.string()).min(1, "Phải có ít nhất một cấp độ công việc"),
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
      description: "",
      majorId: "",
      locationId: "",
      position: "",
      schoolLevel: "Bachelor",
      status: "",
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

  const [skillInput, setSkillInput] = useState("");

  const onSubmit = (data: JobFormValues) => {
    console.log(data);
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

  const addSkill = () => {
    if (skillInput && !form.getValues("skills").includes(skillInput)) {
      form.setValue("skills", [...form.getValues("skills"), skillInput]);
      setSkillInput("");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-3"
      >
        {/* Title */}
        <TittleComponent form={form} />
        {/* Major */}
        <div className="col-span-1 flex gap-3">
          <div className="w-1/2">
            <MajorsComponent form={form} />
          </div>
          <div className="w-1/2">
            <LocationsComponent form={form} />
          </div>
        </div>
        <AddressComponent form={form} />

        <div className="col-span-1 flex gap-3">
          <div className="w-1/2">
            <JobTypeComponent
              form={form}
              addItem={addItem}
              removeItem={removeItem}
            />
          </div>
          <div className="w-1/2">
            <JobLevelComponent
              form={form}
              addItem={addItem}
              removeItem={removeItem}
            />
          </div>
        </div>
        <DescriptionComponent form={form} />

        <div className="col-span-1 flex gap-3">
          <div className="w-1/2">
            <SkillComponent
              form={form}
              addItem={addItem}
              removeItem={removeItem}
            />
          </div>
          <div className="w-1/2">
            <ContractTypeComponent
              form={form}
              addItem={addItem}
              removeItem={removeItem}
            />
          </div>
        </div>
        <EducationLevelComponent form={form} />

        {/* Location */}
        {/* School Level */}

        {/* Job Types */}

        {/* Job Levels */}

        {/*Contract Types*/}

        {/* Add Skills */}

        {/* Numeric Fields */}
        <ExperienceComponent form={form} />
        <SalaryComponent form={form} />

        <JDComponent form={form} />
        <Button type="submit">Tạo công việc</Button>
      </form>
    </Form>
  );
};

export default FormCreateJobComponent;
