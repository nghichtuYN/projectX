import { useEditorHook } from "@/hooks/useEditorHook";
import { cn } from "@/lib/utils";
import { FormType } from "@/types/formCvtype";
import { EditorContent } from "@tiptap/react";
import React, { useContext } from "react";
import { CvFormContext } from "../../CvFormComponent";
import EducationDetailComponent from "./EducationDetailComponent";
type Props = {
  handleChange: (
    field: keyof FormType,
    value: any,
    subField?: string,
    index?: number
  ) => void;
};
const EducationComponent = ({ handleChange }: Props) => {
  const context = useContext(CvFormContext);
  const { setActiveEditor, form, setForm } = context;
  const { editor: editorName } = useEditorHook(
    form?.educations?.name,
    "Học vấn",
    "educations",
    handleChange,
    "name"
  );
  const handleAdd = () => {
    setForm((prevForm) => ({
      ...prevForm,
      educations: {
        ...prevForm.educations,
        details: [
          ...prevForm.educations.details,
          {
            major: "",
            school: "",
            start: "",
            end: "",
            description: "",
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
          (form.educations.name === "<p></p>" || !form.educations.name) &&
            "border-dashed border-secondaryColor",
          editorName?.isFocused && "border-solid border-green-500"
        )}
      >
        <EditorContent editor={editorName} />
      </div>
      <div className="pt-1 pb-1">
        <hr className="w-full border border-orange-500 " />
      </div>

      {form?.educations?.details?.map((education: any, index: number) => (
        <EducationDetailComponent
          key={index}
          education={education}
          index={index}
          length={form?.educations?.details?.length}
          handleChange={handleChange}
          handleAdd={handleAdd}
        />
      ))}
    </div>
  );
};

export default EducationComponent;
