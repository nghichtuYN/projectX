import { useEditorHook } from "@/hooks/useEditorHook";
import { cn } from "@/lib/utils";
import { FormType } from "@/types/fromCvtype";
import { EditorContent } from "@tiptap/react";
import React, { useContext } from "react";
import { CvFormContext } from "../CvFormComponent";
type Props = {
  handleChange: (
    field: keyof FormType,
    value: any,
    subField?: string,
    index?: number
  ) => void;
};
const CertificateComponent = ({ handleChange }: Props) => {
  const context = useContext(CvFormContext);
  const { setActiveEditor, form } = context;
  const { editor: editorName } = useEditorHook(
    form.certificates.name,
    "Kỹ năng",
    "certificates",
    handleChange,
    "name"
  );

  return (
    <div className="w-full min-h-full h-fit rounded-md border hover:border-secondaryColor p-2">
      <div
        onFocus={() => setActiveEditor(editorName)}
        className={cn(
          "border p-2 rounded",
          !editorName?.isFocused &&
            "hover:border-dashed hover:border-secondaryColor",
          (form.certificates.name === "<p></p>" || !form.certificates.name) &&
            "border-dashed border-secondaryColor",
          editorName?.isFocused && "border-solid border-green-500"
        )}
      >
        <EditorContent editor={editorName} />
      </div>
      {form.certificates.details.map((experience: any, index: number) => {
        const { editor: editorTime } = useEditorHook(
          experience.school,
          "Thời gian",
          "certificates",
          handleChange,
          "time",
          index
        );

        const { editor: editorNameCertificate } = useEditorHook(
          experience.description,
          "Tên chứng chỉ",
          "certificates",
          handleChange,
          "name",
          index
        );

        return (
          <div
            key={index}
            className="border-b flex flex-col items-start w-full gap-2 border hover:border-dashed hover:border-secondaryColor p-2"
          >
            <div
              onFocus={() => setActiveEditor(editorTime)}
              className={cn(
                "border rounded p-1 w-full",
                !editorTime?.isFocused &&
                  "hover:border-dashed hover:border-secondaryColor",
                editorTime?.isFocused && "border-solid border-green-500"
              )}
            >
              <EditorContent editor={editorTime} />
            </div>

            {/* Mô tả học tập */}
            <div
              onFocus={() => setActiveEditor(editorNameCertificate)}
              className={cn(
                "border rounded p-1 w-full",
                !editorNameCertificate?.isFocused &&
                  "hover:border-dashed hover:border-secondaryColor",
                editorNameCertificate?.isFocused &&
                  "border-solid border-green-500"
              )}
            >
              <EditorContent editor={editorNameCertificate} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CertificateComponent;
