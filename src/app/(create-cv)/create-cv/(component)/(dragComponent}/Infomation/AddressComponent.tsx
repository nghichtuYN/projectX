import { useEditorHook } from "@/hooks/useEditorHook";
import React, { useContext } from "react";
import { CvFormContext } from "../../CvFormComponent";
import { EditorContent } from "@tiptap/react";
import { cn } from "@/lib/utils";
import { House } from "lucide-react";
import { FormType } from "@/types/fromCvtype";
type Props = {
  handleChange: (
    field: keyof FormType,
    value: any,
    subField?: string,
    index?: number
  ) => void;
};
const AddressComponent = ({ handleChange }: Props) => {
  const context = useContext(CvFormContext);
  const { setActiveEditor, form } = context;
  const placeholder = "Quận A, Thành phố ..";
  const { editor } = useEditorHook(
    form.address,
    placeholder,
    "email",
    handleChange
  );

  return (
    <div className="flex items-center  w-full h-fit  min-h-[20px] rounded-md gap-2 hover:border-secondaryColor hover:border hover:border-dashed p-1">
      <div className="w-1/6 pl-1">
        <House className="w-5 h-5 text-secondaryColor " />
      </div>
      <div
        onFocus={() => setActiveEditor(editor)}
        className={cn(
          " h-full w-5/6 border rounded-bl-md",
          !editor?.isFocused &&
            "hover:border-dashed hover:border-secondaryColor",
          (form.address === "<p></p>" || !form.address) &&
            "border-dashed border-secondaryColor",
          editor?.isFocused && "border-solid border-green-500"
        )}
      >
        <EditorContent style={{ whiteSpace: "pre-line" }} editor={editor} />
      </div>
    </div>
  );
};

export default AddressComponent;
