"use client";
import BreadCrumbComponent from "@/components/BreadCrumbComponent";
import SearchFilterDetailPage from "../(components)/SearchFilterDetailPageComponent";
import FilterComponent from "./(component)/FilterComponent";
import FilterResultJobsComponent from "./(component)/FilterResultJobs/FilterResultJobsComponent";
import { useParams } from "next/navigation";

const FindJobPage = () => {
  const params = useParams();
  const slug = params?.slugSearch;
  console.log(slug);
  return (
    <div className="flex flex-col items-center min-h-screen bg-accent">
      {/* SearchFilterDetailPage cố định ở trên cùng */}
      <SearchFilterDetailPage />

      {/* Container chính */}
      <div className="w-3/4 flex flex-col  h-fit">
        <BreadCrumbComponent />
        <div className="flex items-start mt-3 gap-3 ">
          {/* FilterComponent cố định bên trái */}
          <div className="w-[360px]  sticky top-[72px] ">
            <FilterComponent />
          </div>

          {/* FilterResultJobsComponent cuộn độc lập */}
          <div className="w-full  overflow-y-auto">
            <FilterResultJobsComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindJobPage;
