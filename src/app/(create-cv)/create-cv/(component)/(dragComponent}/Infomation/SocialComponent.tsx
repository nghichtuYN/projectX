import { useEditorHook } from "@/hooks/useEditorHook";
import React, { useContext } from "react";
import { CvFormContext } from "../../CvFormComponent";
import { EditorContent } from "@tiptap/react";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { FormType } from "@/types/fromCvtype";
type Props = {
  handleChange: (
    field: keyof FormType,
    value: any,
    subField?: string,
    index?: number
  ) => void;
};

const SocialComponent = ({ handleChange }: Props) => {
  const context = useContext(CvFormContext);
  const { setActiveEditor, form } = context;

  const placeholder = "fb@example.com";
  const { editor } = useEditorHook(
    form.social,
    placeholder,
    "social",
    handleChange
  );

  return (
    <div className="flex items-center  w-full h-fit  min-h-[20px] rounded-md gap-2 hover:border-secondaryColor hover:border hover:border-dashed p-1">
      <div className="w-1/6 pl-1">
        <Globe className="w-5 h-5 text-secondaryColor " />
      </div>
      <div
        onFocus={() => {
          setActiveEditor(editor);
          // setStyle("border-green-500");
        }}
        className={cn(
          " h-full w-5/6 border rounded-bl-md",
          !editor?.isFocused &&
            "hover:border-dashed hover:border-secondaryColor",
          (form.social === "<p></p>" || !form.social) &&
            "border-dashed border-secondaryColor",
          editor?.isFocused && "border-solid border-green-500"
        )}
      >
        <EditorContent style={{ whiteSpace: "pre-line" }} editor={editor} />
      </div>
    </div>
  );
};

export default SocialComponent;
