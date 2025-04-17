import FormFieldComponent from "@/app/(auth)/(components)/FormFieldComponent";
import AlignTextComponent from "@/app/(create-cv)/create-cv/(component)/AlignTextComponent";
import BoldItalicUnderLine from "@/app/(create-cv)/create-cv/(component)/BoldItalicUnderLine";
import OrderTextComponent from "@/app/(create-cv)/create-cv/(component)/OrderTextComponent";
import UndoRedoComponent from "@/app/(create-cv)/create-cv/(component)/UndoRedoComponent";
import { useEditorHook } from "@/hooks/useEditorHook";
import { cn } from "@/lib/utils";
import { EditorContent } from "@tiptap/react";
import React from "react";
import { CompanyFormValues } from "./FormCreateCompany";
type Props = {
  form: any;
};
const Introduction = ({ form }: Props) => {
  const { editor } = useEditorHook(
    form.getValues("introduction"),
    "Nhập mô tả ",
    "introduction",
    (field, content) => form.setValue(field as keyof CompanyFormValues, content)
  );
  return (
    <FormFieldComponent
      control={form.control}
      name="introduction"
      label="Mô tả công ty"
      requrie={false}
      icon={null}
    >
      {(field) => (
        <div>
          <div className="border rounded-md">
            {editor && (
              <div className="flex items-center gap-2 ">
                <UndoRedoComponent editor={editor} />
                <BoldItalicUnderLine editor={editor} />
                <OrderTextComponent editor={editor} />
                <AlignTextComponent editor={editor} />
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

export default Introduction;
