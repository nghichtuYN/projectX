import { useEditorHook } from "@/hooks/useEditorHook";
import React, { useContext } from "react";
import { CvFormContext } from "../../CvFormComponent";
import { EditorContent } from "@tiptap/react";
import { cn } from "@/lib/utils";
import { House } from "lucide-react";
type Props = {
  handleChange: (field: string, value: string) => void;
};
const AddressComponent = ({ handleChange }: Props) => {
  const content = "";
  const placeholder = "Quận A, Thành phố ..";
  const { editor } = useEditorHook(content, placeholder, "email", handleChange);
  const context = useContext(CvFormContext);
  const { setActiveEditor } = context;

  return (
    <div className="flex items-center  w-full h-fit  min-h-[20px] rounded-md gap-2 hover:border-secondaryColor hover:border hover:border-dashed p-1">
      <div className="w-1/6 pl-1">
        <House className="w-4 h-4 text-secondaryColor " />
      </div>
      <div
        onFocus={() => setActiveEditor(editor)}
        className={cn(
          " h-full w-5/6 border-2 rounded-bl-md",
          !content && "border-2 border-dotted border-secondaryColor"
        )}
      >
        <EditorContent style={{ whiteSpace: "pre-line" }} editor={editor} />
      </div>
    </div>
  );
};

export default AddressComponent;
