import React from "react";

import EmployerSidebaHeaderComponent from "@/components/EmployerSidebaHeaderComponent";
import CardVerify from "./components/CardVerify";
const VerifyPage = () => {
  return (
    <>
      <EmployerSidebaHeaderComponent>
        <div className="flex w-full items-center ">
          <p className="text-lg font-semibold text-secondaryColor">
            Xác thực tài khoản
          </p>
        </div>
      </EmployerSidebaHeaderComponent>
      <div className="flex items-center bg-accent  min-h-screen">
        <CardVerify />
      </div>
    </>
  );
};

export default VerifyPage;
