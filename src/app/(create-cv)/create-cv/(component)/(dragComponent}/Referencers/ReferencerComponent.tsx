import { FormType } from "@/types/fromCvtype";
import React, { useContext } from "react";
import { CvFormContext } from "../../CvFormComponent";
import { useEditorHook } from "@/hooks/useEditorHook";
import { EditorContent } from "@tiptap/react";
import { cn } from "@/lib/utils";
import ReferencerDetailComponent from "./ReferencerDetailComponent";
type Props = {
  handleChange: (
    field: keyof FormType,
    value: any,
    subField?: string,
    index?: number
  ) => void;
};
const ReferencerComponent = ({ handleChange }: Props) => {
  const context = useContext(CvFormContext);
  const { setActiveEditor, form, setForm } = context;
  const { editor: editorName } = useEditorHook(
    form.referencer.name,
    "Kinh nghiệm làm việc",
    "referencer",
    handleChange,
    "name"
  );
  const handleAdd = () => {
    setForm((prevForm) => ({
      ...prevForm,
      referencer: {
        ...prevForm.referencer,
        details: [
          ...prevForm.referencer.details,
          {
            info: "",
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
          (form.referencer.name === "<p></p>" || !form.referencer.name) &&
            "border-dashed border-secondaryColor",
          editorName?.isFocused && "border-solid border-green-500"
        )}
      >
        <EditorContent editor={editorName} />
      </div>
      {form?.referencer?.details?.map((referencer: any, index: number) => (
        <ReferencerDetailComponent
          key={index}
          referencer={referencer}
          index={index}
          length={form?.referencer?.details?.length}
          handleChange={handleChange}
          handleAdd={handleAdd}
        />
      ))}
    </div>
  );
};

export default ReferencerComponent;
