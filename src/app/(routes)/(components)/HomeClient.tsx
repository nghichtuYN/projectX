"use client";
import CompnayBoardComponent from "@/app/(routes)/(components)/CompanyBoardComponent";

import JobBoardComponent from "@/app/(routes)/(components)/JobBoardComponent";
import SearchFilter from "@/app/(routes)/(components)/SearchFilter/SearchFilterComponent";

export default function HomeClient() {
  return (
    <div className="flex flex-col items-center pb-8">
      <div className="w-full bg-primaryColor">
        <SearchFilter />
      </div>
      <section className="w-full bg-accent flex justify-center">
        <JobBoardComponent />
      </section>
      <section className="w-full flex justify-center  bg-white">
        <CompnayBoardComponent />
      </section>
    </div>
  );
}
