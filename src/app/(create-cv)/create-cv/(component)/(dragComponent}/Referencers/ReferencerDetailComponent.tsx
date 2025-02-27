import { useEditorHook } from "@/hooks/useEditorHook";
import { cn, moveElement, removeElement } from "@/lib/utils";
import { FormType } from "@/types/formCvtype";
import { EditorContent } from "@tiptap/react";
import React, { useContext } from "react";
import { CvFormContext } from "../../CvFormComponent";
import OptionsButtonComponent from "../OptionsButtonComponent";
type Props = {
  referencer: any;
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
const ReferencerDetailComponent = ({
  referencer,
  index,
  handleChange,
  handleAdd,
  length,
}: Props) => {
  const context = useContext(CvFormContext);

  const { setActiveEditor, setForm } = context;
  const { editor: editorInfo } = useEditorHook(
    referencer.info,
    "Thông tin người tham chiếu bao gồm tên, chức vự và thông tin liên hệ",
    "referencer",
    handleChange,
    "info",
    index
  );
  const handleMoveUp = () => {
    if (index === 0) return;
    setForm((prevForm: FormType) => ({
      ...prevForm,
      referencer: {
        ...prevForm.referencer,
        details: moveElement(prevForm.referencer.details, index, index - 1),
      },
    }));
  };
  const handleMoveDown = () => {
    if (index === length - 1) return;
    setForm((prevForm: FormType) => ({
      ...prevForm,
      referencer: {
        ...prevForm.referencer,
        details: moveElement(prevForm.referencer.details, index, index + 1),
      },
    }));
  };
  const handleDelete = () => {
    setForm((prevForm: FormType) => ({
      ...prevForm,
      referencer: {
        ...prevForm.referencer,
        details: removeElement(prevForm.referencer.details, index),
      },
    }));
  };
  return (
    <div className="border-b group/detail relative flex items-start w-full gap-2 border hover:border-dashed hover:border-secondaryColor p-2">
      <div
        onFocus={() => setActiveEditor(editorInfo)}
        className={cn(
          "border rounded p-1 min-h-20 w-full",
          !editorInfo?.isFocused &&
            "hover:border-dashed hover:border-secondaryColor",
          editorInfo?.isFocused && "border-solid border-green-500"
        )}
      >
        <EditorContent editor={editorInfo} />
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

export default ReferencerDetailComponent;
