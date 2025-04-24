import React from "react";
import CardVerify from "../../employer-verify/components/CardVerify";
import UseInfo from "./components/UseInfo";

const EmployerInfoPage = () => {
  return (
    <div className="flex flex-col items-center w-full p-3 gap-3">
      <CardVerify />
      <UseInfo />
    </div>
  );
};

export default EmployerInfoPage;
