import { Card } from "@/components/ui/card";
import { AlertTriangle, File } from "lucide-react";
import React from "react";
import DropzoneComponent from "./DropzoneComponent";
import DialogImage from "./DialogImage";
import FormFieldComponent from "@/app/(auth)/(components)/FormFieldComponent";
import example from "../../../../../../../public/images/example.jpg";

type Props = {
  form: any;
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
};
const GPDKcomponent = ({ form, files, setFiles }: Props) => {
  return (
    <FormFieldComponent
      control={form.control}
      label="Giấy tờ"
      name="RegistrationFile"
      requrie
      icon={null}
    >
      {(field) => (
        <Card className=" border rounded-lg">
          <div className="flex items-start mb-2 p-2">
            <div className="flex items-center w-1/2 text-sm font-medium">
              <File className="w-4 h-4 mr-2 text-secondaryColor" />
              Giấy phép kinh doanh
            </div>
            <div className="w-1/2">
              <p className="text-gray-700 text-sm font-medium text-center">
                Minh họa
              </p>
            </div>
          </div>

          <div className="flex p-2 items-start">
            <div>
              <DropzoneComponent
                field={field}
                files={files}
                setFiles={setFiles}
              />

              <div className="flex items-center space-x-2 space-y-2 text-amber-600">
                <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm">
                  Các văn bản đăng tải cần đầy đủ các mặt và không có dấu hiệu
                  chỉnh sửa/ che/ cắt thông tin
                </p>
              </div>
            </div>

            <div className="space-y-2 flex items-center w-1/2 justify-center">
              <DialogImage image={example} />
            </div>
          </div>
        </Card>
      )}
    </FormFieldComponent>
  );
};

export default GPDKcomponent;
