import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

import FontFamily from "@tiptap/extension-font-family";
import { CustomTextStyle } from "@/lib/CustomTextStyle";
import { Color } from "@tiptap/extension-color"; // Import Color extension
import Placeholder from "@tiptap/extension-placeholder";
import { FormType } from "@/types/fromCvtype";
export const useEditorHook = (
  content: string,
  placeHolder: string | "",
  field: keyof FormType,
  onChange: (
    field: keyof FormType,
    content: string,
    subField?: string,
    index?: number
  ) => void,
  subField?: string,
  index?: number
) => {
  const handleChange = (
    field: keyof FormType,
    newContent: string,
    subField?: string,
    index?: number
  ) => {
    onChange(field, newContent, subField, index);
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder: placeHolder,
      }),
      FontFamily.configure({
        types: ["textStyle"],
      }),
      CustomTextStyle,
      Color.configure({
        types: ["textStyle"],
      }),
    ],
    immediatelyRender: false,
    content: content,
    editorProps: {
      attributes: {
        class:
          "flex flex-col focus:border pl-1  justify-start  items-start w-full  font-medium  rounded-md outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      handleChange(field, editor.getHTML(), subField, index);
    },
  });

  return { editor };
};
