"use client";
import CreateCvToolBarComponent from "@/app/(create-cv)/create-cv/(component)/CreateCvToolBarComponent";
;

import React from "react";
import CvFormComponent from "./(component)/CvFormComponent";

const CreateCvPage = () => {
  return (
    <div className="w-full mx-auto bg-accent">
      <div>
        <CreateCvToolBarComponent />
        <CvFormComponent />
      </div>
    </div>
  );
};

export default CreateCvPage;
