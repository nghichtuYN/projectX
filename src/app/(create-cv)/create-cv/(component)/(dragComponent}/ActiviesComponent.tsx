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
const ActiviesComponent = ({ handleChange }: Props) => {
  const context = useContext(CvFormContext);
  const { setActiveEditor, form } = context;
  const { editor: editorName } = useEditorHook(
    form.activities.name,
    "Kinh nghiệm làm việc",
    "activities",
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
          (form.activities.name === "<p></p>" || !form.activities.name) &&
            "border-dashed border-secondaryColor",
          editorName?.isFocused && "border-solid border-green-500"
        )}
      >
        <EditorContent editor={editorName} />
      </div>
      {form.activities.details.map((activitie: any, index: number) => {
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

        return (
          <div
            key={index}
            className="border-b flex items-start w-full gap-2 border hover:border-dashed hover:border-secondaryColor p-2"
          >
            <div className="w-1/3 flex flex-col gap-4">
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
                    "border rounded p-1",
                    !editorEnd?.isFocused &&
                      "hover:border-dashed hover:border-secondaryColor",
                    editorEnd?.isFocused && "border-solid border-green-500"
                  )}
                >
                  <EditorContent editor={editorEnd} />
                </div>
              </div>
              {/* Tên công ty */}

              <div className="mb-2">
                <div
                  onFocus={() => setActiveEditor(editorHorderName)}
                  className={cn(
                    "border rounded p-1",
                    !editorHorderName?.isFocused &&
                      "hover:border-dashed hover:border-secondaryColor",
                    editorHorderName?.isFocused &&
                      "border-solid border-green-500"
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

              {/* Mô tả công việc */}
              <div className="mb-2">
                <div
                  onFocus={() => setActiveEditor(editorDescription)}
                  className={cn(
                    "border rounded p-1",
                    !editorDescription?.isFocused &&
                      "hover:border-dashed hover:border-secondaryColor",
                    editorDescription?.isFocused &&
                      "border-solid border-green-500"
                  )}
                >
                  <EditorContent editor={editorDescription} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ActiviesComponent;
