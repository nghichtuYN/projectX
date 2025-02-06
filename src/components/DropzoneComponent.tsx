import React from "react";
import {
  Dropzone,
  DropzoneDescription,
  DropzoneInput,
  DropzoneTitle,
  DropzoneTrigger,
  DropzoneUploadIcon,
  DropzoneZone,
} from "@/components/ui/dropzone";
import { FileList } from "./ui/file-list";
import FileListComponent from "./FileListComponent";
import FormFieldComponent from "./FormFieldComponent";
import { UseFormReturn } from "react-hook-form";
import { Mail, Phone, User } from "lucide-react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
type Props = {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  form: UseFormReturn<
    {
      name: string;
      email: string;
      phone: string;
      decription: string;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    undefined
  >;
};
const DropzoneComponent = ({ files, setFiles, form }: Props) => {
  const errors = form.formState.errors;

  return (
    <Dropzone
      accept={{
        "application/msword": [".doc"],
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          [".docx"],
        "application/pdf": [".pdf"],
      }}
      onDropAccepted={setFiles}
      noClick
    >
      <DropzoneZone className="h-full">
        <DropzoneInput />
        <div className="flex flex-col items-center gap-4 text-center h-full">
          <div className="flex flex-col gap-1.5">
            <DropzoneTitle className="flex justify-center items-center gap-2">
              <DropzoneUploadIcon className="w-5 h-5" />
              Tải lên CV từ máy tính, chọn hoặc kéo thả
            </DropzoneTitle>
            <DropzoneDescription>
              Hỗ trợ định dạng .doc, .docx, pdf có kích thước dưới 5MB.
            </DropzoneDescription>
          </div>
          <DropzoneTrigger asChild>
            <Button>Chọn CV</Button>
          </DropzoneTrigger>
          <FileList className="grid md:grid-cols-2 grid-cols-1 items-start justify-start w-full">
            {files.map((file, index) => (
              <FileListComponent setFiles={setFiles} key={index} file={file} />
            ))}
          </FileList>
          <hr className="w-full" />
          <div className="w-full flex items-center justify-between pb-2">
            <p className="text-sm leading-4 text-primaryColor">
              Vui lòng nhập đầy đủ thông tin chi tiết:
            </p>
            <p className="text-red-500 text-xs leading-4">
              (*) Thông tin bắt buộc.
            </p>
          </div>
          <div className="grid gap-2 grid-cols-2 space-y-4 w-full">
            <div className="col-span-2 ">
              <FormFieldComponent
                control={form.control}
                name="name"
                icon={User}
                label="Họ và tên"
                requrie={true}
              >
                {(field) => (
                  <Input
                    className={cn(
                      errors.email &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                    placeholder="Họ và tên hiển thị với NTD"
                    {...field}
                  />
                )}
              </FormFieldComponent>
            </div>
            <FormFieldComponent
              control={form.control}
              name="email"
              icon={Mail}
              label=" Email"
              requrie={true}
            >
              {(field) => (
                <Input
                  className={cn(
                    errors.email && "border-red-500 focus-visible:ring-red-500"
                  )}
                  placeholder="Email hiển thị với NTD"
                  {...field}
                />
              )}
            </FormFieldComponent>
            <FormFieldComponent
              control={form.control}
              name="phone"
              icon={Phone}
              label="Số điện thoại"
              requrie={true}
            >
              {(field) => (
                <Input
                  className={cn(
                    errors.email && "border-red-500 focus-visible:ring-red-500"
                  )}
                  placeholder="Số điện thoại hiển thị với NTD"
                  {...field}
                />
              )}
            </FormFieldComponent>
          </div>
        </div>
      </DropzoneZone>
    </Dropzone>
  );
};

export default DropzoneComponent;
