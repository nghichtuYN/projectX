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
import FileListComponent from "../../jobs/[id]/(components)/FileListComponent";
import { FileList } from "@/components/ui/file-list";
type Props = {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
};
const DropzoneComponent = ({ files, setFiles }: Props) => {
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
      maxSize={5000000}
    >
      <DropzoneZone className="h-full">
        <DropzoneInput />
        <div className="flex flex-col items-center gap-4 text-center h-full">
          <div className="flex flex-col gap-1.5">
            <DropzoneTitle className="flex justify-center items-center gap-2">
              <DropzoneUploadIcon className="w-5 h-5" />
              <p className="text-sm font-medium">
                Tải lên CV từ máy tính, chọn hoặc kéo thả
              </p>
            </DropzoneTitle>
            <DropzoneDescription>
              Hỗ trợ định dạng .doc, .docx, pdf có kích thước dưới 5MB.
            </DropzoneDescription>
          </div>
          <DropzoneTrigger asChild>
            <span className="h-9 px-4 py-2 bg-accent text-sm font-semibold hover:border-secondaryColor hover:border text-black rounded-md cursor-pointer hover:bg-white transition hover:text-secondaryColor">
              Chọn CV
            </span>
          </DropzoneTrigger>
          <FileList className="grid md:grid-cols-2 grid-cols-1 items-start justify-start w-full">
            {files.map((file, index) => (
              <FileListComponent setFiles={setFiles} key={index} file={file} />
            ))}
          </FileList>
        </div>
      </DropzoneZone>
    </Dropzone>
  );
};

export default DropzoneComponent;
