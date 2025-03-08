"use client";
import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { X, Bold, Italic, List, ListOrdered } from "lucide-react";
import { useEditorHook } from "@/hooks/useEditorHook";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FormFieldComponent from "@/app/(auth)/(components)/FormFieldComponent";
import { cn } from "@/lib/utils";
import { EditorContent } from "@tiptap/react";

// Zod schema for validation
const jobSchema = z.object({
  campaignId: z.string().min(1, " chiến dịch là bắt buộc"),
  jobDescriptionId: z.string().min(1, " mô tả công việc là bắt buộc"),
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
type JobFormValues = z.infer<typeof jobSchema>;

// Options for multi-select fields (translated)
const jobTypeOptions = ["Tại văn phòng", "Từ xa", "Kết hợp"];
const jobLevelOptions = ["Thực tập", "Mới ra trường", "Junior", "Senior"];
const contractTypeOptions = ["Bán thời gian", "Toàn thời gian", "Tự do"];
const schoolLevelOptions = ["Trung học", "Cử nhân", "Thạc sĩ", "Tiến sĩ"];

const FormCreateJobComponent = () => {
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      campaignId: "",
      jobDescriptionId: "",
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

  // Editor setup
  const { editor } = useEditorHook(
    form.getValues("description"),
    "Nhập mô tả công việc...",
    "description",
    (field, content) => form.setValue(field as keyof JobFormValues, content)
  );
  const editorRef = useRef<HTMLDivElement>(null);

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
        className="space-y-6 max-w-2xl"
      >
        {/* Basic Fields */}
        <FormFieldComponent
          control={form.control}
          name="campaignId"
          label=" chiến dịch"
          requrie
          icon={null}
        >
          {(field) => <Input {...field} placeholder="Nhập  chiến dịch" />}
        </FormFieldComponent>

        <FormFieldComponent
          control={form.control}
          name="jobDescriptionId"
          label="Tiêu đề tin tuyển dụng"
          requrie
          icon={null}
        >
          {(field) => <Input {...field} placeholder="Nhập tiêu đề tin" />}
        </FormFieldComponent>

        <FormFieldComponent
          control={form.control}
          name="majorId"
          label="Chuyên ngành"
          requrie
          icon={null}
        >
          {(field) => <Input {...field} placeholder="Nhập chuyên ngành" />}
        </FormFieldComponent>

        <FormFieldComponent
          control={form.control}
          name="locationId"
          label=" địa điểm"
          requrie
          icon={null}
        >
          {(field) => <Input {...field} placeholder="Nhập  địa điểm" />}
        </FormFieldComponent>

        <FormFieldComponent
          control={form.control}
          name="position"
          label="Vị trí"
          requrie
          icon={null}
        >
          {(field) => <Input {...field} placeholder="Nhập vị trí" />}
        </FormFieldComponent>

        {/* School Level */}
        <FormFieldComponent
          control={form.control}
          name="schoolLevel"
          label="Trình độ học vấn"
          requrie
          icon={null}
        >
          {(field) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn trình độ học vấn" />
              </SelectTrigger>
              <SelectContent>
                {schoolLevelOptions.map((level, index) => (
                  <SelectItem key={level} value={schoolLevelOptions[index]}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </FormFieldComponent>

        {/* Description with Editor */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Mô tả công việc *</label>
          <div className="border rounded-md">
            {/* Toolbar */}
            {editor && (
              <div className="flex gap-2 p-2 border-b bg-gray-50">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().toggleBold().run()}
                >
                  <Bold size={18} />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                  <Italic size={18} />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    editor.chain().focus().toggleBulletList().run()
                  }
                >
                  <List size={18} />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    editor.chain().focus().toggleOrderedList().run()
                  }
                >
                  <ListOrdered size={18} />
                </Button>
              </div>
            )}
            {/* Editor */}
            <div
              //   onFocus={() => {
              //     setActiveEditor(editor);
              //   }}
              className={cn(
                "border rounded p-1 w-full min-h-32 h-auto",
                !editor?.isFocused &&
                  "hover:border-dashed hover:border-secondaryColor",
                editor?.isFocused && "border-solid border-green-500"
              )}
            >
              <EditorContent editor={editor} />
            </div>
          </div>
          {form.formState.errors.description && (
            <p className="text-sm text-red-500">
              {form.formState.errors.description.message}
            </p>
          )}
        </div>

        {/* Multi-select Fields */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Loại công việc *</label>
          <Select onValueChange={(value) => addItem("jobTypes", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Chọn loại công việc" />
            </SelectTrigger>
            <SelectContent>
              {jobTypeOptions.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex flex-wrap gap-2 mt-2">
            {form.watch("jobTypes").map((type) => (
              <Badge key={type} variant="secondary">
                {type}
                <X
                  size={14}
                  className="ml-1 cursor-pointer"
                  onClick={() => removeItem("jobTypes", type)}
                />
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Cấp độ công việc *</label>
          <Select onValueChange={(value) => addItem("jobLevels", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Chọn cấp độ công việc" />
            </SelectTrigger>
            <SelectContent>
              {jobLevelOptions.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex flex-wrap gap-2 mt-2">
            {form.watch("jobLevels").map((level) => (
              <Badge key={level} variant="secondary">
                {level}
                <X
                  size={14}
                  className="ml-1 cursor-pointer"
                  onClick={() => removeItem("jobLevels", level)}
                />
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Loại hợp đồng *</label>
          <Select onValueChange={(value) => addItem("contractTypes", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Chọn loại hợp đồng" />
            </SelectTrigger>
            <SelectContent>
              {contractTypeOptions.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex flex-wrap gap-2 mt-2">
            {form.watch("contractTypes").map((type) => (
              <Badge key={type} variant="secondary">
                {type}
                <X
                  size={14}
                  className="ml-1 cursor-pointer"
                  onClick={() => removeItem("contractTypes", type)}
                />
              </Badge>
            ))}
          </div>
        </div>

        {/* Add Skills */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Kỹ năng *</label>
          <div className="flex gap-2">
            <Input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              placeholder="Nhập kỹ năng"
              onKeyPress={(e) => e.key === "Enter" && addSkill()}
            />
            <Button type="button" onClick={addSkill}>
              Thêm
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {form.watch("skills").map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
                <X
                  size={14}
                  className="ml-1 cursor-pointer"
                  onClick={() => removeItem("skills", skill)}
                />
              </Badge>
            ))}
          </div>
        </div>

        {/* Numeric Fields */}
        <FormFieldComponent
          control={form.control}
          name="minSalary"
          label="Mức lương tối thiểu"
          requrie
          icon={null}
        >
          {(field) => (
            <Input
              type="number"
              {...field}
              onChange={(e) => field.onChange(parseFloat(e.target.value))}
              placeholder="Nhập mức lương tối thiểu"
            />
          )}
        </FormFieldComponent>

        <FormFieldComponent
          control={form.control}
          name="maxSalary"
          label="Mức lương tối đa"
          requrie
          icon={null}
        >
          {(field) => (
            <Input
              type="number"
              {...field}
              onChange={(e) => field.onChange(parseFloat(e.target.value))}
              placeholder="Nhập mức lương tối đa"
            />
          )}
        </FormFieldComponent>

        <FormFieldComponent
          control={form.control}
          name="minYearOfExperience"
          label="Số năm kinh nghiệm tối thiểu"
          requrie
          icon={null}
        >
          {(field) => (
            <Input
              type="number"
              {...field}
              onChange={(e) => field.onChange(parseFloat(e.target.value))}
              placeholder="Nhập số năm kinh nghiệm tối thiểu"
            />
          )}
        </FormFieldComponent>

        <Button type="submit">Tạo công việc</Button>
      </form>
    </Form>
  );
};

export default FormCreateJobComponent;
