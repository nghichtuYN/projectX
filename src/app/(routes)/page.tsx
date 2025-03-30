"use client";
import CompnayBoardComponent from "@/app/(routes)/(components)/CompanyBoardComponent";
// import DraggableForm from "@/components/DraggableForm";
import JobBoardComponent from "@/app/(routes)/(components)/JobBoardComponent";
import SearchFilter from "@/app/(routes)/(components)/SearchFilterComponent";
import { useAuthStore } from "@/store/UserStore";
import { useEffect } from "react";
// import "react-quill-new/dist/quill.snow.css";
// import dynamic from "next/dynamic";

// const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function Home() {
  
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
