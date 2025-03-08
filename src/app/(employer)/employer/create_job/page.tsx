import React from "react";
import FormCreateJobComponent from "./(components)/FormCreateJobComponent";
import EmployerSidebaHeaderComponent from "@/components/EmployerSidebaHeaderComponent";

const CreateJobPage = () => {
  return (
    <>
      <EmployerSidebaHeaderComponent>
        <div className="flex w-full items-center ">
          <p className="text-lg font-semibold text-secondaryColor">
            Tạo tin tuyển dụng
          </p>
        </div>
      </EmployerSidebaHeaderComponent>
      <div className="mt-14 pl-8 pr-8">
        <p className="text-lg font-semibold p-3">Điền thông tin tuyển dụng </p>
        <div className="p-3">
          <FormCreateJobComponent />
        </div>
        aaaa
      </div>
    </>
  );
};

export default CreateJobPage;
