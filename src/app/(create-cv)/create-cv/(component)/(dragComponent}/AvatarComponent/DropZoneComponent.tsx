import {
  DropzoneDescription,
  DropzoneInput,
  DropzoneTitle,
  DropzoneTrigger,
  DropzoneUploadIcon,
  DropzoneZone,
  Dropzone,
} from "@/components/ui/dropzone";
import { FormType } from "@/types/formCvtype";
import React, { useState } from "react";
type Props = {
  handleChange: (
    field: keyof FormType,
    value: any,
    subField?: string,
    index?: number
  ) => void;
  setData: React.Dispatch<React.SetStateAction<null>>;
};
const DropZoneComponent = ({ handleChange, setData }: Props) => {
  const [uploading, setUploading] = useState(false); // Trạng thái đang upload
  const [error, setError] = useState<string | null>(null); // Lưu lỗi nếu có
  const handleDrop = async (acceptedFiles: File[]) => {
    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", acceptedFiles[0]);

      const response = await fetch("/api/file", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setData(data);
    } catch (err) {
      setError("Có lỗi xảy ra khi upload ảnh. Vui lòng thử lại.");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dropzone
      accept={{
        "image/png": [".png"],
        "image/jpeg": [".jpg", ".jpeg"],
      }}
      onDropAccepted={handleDrop}
      noClick
      maxSize={5000000} // 5MB
    >
      <DropzoneZone className="h-full w-full">
        <DropzoneInput />
        <div className="flex flex-col items-center gap-4 text-center h-full mb-2">
          <div className="flex flex-col gap-1.5">
            <DropzoneTitle className="flex justify-center items-center gap-2">
              <DropzoneUploadIcon className="w-5 h-5" />
              Tải lên ảnh từ máy tính, chọn hoặc kéo thả
            </DropzoneTitle>
          </div>
          <DropzoneTrigger asChild>
            <span className="h-9 px-4 py-2 bg-secondaryColor text-sm font-semibold hover:border-secondaryColor hover:border text-white rounded-md cursor-pointer hover:bg-white transition hover:text-secondaryColor">
              Chọn Ảnh
            </span>
          </DropzoneTrigger>
        </div>
      </DropzoneZone>
      <DropzoneDescription className="pt-2">
        {uploading
          ? "Đang tải lên..."
          : error
          ? error
          : "Ảnh tải lên có dung lượng không quá 5MB."}
      </DropzoneDescription>
    </Dropzone>
  );
};

export default DropZoneComponent;
