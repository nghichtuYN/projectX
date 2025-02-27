import { FormType } from "@/types/formCvtype";
import Image from "next/image";
import React, { useContext } from "react";
import UploadDialogComponent from "./UploadDialogComponent";
import { CvFormContext } from "../../CvFormComponent";
type Props = {
  handleChange: (
    field: keyof FormType,
    value: any,
    subField?: string,
    index?: number
  ) => void;
};
const AvatarDragComponent = ({ handleChange }: Props) => {
  const context = useContext(CvFormContext);
  const { form } = context;
  return (
    <>
      <div className="w-full group relative h-[268px]">
        <Image
          src={form.avatar || "https://github.com/shadcn.png"}
          alt="Avatar CV"
          fill
          className="w-full h-full object-cover"
        />
        <div className="hidden absolute left-1/2 bottom-3 transform -translate-x-1/2 group-hover:block">
          <UploadDialogComponent handleChange={handleChange} />
        </div>
      </div>
    </>
  );
};

export default AvatarDragComponent;
