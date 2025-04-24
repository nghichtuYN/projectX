"use client";
import JobTypeDetailPageComponent from "./JobTypeDetailPageComponent";
import SearchPositonDetailPageComponent from "./SearchPositonDetailPageComponent";
import LocationDetailPageComponent from "./LocationDetailPageComponent";
import { Button } from "../../../../components/ui/button";

import { useCallback } from "react";
import { getJobsQuery } from "@/queries/queries";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const SearchFilterDetailPage = () => {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchValue = searchParams.get("search") || "";
  const companyName = searchParams.get("companyName") || null;
  const locations = searchParams.getAll("locations");
  const majors = searchParams.getAll("majors");
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    router.replace(`${pathName}?${params.toString()}`);
  }, 300);

  const handeCompanyName = (term: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("companyName", term);
    } else {
      params.delete("companyName");
    }
    router.replace(`${pathName}?${params.toString()}`);
  };
  const handleSelectLocation = useCallback(
    (locationId: string, isSelected: boolean) => {
      const params = new URLSearchParams(searchParams);
      if (isSelected) {
        const updatedLocations = locations.filter((loc) => loc !== locationId);
        params.delete("locations");
        updatedLocations.forEach((loc) => params.append("locations", loc));
      } else {
        params.append("locations", locationId);
      }

      router.replace(`${pathName}?${params.toString()}`, { scroll: false });
    },
    [locations, pathName, router, searchParams]
  );
  const handleSelectMajor = useCallback(
    (majorId: string, isSelected: boolean) => {
      const params = new URLSearchParams(searchParams);
      if (isSelected) {
        const updatedMajors = majors.filter((major) => major !== majorId);
        params.delete("majors");
        updatedMajors.forEach((major) => params.append("majors", major));
      } else {
        params.append("majors", majorId);
      }

      router.replace(`${pathName}?${params.toString()}`, { scroll: false });
    },
    [majors, pathName, router, searchParams]
  );
  const { data: jobs } = getJobsQuery(
    searchValue,
    5,
    locations,
    majors,
    companyName
  );
  const handleFindJob = () => {
    router.push(`/find-jobs?${searchParams.toString()}`);
  };
  return (
    <section className="w-full mx-auto py-2 px-4 h-[72px] justify-center sticky top-0 z-10 flex items-center bg-primaryColor">
      <div className="flex items-center w-3/4 gap-2">
        <div className="grid grid-cols-5 items-center  justify-center w-full  h-11  mx-auto bg-white rounded-md">
          <JobTypeDetailPageComponent
            major={majors}
            handleSelect={handleSelectMajor}
          />
          <div className="col-span-4 relative flex  items-center">
            <SearchPositonDetailPageComponent
              search={searchValue}
              handleSearch={handleSearch}
              jobs={jobs?.items}
              companyName={companyName}
              handeCompanyName={handeCompanyName}
            />
            <LocationDetailPageComponent
              location={locations}
              handleSelect={handleSelectLocation}
            />
          </div>
        </div>
        <Button onClick={handleFindJob} size={"lg"} className="h-11">
          Tìm kiếm
        </Button>
      </div>
    </section>
  );
};

export default SearchFilterDetailPage;
