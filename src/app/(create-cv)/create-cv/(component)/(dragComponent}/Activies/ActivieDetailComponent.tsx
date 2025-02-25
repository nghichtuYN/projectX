import { useEditorHook } from "@/hooks/useEditorHook";
import { FormType } from "@/types/fromCvtype";
import React, { useContext } from "react";
import { CvFormContext } from "../../CvFormComponent";
import { EditorContent } from "@tiptap/react";
import { cn, moveElement } from "@/lib/utils";
import { Minus } from "lucide-react";
import OptionsButtonComponent from "../OptionsButtonComponent";
type Props = {
  activitie: any;
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
const ActivieDetailComponent = ({
  activitie,
  index,
  handleChange,
  handleAdd,
  length,
}: Props) => {
  const context = useContext(CvFormContext);

  const { setActiveEditor, setForm } = context;
  const { editor: editorPosition } = useEditorHook(
    activitie.position,
    "Vị trí của bạn",
    "activities",
    handleChange,
    "position",
    index
  );

  const { editor: editorHorderName } = useEditorHook(
    activitie.holderName,
    "Tên tổ chức",
    "activities",
    handleChange,
    "holderName",
    index
  );

  const { editor: editorStart } = useEditorHook(
    activitie.start,
    "Bắt đầu",
    "activities",
    handleChange,
    "start",
    index
  );

  const { editor: editorEnd } = useEditorHook(
    activitie.end,
    "Kết thúc",
    "activities",
    handleChange,
    "end",
    index
  );

  const { editor: editorDescription } = useEditorHook(
    activitie.description,
    "Mô tả hoạt động",
    "activities",
    handleChange,
    "description",
    index
  );
  const handleMoveUp = () => {
    if (index === 0) return;
    setForm((prevForm: FormType) => ({
      ...prevForm,
      activities: {
        ...prevForm.activities,
        details: moveElement(prevForm.activities.details, index, index - 1),
      },
    }));
  };
  const handleMoveDown = () => {
    if (index === length - 1) return;

    setForm((prevForm: FormType) => ({
      ...prevForm,
      activities: {
        ...prevForm.activities,
        details: moveElement(prevForm.activities.details, index, index + 1),
      },
    }));
  };
  return (
    <div className="border-b group/detail relative flex items-start w-full gap-2 border hover:border-dashed hover:border-secondaryColor p-2">
      <div className="w-1/3 flex flex-col gap-4">
        <div className="flex items-center  justify-start w-full">
          <div
            onFocus={() => setActiveEditor(editorStart)}
            className={cn(
              "border rounded p-1",
              !editorStart?.isFocused &&
                "hover:border-dashed hover:border-secondaryColor",

              editorStart?.isFocused && "border-solid border-green-500"
            )}
          >
            <EditorContent editor={editorStart} />
          </div>
          <div>
            <Minus />
          </div>
          <div
            onFocus={() => setActiveEditor(editorEnd)}
            className={cn(
              "border rounded p-1",
              !editorEnd?.isFocused &&
                "hover:border-dashed hover:border-secondaryColor",
              editorEnd?.isFocused && "border-solid border-green-500"
            )}
          >
            <EditorContent editor={editorEnd} />
          </div>
        </div>

        <div className="mb-2">
          <div
            onFocus={() => setActiveEditor(editorHorderName)}
            className={cn(
              "border rounded p-1",
              !editorHorderName?.isFocused &&
                "hover:border-dashed hover:border-secondaryColor",
              editorHorderName?.isFocused && "border-solid border-green-500"
            )}
          >
            <EditorContent editor={editorHorderName} />
          </div>
        </div>
      </div>
      <div className="w-2/3 flex flex-col gap-2">
        {/* Vị trí công việc */}
        <div className="mb-2">
          <div
            onFocus={() => setActiveEditor(editorPosition)}
            className={cn(
              "border rounded p-1",
              !editorPosition?.isFocused &&
                "hover:border-dashed hover:border-secondaryColor",
              editorPosition?.isFocused && "border-solid border-green-500"
            )}
          >
            <EditorContent editor={editorPosition} />
          </div>
        </div>

        <div className="mb-2">
          <div
            onFocus={() => setActiveEditor(editorDescription)}
            className={cn(
              "border rounded p-1",
              !editorDescription?.isFocused &&
                "hover:border-dashed hover:border-secondaryColor",
              editorDescription?.isFocused && "border-solid border-green-500"
            )}
          >
            <EditorContent editor={editorDescription} />
          </div>
        </div>
      </div>
      <OptionsButtonComponent
        index={index}
        length={length}
        handleAdd={handleAdd}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
      />
    </div>
  );
};

export default ActivieDetailComponent;
