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
import { FileList } from "@/components/ui/file-list";
import FileListComponent from "@/app/(routes)/jobs/[id]/(components)/FileListComponent";
type Props = {
  field: any; // Use proper typing from react-hook-form, e.g., UseFormReturn<CompanyFormValues>
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
};

const DropzoneComponent = ({ field, files, setFiles }: Props) => {
  const handleDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles); // Update the local file state
    if (acceptedFiles.length > 0) {
      // Update the form's RegistrationFile field with the file name (or other identifier)
      field.onChange(acceptedFiles[0].name);
    }
  };

  return (
    <Dropzone
      accept={{
        "image/jpeg": [".jpeg", ".jpg"],
        "image/png": [".png"],
        "application/pdf": [".pdf"],
      }}
      onDropAccepted={handleDrop}
      noClick
      maxSize={5000000}
    >
      <DropzoneZone className="h-auto w-full">
        <DropzoneInput />
        <div className="flex flex-col items-center mb-3 text-center h-full">
          <div className="flex flex-col gap-1.5 mb-3">
            <DropzoneTitle className="flex justify-center items-center gap-2">
              <p className="text-sm font-medium">Chọn hoặc kéo file vào đây</p>
            </DropzoneTitle>
            <DropzoneDescription>
              Dung lượng tối đa 5MB, định dạng: jpeg, jpg, png, pdf
            </DropzoneDescription>
          </div>
          <DropzoneTrigger asChild>
            <span className="h-9 px-4 py-2 flex gap-1 items-center bg-accent text-sm font-semibold hover:border-secondaryColor hover:border text-black rounded-md cursor-pointer hover:bg-white transition hover:text-secondaryColor">
              <DropzoneUploadIcon className="w-4 h-4" />
              Chọn file
            </span>
          </DropzoneTrigger>
          <FileList className="grid md:grid-cols-2 grid-cols-1 mt-2 items-start justify-start w-full">
            {files &&
              files.map((file, index) => (
                <FileListComponent
                  setFiles={setFiles}
                  key={index}
                  file={file}
                />
              ))}
          </FileList>
        </div>
      </DropzoneZone>
    </Dropzone>
  );
};

export default DropzoneComponent;
