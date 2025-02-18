"use client";
import { EditorContent, type Editor } from "@tiptap/react";
import React, { useState } from "react";

type Props = {
  editor?: Editor | null;
  phone?: string;
  onFocus?: () => void;
};

const PhoneComponent = ({ editor, phone, onFocus }: Props) => {
  if (!editor) {
    return null;
  }

  return (
    <>
      <div onFocus={onFocus} className="phone-component">
        <EditorContent style={{ whiteSpace: "pre-line" }} editor={editor} />
        <div className="phone-preview pt-3">
          <h3>Phone Preview</h3>
          <p>{phone}</p>
        </div>
      </div>
    </>
  );
};

export default PhoneComponent;
