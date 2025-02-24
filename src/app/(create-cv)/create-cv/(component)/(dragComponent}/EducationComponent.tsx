import { useEditorHook } from "@/hooks/useEditorHook";
import { cn } from "@/lib/utils";
import { FormType } from "@/types/fromCvtype";
import { EditorContent } from "@tiptap/react";
import { Minus } from "lucide-react";
import React, { useContext } from "react";
import { CvFormContext } from "../CvFormComponent";
type Props = {
  handleChange: (
    field: keyof FormType,
    value: any,
    subField?: string,
    index?: number
  ) => void;
};
const EducationComponent = ({ handleChange }: Props) => {
  const context = useContext(CvFormContext);
  const { setActiveEditor, form, } = context;
  const { editor: editorName } = useEditorHook(
    form.education.name,
    "Học vấn",
    "education",
    handleChange,
    "name"
  );

  return (
    <div className="w-full min-h-full h-fit rounded-md border hover:border-secondaryColor p-2">
      <div
        onFocus={() => setActiveEditor(editorName)}
        className={cn(
          "border p-2 rounded",
          !editorName?.isFocused &&
            "hover:border-dashed hover:border-secondaryColor",
          (form.education.name === "<p></p>" || !form.education.name) &&
            "border-dashed border-secondaryColor",
          editorName?.isFocused && "border-solid border-green-500"
        )}
      >
        <EditorContent editor={editorName} />
      </div>
      {form.education.details.map((experience: any, index: number) => {
        const { editor: editorSchool } = useEditorHook(
          experience.school,
          "Tên trường học",
          "education",
          handleChange,
          "school",
          index
        );

        const { editor: editorMajor } = useEditorHook(
          experience.company,
          "Ngành học/Môn học",
          "education",
          handleChange,
          "major",
          index
        );

        const { editor: editorStart } = useEditorHook(
          experience.start,
          "Bắt đầu",
          "education",
          handleChange,
          "start",
          index
        );

        const { editor: editorEnd } = useEditorHook(
          experience.end,
          "Kết thúc",
          "education",
          handleChange,
          "end",
          index
        );

        const { editor: editorDescription } = useEditorHook(
          experience.description,
          "Mô tả quá trình học tập hoặc thành tích",
          "education",
          handleChange,
          "description",
          index
        );

        return (
          <div
            key={index}
            className="border-b flex flex-col items-start w-full gap-2 border hover:border-dashed hover:border-secondaryColor p-2"
          >
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
            {/* Tên công ty */}

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
          </div>
        );
      })}
    </div>
  );
};

export default EducationComponent;
