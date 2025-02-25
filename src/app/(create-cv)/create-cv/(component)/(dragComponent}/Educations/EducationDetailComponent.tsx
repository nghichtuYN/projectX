import { useEditorHook } from "@/hooks/useEditorHook";
import { cn, moveElement } from "@/lib/utils";
import { FormType } from "@/types/fromCvtype";
import React, { useContext } from "react";
import { CvFormContext } from "../../CvFormComponent";
import { EditorContent } from "@tiptap/react";
import { Minus } from "lucide-react";
import OptionsButtonComponent from "../OptionsButtonComponent";
type Props = {
  education: any;
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
const EducationDetailComponent = ({
  education,
  index,
  handleChange,
  handleAdd,
  length,
}: Props) => {
  const context = useContext(CvFormContext);

  const { setActiveEditor, setForm } = context;
  const { editor: editorSchool } = useEditorHook(
    education.school,
    "Tên trường học",
    "educations",
    handleChange,
    "school",
    index
  );

  const { editor: editorMajor } = useEditorHook(
    education.major,
    "Ngành học/Môn học",
    "educations",
    handleChange,
    "major",
    index
  );

  const { editor: editorStart } = useEditorHook(
    education.start,
    "Bắt đầu",
    "educations",
    handleChange,
    "start",
    index
  );

  const { editor: editorEnd } = useEditorHook(
    education.end,
    "Kết thúc",
    "educations",
    handleChange,
    "end",
    index
  );

  const { editor: editorDescription } = useEditorHook(
    education.description,
    "Mô tả quá trình học tập hoặc thành tích",
    "educations",
    handleChange,
    "description",
    index
  );
  const handleMoveUp = () => {
    if (index === 0) return;
    setForm((prevForm: FormType) => ({
      ...prevForm,
      educations: {
        ...prevForm.educations,
        details: moveElement(prevForm.educations.details, index, index - 1),
      },
    }));
  };
  const handleMoveDown = () => {
    if (index === length - 1) return;
    setForm((prevForm: FormType) => ({
      ...prevForm,
      educations: {
        ...prevForm.educations,
        details: moveElement(prevForm.educations.details, index, index + 1),
      },
    }));
  };
  return (
    <div className="border-b group/detail relative flex flex-col items-start w-full gap-2 border hover:border-dashed hover:border-secondaryColor p-2">
      {/* Thời gian làm việc */}
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
            "border rounded p-1 ",
            !editorEnd?.isFocused &&
              "hover:border-dashed hover:border-secondaryColor",
            editorEnd?.isFocused && "border-solid border-green-500"
          )}
        >
          <EditorContent editor={editorEnd} />
        </div>
      </div>

      <div
        onFocus={() => setActiveEditor(editorSchool)}
        className={cn(
          "border rounded p-1 w-full",
          !editorSchool?.isFocused &&
            "hover:border-dashed hover:border-secondaryColor",
          editorSchool?.isFocused && "border-solid border-green-500"
        )}
      >
        <EditorContent editor={editorSchool} />
      </div>
      {/* Vị trí công việc */}
      <div
        onFocus={() => setActiveEditor(editorMajor)}
        className={cn(
          "border rounded p-1 w-full",
          !editorMajor?.isFocused &&
            "hover:border-dashed hover:border-secondaryColor",
          editorMajor?.isFocused && "border-solid border-green-500"
        )}
      >
        <EditorContent editor={editorMajor} />
      </div>

      {/* Mô tả học tập */}
      <div
        onFocus={() => setActiveEditor(editorDescription)}
        className={cn(
          "border rounded p-1 w-full min-h-12",
          !editorDescription?.isFocused &&
            "hover:border-dashed hover:border-secondaryColor",
          editorDescription?.isFocused && "border-solid border-green-500"
        )}
      >
        <EditorContent editor={editorDescription} />
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

export default EducationDetailComponent;
