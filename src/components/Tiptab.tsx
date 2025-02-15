"use client";
import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import ToolbarCvComponent from "./ToolbarCvComponent";
import Heading from "@tiptap/extension-heading";
import TextStyle from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
import { DndContext } from "@dnd-kit/core";
import { layout1 } from "@/data/layout1";

type Props = {
  onChange: (newContent: string) => void;
  content: string;
};

const CustomTextStyle = TextStyle.extend({
  addAttributes() {
    return {
      fontSize: {
        default: null,
        parseHTML: (element) => element.style.fontSize || null,
        renderHTML: (attributes) => {
          if (!attributes.fontSize) return {};
          return { style: `font-size: ${attributes.fontSize}` };
        },
      },
      lineHeight: {
        default: null,
        parseHTML: (element) => element.style.lineHeight || null,
        renderHTML: (attributes) => {
          if (!attributes.lineHeight) return {};
          return { style: `line-height: ${attributes.lineHeight}` };
        },
      },
      fontFamily: {
        default: null,
        parseHTML: (element) => element.style.fontFamily || null,
        renderHTML: (attributes) => {
          if (!attributes.fontFamily) return {};
          return { style: `font-family: ${attributes.fontFamily}` };
        },
      },
    };
  },
});

const TipTab = ({ onChange, content }: Props) => {
  const handleChange = (newContent: string) => {
    onChange(newContent);
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
    ],
    editorProps: {
      attributes: {
        class:
          "flex flex-col px-4 py-3 justify-start border-gray-700 text-gray-400 items-start w-full gap-3 font-medium text-[16px] pt-4 rounded-bl-md rounded-br-md outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
  });

  const [layout, setLayout] = React.useState(layout1);
  return (
    <div className="w-full px-4">
      <ToolbarCvComponent editor={editor} content={content} />
      <EditorContent style={{ whiteSpace: "pre-line" }} editor={editor}>
        <DndContext>
          <div>
            {layout1.rows.map((row, rowIndex) => (
              <div key={rowIndex} className="gap-2">
                <div style={{ display: "flex" }}>
                  {row.columns.map((column, colIndex) => (
                    <div
                      key={colIndex}
                      style={{ border: "1px solid gray", padding: "10px" }}
                    >
                      {column.content.map((item, itemIndex) => (
                        <p key={itemIndex}>{item.name}</p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </DndContext>
      </EditorContent>
    </div>
  );
};

export default TipTab;
