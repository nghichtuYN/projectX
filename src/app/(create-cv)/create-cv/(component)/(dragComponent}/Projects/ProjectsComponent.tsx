import { FormType } from "@/types/formCvtype";
import React, { useContext } from "react";
import { CvFormContext } from "../../CvFormComponent";
import { useEditorHook } from "@/hooks/useEditorHook";
import { cn } from "@/lib/utils";
import { EditorContent } from "@tiptap/react";
import ExperienceDetail from "../Experiencies/ExperienceDetail";
import ProjectDetailComponent from "./ProjectDetailComponent";
type Props = {
  handleChange: (
    field: keyof FormType,
    value: any,
    subField?: string,
    index?: number
  ) => void;
};
const ProjectsComponent = ({ handleChange }: Props) => {
  const context = useContext(CvFormContext);
  const { setActiveEditor, form, setForm } = context;
  const { editor: editorName } = useEditorHook(
    form.projects.name,
    "Dự án",
    "projects",
    handleChange,
    "name"
  );
  const handleAdd = () => {
    setForm((prevForm) => ({
      ...prevForm,
      projects: {
        ...prevForm.projects,
        details: [
          ...prevForm.projects.details,
          {
            name_project: "",
            position: "",
            position_person: "",
            consumer: "",
            consumer_name: "",
            start: "",
            end: "",
            description_position: "",
            description_stacks: "",
            stacks: "",
            quantity: "",
            quantity_persons: "",
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
          (form?.projects?.name === "<p></p>" || !form?.projects?.name) &&
            "border-dashed border-secondaryColor",
          editorName?.isFocused && "border-solid border-green-500"
        )}
      >
        <EditorContent editor={editorName} />
      </div>
      <div className="pt-1 pb-1">
        <hr className="w-full border border-orange-500 " />
      </div>

      {form.projects.details.map((project: any, index: number) => (
        <ProjectDetailComponent
          key={index}
          project={project}
          index={index}
          length={form.projects.details.length}
          handleChange={handleChange}
          handleAdd={handleAdd}
        />
      ))}
    </div>
  );
};

export default ProjectsComponent;
