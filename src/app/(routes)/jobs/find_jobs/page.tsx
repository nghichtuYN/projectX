"use client";
import React from "react";
import SearchFilterDetailPage from "../../(components)/SearchFilterDetailPageComponent";
import BreadCrumbComponent from "@/components/BreadCrumbComponent";
import FilterComponent from "./(components)/FilterComponent";
import FilterResultJobsComponent from "./(components)/FilterResultJobs/FilterResultJobsComponent";

const FindJobPage = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-accent">
      {/* SearchFilterDetailPage cố định ở trên cùng */}
      <SearchFilterDetailPage />

      {/* Container chính */}
      <div className="w-3/4 flex flex-col  h-fit">
        <BreadCrumbComponent />
        <div className="flex items-start mt-3 gap-3 ">
          {/* FilterComponent cố định bên trái */}
          <div className="w-[300px]  sticky top-[72px] ">
            <FilterComponent />
          </div>

          {/* FilterResultJobsComponent cuộn độc lập */}
          <div className="w-3/4 overflow-y-auto">
            <FilterResultJobsComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindJobPage;
