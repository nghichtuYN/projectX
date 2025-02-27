import { useEditorHook } from "@/hooks/useEditorHook";
import { cn, moveElement, removeElement } from "@/lib/utils";
import { FormType } from "@/types/formCvtype";
import { EditorContent } from "@tiptap/react";
import { Minus } from "lucide-react";
import React, { useContext, useEffect } from "react";
import { CvFormContext } from "../../CvFormComponent";
import OptionsButtonComponent from "../OptionsButtonComponent";
type Props = {
  experience: any;
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

const ExperienceDetail = ({
  experience,
  index,
  handleChange,
  handleAdd,
  length,
}: Props) => {
  const context = useContext(CvFormContext);

  const { setActiveEditor, setForm } = context;

  const { editor: editorPosition } = useEditorHook(
    experience.position,
    "Vị trí công việc",
    "experiences",
    handleChange,
    "position",
    index
  );

  const { editor: editorCompany } = useEditorHook(
    experience.company,
    "Tên công ty",
    "experiences",
    handleChange,
    "company",
    index
  );

  const { editor: editorStart } = useEditorHook(
    experience.start,
    "Bắt đầu",
    "experiences",
    handleChange,
    "start",
    index
  );

  const { editor: editorEnd } = useEditorHook(
    experience.end,
    "Kết thúc",
    "experiences",
    handleChange,
    "end",
    index
  );

  const { editor: editorDescription } = useEditorHook(
    experience.description,
    "Mô tả công việc",
    "experiences",
    handleChange,
    "description",
    index
  );
  const handleMoveUp = () => {
    if (index === 0) return;
    setForm((prevForm: FormType) => ({
      ...prevForm,
      experiences: {
        ...prevForm.experiences,
        details: moveElement(prevForm.experiences.details, index, index - 1),
      },
    }));
  };
  const handleMoveDown = () => {
    if (index === length - 1) return;
    setForm((prevForm: FormType) => ({
      ...prevForm,
      experiences: {
        ...prevForm.experiences,
        details: moveElement(prevForm.experiences.details, index, index + 1),
      },
    }));
  };
  const handleDelete = () => {
    setForm((prevForm: FormType) => ({
      ...prevForm,
      experiences: {
        ...prevForm.experiences,
        details: removeElement(prevForm.experiences.details, index),
      },
    }));
  };
  return (
    <div className="border-b group/detail relative flex items-start h-auto w-full gap-2 border hover:border-dashed hover:border-secondaryColor p-2">
      <div className="w-1/3 flex flex-col gap-4">
        <div className="flex items-center gap-2 justify-start w-full h-auto">
          <div
            onFocus={() => {
              setActiveEditor(editorStart);
            }}
            className={cn(
              "border rounded p-1 w-1/3 h-auto",
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
              "border rounded p-1 w-1/3 h-auto ",
              !editorEnd?.isFocused &&
                "hover:border-dashed hover:border-secondaryColor",
              editorEnd?.isFocused && "border-solid border-green-500"
            )}
          >
            <EditorContent editor={editorEnd} />
          </div>
        </div>
        <div className="mb-2 h-auto">
          <div
            onFocus={() => setActiveEditor(editorCompany)}
            className={cn(
              "border rounded p-1 h-auto",
              !editorCompany?.isFocused &&
                "hover:border-dashed hover:border-secondaryColor",
              editorCompany?.isFocused && "border-solid border-green-500"
            )}
          >
            <EditorContent editor={editorCompany} />
          </div>
        </div>
      </div>
      <div className="w-2/3 flex flex-col gap-2 h-auto">
        <div className="mb-2 h-auto">
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
        <div className="mb-2 h-auto">
          <div
            onFocus={() => setActiveEditor(editorDescription)}
            className={cn(
              "border rounded p-1 h-auto",
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
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default ExperienceDetail;
