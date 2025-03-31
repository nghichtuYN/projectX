import { useEditorHook } from "@/hooks/useEditorHook";
import React from "react";
import { JobFormValues } from "./FormCreateJobComponent";
import { Button } from "@/components/ui/button";
import { Bold, Italic, List, ListOrdered } from "lucide-react";
import { cn } from "@/lib/utils";
import { EditorContent } from "@tiptap/react";
import FormFieldComponent from "@/app/(auth)/(components)/FormFieldComponent";
import TextToolBarComponent from "@/app/(create-cv)/create-cv/(component)/TextToolBarComponent";
import FontFamilyComponent from "@/app/(create-cv)/create-cv/(component)/FontFamilyComponent";
import FontSizeComponent from "@/app/(create-cv)/create-cv/(component)/FontSizeComponent";
import AlignTextComponent from "@/app/(create-cv)/create-cv/(component)/AlignTextComponent";
import BoldItalicUnderLine from "@/app/(create-cv)/create-cv/(component)/BoldItalicUnderLine";
import OrderTextComponent from "@/app/(create-cv)/create-cv/(component)/OrderTextComponent";
import ColorTextComponent from "@/app/(create-cv)/create-cv/(component)/ColorTextComponent";
import UndoRedoComponent from "@/app/(create-cv)/create-cv/(component)/UndoRedoComponent";
type Props = {
  form: any;
};
const DescriptionComponent = ({ form }: Props) => {
  const { editor } = useEditorHook(
    form.getValues("description"),
    "Nhập mô tả công việc...",
    "description",
    (field, content) => form.setValue(field as keyof JobFormValues, content)
  );

  return (
    <FormFieldComponent
      control={form.control}
      name="description"
      label="Chức vụ công việc"
      requrie
      icon={null}
    >
      {(field) => (
        <div>
          <div className="border rounded-md">
            {editor && (
              <div className="grid grid-cols-3 ">
                <BoldItalicUnderLine editor={editor} />
                <FontSizeComponent editor={editor} />
                <AlignTextComponent editor={editor} />
                <div className="col-span-3 flex">
                  <div className="flex items-center w-1/2 justify-between">
                    <FontFamilyComponent editor={editor} />
                    <OrderTextComponent editor={editor} />
                  </div>

                  <div className="flex items-center w-1/2 justify-around">
                    <ColorTextComponent editor={editor} />
                    <UndoRedoComponent editor={editor} />
                  </div>
                </div>
              </div>
            )}
            <div
              className={cn(
                "border rounded p-1 w-full h-32 overflow-y-scroll ",
                !editor?.isFocused &&
                  "hover:border-dashed hover:border-secondaryColor",
                editor?.isFocused && "border-solid border-green-500"
              )}
            >
              <EditorContent editor={editor} {...field} />
            </div>
          </div>
        </div>
      )}
    </FormFieldComponent>
  );
};

export default DescriptionComponent;
