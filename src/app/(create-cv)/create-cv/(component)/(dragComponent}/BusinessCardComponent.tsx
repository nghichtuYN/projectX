import { useEditorHook } from "@/hooks/useEditorHook";
import React, { useContext } from "react";
import { CvFormContext } from "../CvFormComponent";
import { cn } from "@/lib/utils";
import { EditorContent } from "@tiptap/react";
type Props = {
  handleChange: (field: string, value: string) => void;
};
const BusinessCard = ({ handleChange }: Props) => {
  const contentName = `<p><span style="font-size: 48px; font-weight: bold;">Tên của bạn</span></p>`;

  const contentPosition = "";
  const placeholderName = "Tên của bạn";
  const placeholderPosition = "Vị trí ứng tuyển";
  const { editor: nameEditor } = useEditorHook(
    contentName,
    placeholderName,
    "email",
    handleChange
  );
  const { editor: positionEditor } = useEditorHook(
    contentPosition,
    placeholderPosition,
    "name",
    handleChange
  );

  const context = useContext(CvFormContext);
  const { setActiveEditor } = context;
  return (
    <div className="w-full min-h-40 h-fit hover:border-secondaryColor hover:border-2  rounded-md flex flex-col gap-2 p-5">
      <div
        className="h-full max-h-full m-3 w-full"
        onFocus={() => setActiveEditor(nameEditor)}
      >
        <EditorContent style={{ whiteSpace: "pre-line" }} editor={nameEditor} />
      </div>
      {/* <div className="w-full flex items-center"> */}
      <div
        onFocus={() => setActiveEditor(positionEditor)}
        className={cn(
          "h-full m-3 w-full min-w-28  border focus-visible::border-primaryColor focus-visible::border"
        )}
      >
        <EditorContent
          style={{ whiteSpace: "pre-line" }}
          editor={positionEditor}
        />
      </div>
      {/* <hr className="w-[120px] border border-orange-700" />
      </div> */}
    </div>
  );
};

export default BusinessCard;
