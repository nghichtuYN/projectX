"use client";
import CompnayBoardComponent from "@/app/(routes)/(components)/CompanyBoardComponent";

import JobBoardComponent from "@/app/(routes)/(components)/JobHighlight/JobBoardComponent";
import SearchFilter from "@/app/(routes)/(components)/SearchFilter/SearchFilterComponent";

export default function HomeClient() {
  return (
    <div className="flex flex-col items-center pb-8">
      <div className="w-full flex flex-col justify-center items-center bg-primaryColor">
        <div className="w-3/5 text-center mt-5 text-white text-sm">
          <p className="text-[26px] font-bold text-hoverColor">
            Tìm việc làm nhanh 24h, việc làm mới nhất trên toàn quốc.
          </p>
          <p className="pt-2">
            Tiếp cận 40,000+ tin tuyển dụng việc làm mỗi ngày từ hàng nghìn
            doanh nghiệp uy tín tại Việt Nam
          </p>
        </div>
        <SearchFilter />
      </div>
      <section className="w-full bg-accent flex justify-center items-start">
        <JobBoardComponent />
      </section>
      <section className="w-full flex justify-center bg-white items-start">
        <CompnayBoardComponent />
      </section>
    </div>
  );
}
