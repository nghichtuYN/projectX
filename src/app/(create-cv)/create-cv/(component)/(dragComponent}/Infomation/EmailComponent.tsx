"use client";
import { EditorContent, type Editor } from "@tiptap/react";
import React, { useState } from "react";

type Props = {
  email?: string;
  editor?: Editor | null;
  onFocus?: () => void;
};

const EmailComponent = ({ editor, email, onFocus }: Props) => {
  if (!editor) {
    return null;
  }

  return (
    <>
      <div onFocus={onFocus} className="email-component">
        <EditorContent style={{ whiteSpace: "pre-line" }} editor={editor} />
        <div className="email-preview pt-3 flex ">
          <h3>Email Preview</h3>
          <p>{email}</p>
        </div>
      </div>
    </>
  );
};

export default EmailComponent;
