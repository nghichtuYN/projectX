"use client";
import React, { useState, useEffect, useRef } from "react";
import NavCvComponent from "./NavCvComponent";
import EmailComponent from "./(dragComponent}/Infomation/EmailComponent";
import ToolbarCvComponent from "@/app/(create-cv)/create-cv/(component)/ToolbarCvComponent";
import PhoneComponent from "./(dragComponent}/Infomation/PhoneComponent";
import { useEditorHook } from "@/hooks/useEditorHook";
import { Editor } from "@tiptap/react";
import TextToolBarComponent from "./TextToolBarComponent";
import InfomationComponent from "./(dragComponent}/Infomation/InfomationComponent";

const CvFormComponent = () => {
  const [form, setForm] = useState({
    email: "",
    phone: "",
    social: "",
    address: "",
    color: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      [field]: value,
    }));
  };

  const { editor: editorEmail } = useEditorHook(
    "test@gmail.com",
    "email",
    handleChange
  );
  const { editor: editorPhone } = useEditorHook(
    "0123456789",
    "phone",
    handleChange
  );

  const [activeEditor, setActiveEditor] = useState<Editor | null>(null);
  const toolbarRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    const selectContent = document.querySelector("[data-state='open']");

    if (
      activeEditor &&
      toolbarRef.current &&
      !toolbarRef.current.contains(event.target as Node) &&
      !activeEditor.view.dom.contains(event.target as Node) &&
      !selectContent
    ) {
      setActiveEditor(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeEditor]);
  console.log(Object.entries(form)?.length)
  return (
    <div>
      {activeEditor !== null ? (
        <div
          ref={toolbarRef}
          className={`transition-all duration-300 ease-in-out ${
            activeEditor
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-[-20px]"
          } ${activeEditor ? "pointer-events-auto" : "pointer-events-none"}`}
        >
          <TextToolBarComponent editor={activeEditor} />
        </div>
      ) : (
        <ToolbarCvComponent
          color={form.color}
          handleChangeColor={handleChange}
        />
      )}
      <div className="flex flex-wrap">
        <div className="w-fit">
          <NavCvComponent />
        </div>
        <div>
          <InfomationComponent />
          <EmailComponent
            email={form.email}
            editor={editorEmail}
            onFocus={() => setActiveEditor(editorEmail)}
          />
          <PhoneComponent
            phone={form.phone}
            onFocus={() => setActiveEditor(editorPhone)}
            editor={editorPhone}
          />
        </div>
      </div>
    </div>
  );
};

export default CvFormComponent;
