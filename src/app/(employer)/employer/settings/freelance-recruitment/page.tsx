import React from "react";
import FormFreelance from "./components/FormFreelance";

const FreelanceRecruitmentPage = () => {
  return (
    <div className="container flex flex-col gap-4 mt-3 px-3">
      <div className="text-sm font-semibold">
        Giấy tờ xác thực nhà tuyển dụng tự do
      </div>
      <FormFreelance />
    </div>
  );
};

export default FreelanceRecruitmentPage;
