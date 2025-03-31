import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import TextAlign from "@tiptap/extension-text-align";
import FontFamily from "@tiptap/extension-font-family";
import { CustomTextStyle } from "@/lib/CustomTextStyle";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import { Color } from "@tiptap/extension-color"; // Import Color extension
import Placeholder from "@tiptap/extension-placeholder";
import { FormType } from "@/types/formCvtype";
import OrderedList from "@tiptap/extension-ordered-list";
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
      Placeholder.configure({
        placeholder: placeHolder,
      }),
      Paragraph,
      Text,
      TextAlign.configure({
        types: ["paragraph"],
      }),
      FontFamily.configure({
        types: ["textStyle"],
      }),
      CustomTextStyle,
      BulletList,
      ListItem,
      OrderedList,
      Color.configure({
        types: ["textStyle"],
      }),
    ],
    immediatelyRender: false,
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
      editor.commands.setContent(content);
    }
  }, [content, editor]);
  return { editor };
};
