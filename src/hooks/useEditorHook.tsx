import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import FontFamily from "@tiptap/extension-font-family";
import { CustomTextStyle } from "@/lib/CustomTextStyle";
import { Color } from "@tiptap/extension-color"; // Import Color extension
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect } from "react";
export const useEditorHook = <T,>(
  content: string,
  placeHolder: string | "",
  field: keyof T,
  onChange: (
    field: keyof T,
    content: string,
    subField?: string,
    index?: number
  ) => void,
  subField?: string,
  index?: number
) => {
  const handleChange = (
    field: keyof T,
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
      Placeholder.configure({ placeholder: placeHolder }),
      TextAlign.configure({ types: ["paragraph"] }),
      FontFamily.configure({ types: ["textStyle"] }),
      CustomTextStyle,
      Color.configure({ types: ["textStyle"] }),
    ],
    immediatelyRender: true,
    content: content,
    editorProps: {
      attributes: {
        class: "pl-1  h-full font-medium  rounded-md outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      handleChange(field, editor.getHTML(), subField, index);
    },
  });
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      setTimeout(() => {
        editor.commands.setContent(content);
      }, 0);
    }
  }, [content, editor, index]);
  return { editor };
};
