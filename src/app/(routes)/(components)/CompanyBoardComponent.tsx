import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../components/ui/carousel";
import { Button } from "../../../components/ui/button";
import CompanyCardComponent from "./CompanyCardComponent";
import { getAllMajors } from "@/queries/queries";
import { chunkArray, cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const CompnayBoardComponent = () => {
  const { data: majors } = getAllMajors("", 0, 1, true);
  const [majorState, setMajor] = useState("");
  const majorChunks = chunkArray(majors?.items || [], 7);

  return (
    <div className=" w-3/4 flex flex-col items-center mt-10 justify-start shadow-md rounded-lg min-h-[65vh] h-fit">
      <div className="h-1/5 w-full flex items-center justify-start bg-gradient-to-br  from-green-500/10 to-emerald-500/20 p-5 rounded-t-md">
        <div className="flex flex-col gap-4  text-secondaryColor ">
          <p className="w-full text-2xl font-bold">Thương hiệu tiêu biểu</p>
          <p className="w-full text-md font-normal">
            Những thương hiệu tuyển dụng đã khẳng định được vị thế trên thị
            trường
          </p>
        </div>
      </div>
      <div className="h-4/5 w-full flex flex-col pt-2">
        <div className=" relative ">
          <Carousel className="max-w-full pl-3 pr-3 ">
            <CarouselContent className="w-full">
              {majorChunks.map((chunk, index) => (
                <CarouselItem
                  key={index}
                  className="md:flex hidden md:justify-start py-2 gap-4"
                >
                  {index === 0 && (
                    <Badge
                      onClick={() => setMajor("")}
                      className={cn(
                        " text-sm rounded-3xl font-medium bg-white hover:bg-secondaryColor cursor-pointer hover:text-white",
                        majorState === ""
                          ? "bg-secondaryColor text-white"
                          : "text-black"
                      )}
                    >
                      Ngẫu Nhiên
                    </Badge>
                  )}
                  {chunk.map((major) => (
                    <Badge
                      onClick={() => setMajor(major?.id)}
                      key={major?.id}
                      className={cn(
                        "text-sm rounded-3xl font-medium bg-white hover:bg-secondaryColor cursor-pointer hover:text-white",
                        majorState === major?.id
                          ? "bg-secondaryColor text-white"
                          : "text-black"
                      )}
                    >
                      {major?.name}
                    </Badge>
                  ))}
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <div className="w-full relative ">
          <Carousel className="">
            <CarouselContent className="mt-3">
              <CarouselItem>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 pl-2 pr-2 place-items-center w-full gap-3 mx-auto">
                  <CompanyCardComponent />
                  <CompanyCardComponent />
                  <CompanyCardComponent />
                  <CompanyCardComponent />
                  <CompanyCardComponent />
                  <CompanyCardComponent />
                  <CompanyCardComponent />
                  <CompanyCardComponent />
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 pl-2 pr-2 place-items-center w-full gap-3 mx-auto">
                  <CompanyCardComponent />
                  <CompanyCardComponent />
                  <CompanyCardComponent />
                  <CompanyCardComponent />
                  <CompanyCardComponent />
                  <CompanyCardComponent />
                  <CompanyCardComponent />
                  <CompanyCardComponent />
                  <CompanyCardComponent />
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 pl-2 pr-2 place-items-center w-fit gap-3 mx-auto">
                  <CompanyCardComponent />
                  <CompanyCardComponent />
                  <CompanyCardComponent />
                  <CompanyCardComponent />
                  <CompanyCardComponent />
                  <CompanyCardComponent />
                  <CompanyCardComponent />
                  <CompanyCardComponent />
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 text-secondaryColor" />
            <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 text-secondaryColor" />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default CompnayBoardComponent;
