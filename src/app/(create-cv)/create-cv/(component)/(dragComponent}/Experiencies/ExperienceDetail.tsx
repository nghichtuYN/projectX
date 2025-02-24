import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEditorHook } from "@/hooks/useEditorHook";
import { cn } from "@/lib/utils";
import { FormType } from "@/types/fromCvtype";
import { EditorContent } from "@tiptap/react";
import { Minus, MoveDown, MoveUp, Plus, Trash } from "lucide-react";
import React from "react";
import OptionsButtonCompoent from "../OptionsButtonCompoent";
type Props = {
  experience: any;
  index: number;
  length: number ;
  handleChange: (
    field: keyof FormType,
    value: string,
    subField?: string,
    index?: number
  ) => void;
  setActiveEditor: (editor: any) => void;
  handleAddExperience: () => void;
};
const ExperienceDetail = ({
  experience,
  index,
  handleChange,
  setActiveEditor,
  handleAddExperience,
  length,
}: Props) => {
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
  return (
    <div className="border-b group/detail relative flex items-start w-full gap-2 border hover:border-dashed hover:border-secondaryColor p-2">
      <div className="w-1/3 flex flex-col gap-4">
        <div className="flex items-center gap-2 justify-start w-full">
          <div
            onFocus={() => setActiveEditor(editorStart)}
            className={cn(
              "border rounded p-1 w-1/3",
              !editorStart?.isFocused &&
                "hover:border-dashed hover:border-secondaryColor",
              editorStart?.isFocused && "border-solid border-green-500"
            )}
          >
            <EditorContent editor={editorStart} />
          </div>
          <Minus />
          <div
            onFocus={() => setActiveEditor(editorEnd)}
            className={cn(
              "border rounded p-1 w-1/3",
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
            onFocus={() => setActiveEditor(editorCompany)}
            className={cn(
              "border rounded p-1",
              !editorCompany?.isFocused &&
                "hover:border-dashed hover:border-secondaryColor",
              editorCompany?.isFocused && "border-solid border-green-500"
            )}
          >
            <EditorContent editor={editorCompany} />
          </div>
        </div>
      </div>
      <div className="w-2/3 flex flex-col gap-2">
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
      <OptionsButtonCompoent index={index} length={length} handleAdd={handleAddExperience}/>
    </div>
  );
};

export default ExperienceDetail;
