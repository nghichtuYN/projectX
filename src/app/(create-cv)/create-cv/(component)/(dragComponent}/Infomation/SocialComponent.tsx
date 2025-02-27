import { useEditorHook } from "@/hooks/useEditorHook";
import React, { useContext } from "react";
import { CvFormContext } from "../../CvFormComponent";
import { EditorContent } from "@tiptap/react";
import { Globe } from "lucide-react";
import { cn, moveElement } from "@/lib/utils";
import { FormType } from "@/types/formCvtype";
import OptionsButtonComponent from "./OptionsButtonComponent";
type Props = {
  index: number;
  length: number;
  handleChange: (
    field: keyof FormType,
    value: any,
    subField?: string,
    index?: number
  ) => void;
  setComponents: React.Dispatch<
    React.SetStateAction<
      (({
        handleChange,
        index,
        length,
        setComponents,
      }: Props) => React.JSX.Element)[]
    >
  >;
};
const SocialComponent = ({
  handleChange,
  index,
  length,
  setComponents,
}: Props) => {
  const context = useContext(CvFormContext);
  const { setActiveEditor, form } = context;

  const placeholder = "fb@example.com";
  const { editor } = useEditorHook(
    form.social,
    placeholder,
    "social",
    handleChange
  );
  const handleMoveUp = () => {
    if (index === 0) return;
    setComponents((prev) => (prev = moveElement(prev, index, index - 1)));
  };
  const handleMoveDown = () => {
    if (index === length - 1) return;
    setComponents((prev) => (prev = moveElement(prev, index, index + 1)));
  };
  return (
    <div className="flex items-center group/detail relative  w-full h-fit  min-h-[20px] rounded-md gap-2 hover:border-secondaryColor hover:border hover:border-dashed p-1">
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
      <OptionsButtonComponent
        handleMoveDown={handleMoveDown}
        handleMoveUp={handleMoveUp}
        length={length}
        index={index}
      />
    </div>
  );
};

export default SocialComponent;
