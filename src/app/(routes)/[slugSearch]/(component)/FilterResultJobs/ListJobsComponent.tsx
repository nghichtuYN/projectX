import React from "react";
import JobComponent from "./JobComponent";

const ListJobsComponent = () => {
  return (
    <div className="flex flex-col gap-3">
      {[...Array(100)].map((_, i) => (
        <JobComponent key={i} />
      ))}
    </div>
  );
};

export default ListJobsComponent;
