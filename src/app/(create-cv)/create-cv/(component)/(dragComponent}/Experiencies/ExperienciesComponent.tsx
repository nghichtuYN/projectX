import { useEditorHook } from "@/hooks/useEditorHook";
import React, { useContext, useEffect } from "react";
import { CvFormContext } from "../../CvFormComponent";
import { Experience, FormType } from "@/types/fromCvtype";
import { EditorContent } from "@tiptap/react";
import { Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import ExperienceDetail from "./ExperienceDetail";

type Props = {
  handleChange: (
    field: keyof FormType,
    value: any,
    subField?: string,
    index?: number
  ) => void;
};

const ExperienciesComponent = ({ handleChange }: Props) => {
  const context = useContext(CvFormContext);
  const { setActiveEditor, form, setForm } = context;
  const { editor: editorName } = useEditorHook(
    form.experiences.name,
    "Kinh nghiệm làm việc",
    "experiences",
    handleChange,
    "name"
  );

  const handleAddExperience = () => {
    setForm((prevForm) => ({
      ...prevForm,
      experiences: {
        ...prevForm.experiences,
        details: [
          ...prevForm.experiences.details,
          {
            position: "",
            company: "",
            start: "",
            end: "",
            description: "",
          },
        ],
      },
    }));
  };
  return (
    <div
      id="details"
      className="w-full min-h-full h-fit rounded-md border hover:border-secondaryColor p-2"
    >
      <div
        onFocus={() => setActiveEditor(editorName)}
        className={cn(
          "border p-2 rounded",
          !editorName?.isFocused &&
            "hover:border-dashed hover:border-secondaryColor",
          (form?.experiences?.name === "<p></p>" || !form?.experiences?.name) &&
            "border-dashed border-secondaryColor",
          editorName?.isFocused && "border-solid border-green-500"
        )}
      >
        <EditorContent editor={editorName} />
      </div>
      {form?.experiences?.details?.map((experience: any, index: number) => (
        <ExperienceDetail
          key={index}
          experience={experience}
          index={index}
          length={form?.experiences?.details?.length}
          handleChange={handleChange}
          setActiveEditor={setActiveEditor}
          handleAddExperience={handleAddExperience}
        />
      ))}
    </div>
  );
};

export default ExperienciesComponent;
