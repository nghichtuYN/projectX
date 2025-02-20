import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import TextStyle from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
import { CustomTextStyle } from "@/lib/CustomTextStyle";
import { Color } from "@tiptap/extension-color"; // Import Color extension
import Placeholder from "@tiptap/extension-placeholder";
export const useEditorHook = (
  content: string,
  placeHolder: string | "",
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
          "flex flex-col  justify-start pl-1 items-start w-full gap-3 font-medium rounded-bl-md rounded-br-md outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      handleChange(field, editor.getHTML());
    },
  });

  return { editor };
};
