"use client";
import React from "react";
import JobTypeComponent from "./JobTypeComponent";
import LocatonComponent from "./LocatonComponent";
import SearchPositionComponent from "./SearchPositionComponent";
import ButtonSearchComponent from "./ButtonSearchComponent";
import ListJobComponent from "./ListJobComponent";
import ImageCaruelComponent from "./ImageCaruelComponent";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const SearchFilter = () => {
  const pathname = usePathname();

  return (
    <section className=" mx-auto py-8 px-4 bg-primaryColor">
      <div className="relative grid  grid-cols-9 lg:grid-cols-12 items-center bg-white rounded-3xl max-h-20 h-14 w-4/5 mx-auto">
        {/* Job Type Component */}
        <div
          className={cn(
            pathname === "/" ? "hidden" : "hidden lg:block lg:col-span-2 p-2"
          )}
        >
          <JobTypeComponent />
        </div>

        {/* Search Filter */}
        <div
          className={cn(
            "text-sm ml-2  ",
            pathname === "/" ? "col-span-8 " : " col-span-8  lg:col-span-6 pr-2"
          )}
        >
          <SearchPositionComponent />
        </div>

        {/* Location Component */}
        <div
          className={cn(
            "hidden lg:block lg:mr-12",
            pathname === "/"
              ? " lg:col-span-3  ml-2  "
              : "   lg:col-span-3 mr-2"
          )}
        >
          <LocatonComponent />
        </div>

        {/* Search Button */}
        <div className="col-span-1 ml-6 flex justify-end lg:col-span-1 ">
          <ButtonSearchComponent />
        </div>
      </div>

      {/* Content Section */}
      <div className="flex lg:flex-row gap-2 w-4/5 mx-auto pt-4">
        {/* List Job Component */}
        <div className="hidden lg:block lg:w-1/3">
          <ListJobComponent />
        </div>

        {/* Image Carousel */}
        <div className="flex w-full lg:w-2/3">
          <ImageCaruelComponent />
        </div>
      </div>
    </section>
  );
};

export default SearchFilter;
