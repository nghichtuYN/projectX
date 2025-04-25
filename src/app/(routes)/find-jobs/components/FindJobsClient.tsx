"use client";
import BreadCrumbComponent from "@/components/BreadCrumbComponent";
import { useSearchParams } from "next/navigation";

import { getJobsQuery } from "@/queries/queries";
import SearchFilterDetailPage from "../../(components)/SearchFilterDetail/SearchFilterDetailPageComponent";
import FilterComponent from "./FilterComponent";
import FilterResultJobsComponent from "./FilterResultJobs/FilterResultJobsComponent";

const FindJobsClient = () => {
  const searchParams = useSearchParams();

  const searchValue = searchParams.get("search") || "";
  const companyName = searchParams.get("companyName") || null;
  const locations = searchParams.getAll("locations");
  const majors = searchParams.getAll("majors");
  const jobLevels = searchParams.getAll("jobLevels");
  const jobTypes = searchParams.getAll("jobTypes");
  const contractTypes = searchParams.getAll("contractTypes");
  const minSalary = searchParams.get("minSalary") || undefined;
  const maxSalary = searchParams.get("maxSalary") || undefined;
  const minExp = searchParams.get("minExp") || undefined;
  const maxExp = searchParams.get("maxExp") || undefined;

  const { data: jobs, refetch } = getJobsQuery(
    searchValue,
    5,
    locations,
    majors,
    companyName,
    jobLevels,
    minSalary,
    maxSalary,
    contractTypes,
    jobTypes,
    minExp,
    maxExp
  );
  return (
    <div className="flex flex-col items-center min-h-screen bg-accent">
      <SearchFilterDetailPage />
      <div className="w-3/4 flex flex-col  h-fit">
        <BreadCrumbComponent />
        <div className="flex items-start mt-3 gap-3 ">
          <div className="w-[360px]  sticky top-[72px] ">
            <FilterComponent />
          </div>
          <div className="w-full  overflow-y-auto">
            <FilterResultJobsComponent jobs={jobs?.items} refetch={refetch} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindJobsClient;
