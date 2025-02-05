import React from "react";
import JobTypeDetailPageComponent from "./JobTypeDetailPageComponent";
import SearchPositonDetailPageComponent from "./SearchPositonDetailPageComponent";
import LocationDetailPageComponent from "./LocationDetailPageComponent";
import { Button } from "./ui/button";

const SearchFilterDetailPage = () => {

  return (
    <section className="w-full mx-auto py-2 px-4 h-[72px] justify-center flex items-center bg-primaryColor">
      <div className="flex items-center w-3/4 gap-2">
        <div className="grid grid-cols-5 items-center  justify-center w-full  h-11  mx-auto bg-white rounded-md">
          <JobTypeDetailPageComponent />
          <div className="col-span-4 relative flex  items-center">
            <SearchPositonDetailPageComponent />
            <LocationDetailPageComponent />
          </div>
        </div>
        <Button size={"lg"} className="h-11">
          Tìm kiếm
        </Button>
      </div>
    </section>
  );
};

export default SearchFilterDetailPage;
