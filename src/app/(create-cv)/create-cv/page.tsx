// In src/app/(create-cv)/create-cv/page.tsx:
"use client";
import React from "react";
import dynamic from "next/dynamic";

const CvFormComponent = dynamic(
  () => import("./(component)/CvFormComponent"),
  { ssr: false }
);

const CreateCvPage = () => {
  return (
    <div className="w-full mx-auto bg-accent">
      <CvFormComponent />
    </div>
  );
};

export default CreateCvPage;