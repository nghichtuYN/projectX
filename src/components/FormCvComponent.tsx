"use client";
import React, { useState } from "react";
import TipTab from "./Tiptab";

const FormCVComponent = () => {
  const [content, setContent] = useState<string>("");

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(content);
    // setContent("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full grid place-items-center mx-auto border-none pt-10 mb-10"
    >
      <TipTab
        content={content}
        onChange={(newContent: string) => handleContentChange(newContent)}
      />
    </form>
  );
};

export default FormCVComponent;
