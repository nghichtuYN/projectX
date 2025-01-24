import React from "react";

import JobTypeComponent from "./JobTypeComponent";
import LocatonComponent from "./LocatonComponent";
import SearchPositionComponent from "./SearchPositionComponent";
import ButtonSearchComponent from "./ButtonSearchComponent";
import ListJobComponent from "./ListJobComponent";
import ImageCaruelComponent from "./ImageCaruelComponent";
const SearchFilter = () => {
  return (
    <section className=" mx-auto py-8 px-2 bg-primaryColor h-auto place-items-center ">
      <div className=" grid grid-cols-10 items-center  min-w-80 xl:w-[1145px]  md:min-w-[600px] bg-white  max-h-20 h-13 rounded-3xl h-14">
        <div className="hidden lg:block p-1 lg:col-span-2">
          <JobTypeComponent />
        </div>
        <div className="search-filter mr-5 col-span-8 rounded-3xl  lg:col-span-6">
          <SearchPositionComponent />
        </div>
        <div className="lg:col-span-1 hidden lg:block ml-2">
          <LocatonComponent />
        </div>
        <div className="ml-1 col-span-2 flex justify-end lg:col-span-1 ">
          <ButtonSearchComponent />
        </div>
      </div>
      <div className="flex gap-1 justify-start  lg:max-w-[1145px] xl:w-[1145px] pt-2 max-w-[600px]">
        <div className="hidden lg:block">
          <ListJobComponent />
        </div>
        <div className="flex justify-start w-full">
          <ImageCaruelComponent />
        </div>
      </div>
      {/* <Select>
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hanoi">Ha Noi</SelectItem>
            <SelectItem value="hcm">Ho Chi Minh</SelectItem>
            <SelectItem value="danang">Da Nang</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fresher">Fresher</SelectItem>
            <SelectItem value="junior">Junior</SelectItem>
            <SelectItem value="senior">Senior</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Major" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="frontend">Frontend</SelectItem>
            <SelectItem value="backend">Backend</SelectItem>
            <SelectItem value="fullstack">Fullstack</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Contract Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fulltime">Full Time</SelectItem>
            <SelectItem value="parttime">Part Time</SelectItem>
            <SelectItem value="contract">Contract</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" className="w-full bg-white">
          Reset filter
        </Button> */}
      {/* </div> */}
    </section>
  );
};

export default SearchFilter;
