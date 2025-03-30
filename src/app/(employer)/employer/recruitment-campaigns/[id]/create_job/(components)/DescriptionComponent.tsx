import { useEditorHook } from "@/hooks/useEditorHook";
import React from "react";
import { JobFormValues } from "./FormCreateJobComponent";
import { Button } from "@/components/ui/button";
import { Bold, Italic, List, ListOrdered } from "lucide-react";
import { cn } from "@/lib/utils";
import { EditorContent } from "@tiptap/react";
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
    <div className="">
      <label className="text-sm font-medium">Mô tả công việc *</label>
      <div className="border rounded-md">
        {/* Toolbar */}
        {editor && (
          <div className="flex gap-2 p-2 border-b bg-gray-50">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              <Bold size={18} />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleItalic().run()}
            >
              <Italic size={18} />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
              <List size={18} />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
            >
              <ListOrdered size={18} />
            </Button>
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
          <EditorContent editor={editor} />
        </div>
      </div>
      {form.formState.errors.description && (
        <p className="text-sm text-red-500">
          {form.formState.errors.description.message}
        </p>
      )}
    </div>
  );
};

export default DescriptionComponent;
