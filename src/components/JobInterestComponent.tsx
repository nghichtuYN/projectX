import React from "react";
import JobCardComponent from "./JobCardComponent";

const JobInterestComponent = () => {
  return (
    <>
      <p className="text-lg ml-2">Việc làm có thể bạn quan tâm</p>
          <div className="pt-4">
          <JobCardComponent
            companyImage="a"
            jD="aaaaaaaaaaa"
            jobSalary="12222222"
            posistion="Leader"
          />
          <JobCardComponent
            companyImage="a"
            jD="aaaaaaaaaaa"
            jobSalary="12222222"
            posistion="Leader"
          />
          <JobCardComponent
            companyImage="a"
            jD="aaaaaaaaaaa"
            jobSalary="12222222"
            posistion="Leader"
          />
          <JobCardComponent
            companyImage="a"
            jD="aaaaaaaaaaa"
            jobSalary="12222222"
            posistion="Leader"
          />
         
          </div>
          
    </>
  );
};

export default JobInterestComponent;
