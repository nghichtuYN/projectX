import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import TextStyle from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
import History from "@tiptap/extension-history";
import { CustomTextStyle } from "@/lib/CustomTextStyle";
import { Color } from "@tiptap/extension-color"; // Import Color extension

export const useEditorHook = (
  content: string,
  field: string,
  onChange: (field: string, content: string) => void
) => {
  const handleChange = (field: string, newContent: string) => {
    onChange(field, newContent);
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle.configure({
        mergeNestedSpanStyles: true,
      }),
      FontFamily.configure({
        types: ["textStyle"],
      }),
      CustomTextStyle,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Color.configure({
        types: ["textStyle"], // Make sure the types are correctly configured
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class: "",
      },
    },
    onUpdate: ({ editor }) => {
      handleChange(field, editor.getHTML());
    },
  });

  return { editor };
};
