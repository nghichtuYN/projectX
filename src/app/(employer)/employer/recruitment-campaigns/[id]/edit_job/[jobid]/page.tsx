"use client";

import React from "react";

import EmployerSidebaHeaderComponent from "@/components/EmployerSidebaHeaderComponent";
import FormEditJob from "./(component)/FormEditJob";

const EditJobPage = () => {
  return (
    <>
      <EmployerSidebaHeaderComponent>
        <div className="flex w-full items-center ">
          <p className="text-lg font-semibold text-secondaryColor">
            Cập nhật tin tuyển dụng
          </p>
        </div>
      </EmployerSidebaHeaderComponent>
      <div className="mt-14 pl-8 pr-8 w-full">
        <div className="p-3">
          <FormEditJob />
        </div>
      </div>
    </>
  );
};

export default EditJobPage;
