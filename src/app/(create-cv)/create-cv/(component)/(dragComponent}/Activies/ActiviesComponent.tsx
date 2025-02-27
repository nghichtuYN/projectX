import { useEditorHook } from "@/hooks/useEditorHook";
import { cn } from "@/lib/utils";
import { FormType } from "@/types/formCvtype";
import { EditorContent } from "@tiptap/react";
import React, { useContext } from "react";
import { CvFormContext } from "../../CvFormComponent";
import ActivieDetailComponent from "./ActivieDetailComponent";
type Props = {
  handleChange: (
    field: keyof FormType,
    value: any,
    subField?: string,
    index?: number
  ) => void;
};
const ActiviesComponent = ({ handleChange }: Props) => {
  const context = useContext(CvFormContext);
  const { setActiveEditor, form, setForm } = context;
  const { editor: editorName } = useEditorHook(
    form.activities.name,
    "Kinh nghiệm làm việc",
    "activities",
    handleChange,
    "name"
  );
  const handleAdd = () => {
    setForm((prevForm) => ({
      ...prevForm,
      activities: {
        ...prevForm.activities,
        details: [
          ...prevForm.activities.details,
          {
            holderName: "",
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
          (form.activities.name === "<p></p>" || !form.activities.name) &&
            "border-dashed border-secondaryColor",
          editorName?.isFocused && "border-solid border-green-500"
        )}
      >
        <EditorContent editor={editorName} />
      </div>
      <div className="pt-1 pb-1">
        <hr className="w-full border border-orange-500 " />
      </div>

      {form.activities.details.map((activitie: any, index: number) => (
        <ActivieDetailComponent
          key={index}
          activitie={activitie}
          index={index}
          length={form?.activities?.details?.length}
          handleChange={handleChange}
          handleAdd={handleAdd}
        />
      ))}
    </div>
  );
};

export default ActiviesComponent;
