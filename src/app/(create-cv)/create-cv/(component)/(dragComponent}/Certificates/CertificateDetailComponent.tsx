import { useEditorHook } from "@/hooks/useEditorHook";
import { FormType } from "@/types/formCvtype";
import React, { useContext } from "react";
import { CvFormContext } from "../../CvFormComponent";
import { cn, moveElement, removeElement } from "@/lib/utils";
import { EditorContent } from "@tiptap/react";
import OptionsButtonComponent from "../OptionsButtonComponent";
type Props = {
  certificate: any;
  index: number;
  length: number;
  handleChange: (
    field: keyof FormType,
    value: string,
    subField?: string,
    index?: number
  ) => void;
  handleAdd: () => void;
};
const CertificateDetailComponent = ({
  certificate,
  index,
  handleChange,
  handleAdd,
  length,
}: Props) => {
  const context = useContext(CvFormContext);

  const { setActiveEditor, setForm } = context;
  const { editor: editorTime } = useEditorHook(
    certificate.time,
    "Thời gian",
    "certificates",
    handleChange,
    "time",
    index
  );

  const { editor: editorNameCertificate } = useEditorHook(
    certificate.name,
    "Tên chứng chỉ",
    "certificates",
    handleChange,
    "name",
    index
  );
  const handleMoveUp = () => {
    if (index === 0) return;
    setForm((prevForm: FormType) => ({
      ...prevForm,
      certificates: {
        ...prevForm.certificates,
        details: moveElement(prevForm.certificates.details, index, index - 1),
      },
    }));
  };
  const handleMoveDown = () => {
    if (index === length - 1) return;

    setForm((prevForm: FormType) => ({
      ...prevForm,
      certificates: {
        ...prevForm.certificates,
        details: moveElement(prevForm.certificates.details, index, index + 1),
      },
    }));
  };
  const handleDelete = () => {
    setForm((prevForm: FormType) => ({
      ...prevForm,
      certificates: {
        ...prevForm.certificates,
        details: removeElement(prevForm.certificates.details, index),
      },
    }));
  };
  return (
    <div className="border-b group/detail relative flex flex-col items-start w-full gap-2 border hover:border-dashed hover:border-secondaryColor p-2">
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

      <div
        onFocus={() => setActiveEditor(editorNameCertificate)}
        className={cn(
          "border rounded p-1 w-full",
          !editorNameCertificate?.isFocused &&
            "hover:border-dashed hover:border-secondaryColor",
          editorNameCertificate?.isFocused && "border-solid border-green-500"
        )}
      >
        <EditorContent editor={editorNameCertificate} />
      </div>
      <OptionsButtonComponent
        index={index}
        length={length}
        handleAdd={handleAdd}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default CertificateDetailComponent;
