import EmployerSidebaHeaderComponent from "@/components/EmployerSidebaHeaderComponent";
import React from "react";

const JobsPage = () => {
  return (
    <>
      <EmployerSidebaHeaderComponent>
        <div className="flex w-full items-center ">
          <p className="text-lg font-semibold text-secondaryColor">
            Quản lý tin tuyển dụng
          </p>
        </div>
      </EmployerSidebaHeaderComponent>
      <div className="mt-14 ml-8 mr-8">
        <div className="container mx-auto p-4 space-x-4 bg-accent">
            
        </div>
      </div>
    </>
  );
};

export default JobsPage;
