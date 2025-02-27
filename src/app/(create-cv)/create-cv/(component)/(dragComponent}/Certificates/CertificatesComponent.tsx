import { useEditorHook } from "@/hooks/useEditorHook";
import { cn } from "@/lib/utils";
import { FormType } from "@/types/formCvtype";
import { EditorContent } from "@tiptap/react";
import React, { useContext } from "react";
import { CvFormContext } from "../../CvFormComponent";
import CertificateDetailComponent from "./CertificateDetailComponent";
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
  const { setActiveEditor, form, setForm } = context;
  const { editor: editorName } = useEditorHook(
    form.certificates.name,
    "Kỹ năng",
    "certificates",
    handleChange,
    "name"
  );
  const handleAdd = () => {
    setForm((prevForm) => ({
      ...prevForm,
      certificates: {
        ...prevForm.certificates,
        details: [
          ...prevForm.certificates.details,
          {
            name: "",
            time: "",
          },
        ],
      },
    }));
  };
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
      <div className="pt-1 pb-1">
        <hr className="w-full border border-orange-500 " />
      </div>

      {form?.certificates?.details?.map((certificate: any, index: number) => (
        <CertificateDetailComponent
          key={index}
          certificate={certificate}
          index={index}
          length={form?.certificates?.details?.length}
          handleChange={handleChange}
          handleAdd={handleAdd}
        />
      ))}
      
    </div>
  );
};

export default CertificateComponent;
