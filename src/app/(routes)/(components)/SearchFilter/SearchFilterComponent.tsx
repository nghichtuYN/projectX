"use client";
import React, { useState } from "react";
import LocatonComponent from "./LocatonComponent";
import SearchPositionComponent from "./SearchPositionComponent";
import ButtonSearchComponent from "../ButtonSearchComponent";
import ListJobComponent from "../ListJobComponent";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import ImageCaruelComponent from "../ImageCaruelComponent";

import { useDebounce } from "use-debounce";
import { getJobsQuery } from "@/queries/queries";
const SearchFilter = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [locations, setLocations] = useState<string[]>([]);
  const [majors, setMajors] = useState<string[]>([]);
  const [searchTerm] = useDebounce(search, 500);
  const searchParams = useSearchParams();
  const [companyName, setCompanyName] = useState<string | null>(null);

  const { data: jobs } = getJobsQuery(
    searchTerm,
    5,
    locations,
    majors,
    companyName,
    // { enabled: !!searchTerm }
  );
  console.log(jobs);
  const handleClick = () => {
    // const slug = slugify(search, { lower: true, locale: "vi" });
    const params = new URLSearchParams(searchParams);
    if (searchTerm) params.set("search", searchTerm);
    if (companyName) params.set("companyName", companyName);
    if (majors) majors.forEach((major) => params.append("majors", major));
    if (locations)
      locations.forEach((location) => {
        params.append("locations", location);
      });
    router.push(`/find-jobs?${params.toString()}`);
  };
  return (
    <section className=" mx-auto py-8  bg-primaryColor">
      <div className="relative flex items-center gap-1 bg-white rounded-3xl  h-13 lg:w-3/4 w-5/6  mx-auto">
        <div className="flex gap-1 items-center xl:basis-[60%] p-1 basis-full">
          <div
            className={cn(
              "text-sm  after:content-['']  basis-full pl-2 after:h-9 after:w-[1px] after:bg-[#2d2d2d] after:opacity-10",
              pathname === "/" && " xl:basis-3/4"
            )}
          >
            <SearchPositionComponent
              jobs={jobs?.items}
              search={search}
              setSearch={setSearch}
              companyName={companyName}
              setCompanyName={setCompanyName}
            />
          </div>
        </div>

        {/* Location Component */}
        <div
          className={cn(
            "relative after:content-[''] after:h-9 after:w-[1px] after:absolute after:-right-1 after: after:top-1 after:bg-[#2d2d2d] after:opacity-10",
            "hidden xl:block  ",
            pathname === "/" ? " xl:basis-[27%]" : "xl:basis-[27%] "
          )}
        >
          <LocatonComponent location={locations} setLocation={setLocations} />
        </div>

        {/* Search Button */}
        <div className="col-span-1 flex items-center justify-center    xl:basis-[13%] pr-2">
          <ButtonSearchComponent handleClick={handleClick} />
        </div>
      </div>

      {/* Content Section */}
      <div className="flex xl:flex-row gap-2 lg:w-3/4 w-5/6 mx-auto pt-4">
        <div className="hidden xl:block xl:w-1/3 min-h-[290xp]">
          <ListJobComponent />
        </div>
        <div className="flex w-full xl:w-2/3">
          <ImageCaruelComponent />
        </div>
      </div>
    </section>
  );
};

export default SearchFilter;
