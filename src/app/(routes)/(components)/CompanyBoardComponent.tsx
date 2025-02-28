import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../components/ui/carousel";
import { Button } from "../../../components/ui/button";
import CompanyCardComponent from "./CompanyCardComponent";

const CompnayBoardComponent = () => {
  return (
    <div className=" w-3/4 flex flex-col items-center mt-10 justify-center shadow-md rounded-lg min-h-[65vh] ">
      <div className="h-1/5 w-full flex items-center justify-start">
        <div className="flex flex-col gap-4 pl-20 text-secondaryColor">
          <p className="w-full text-2xl font-bold">Thương hiệu tiêu biểu</p>
          <p className="w-full text-md font-normal">
            Những thương hiệu tuyển dụng đã khẳng định được vị thế trên thị
            trường
          </p>
        </div>
      </div>
      <div className="h-4/5  flex flex-col pt-2">
        <div className="w-full relative flex items-center justify-center gap-2">
          <Carousel className="w-full pl-3 pr-3">
            <CarouselContent className="w-full">
              <CarouselItem className="md:flex hidden gap-4 md:justify-center ml-3 md:pl-0">
                <Button
                  variant="secondary"
                  className="rounded-full font-medium"
                >
                  Ngẫu Nhiên11111111
                </Button>
                <Button
                  variant="secondary"
                  className="rounded-full font-medium"
                >
                  Ngẫu Nhiên
                </Button>
                <Button
                  variant="secondary"
                  className="rounded-full font-medium"
                >
                  Ngẫu Nhiên
                </Button>
                <Button
                  variant="secondary"
                  className="rounded-full font-medium"
                >
                  Ngẫu Nhiên
                </Button>
                <Button
                  variant="secondary"
                  className="rounded-full font-medium"
                >
                  Ngẫu Nhiên
                </Button>
                <Button
                  variant="secondary"
                  className="rounded-full font-medium"
                >
                  Ngẫu Nhiên
                </Button>
                <Button
                  variant="secondary"
                  className="rounded-full font-medium"
                >
                  Ngẫu Nhiên
                </Button>
                <Button
                  variant="secondary"
                  className="rounded-full font-medium"
                >
                  Ngẫu Nhiên
                </Button>
              </CarouselItem>
              <CarouselItem className="md:flex hidden md:justify-center md:pl-0">
                <Button
                  variant="secondary"
                  className="rounded-full font-medium"
                >
                  Ngẫu Nhiên
                </Button>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 text-secondaryColor" />
            <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 text-secondaryColor" />
          </Carousel>
        </div>
        <div className="w-ful flex items-center justify-center">
          <Carousel className="w-full pt-5 h-fit">
            <CarouselContent className="h-fit">
              <CarouselItem>
                <div className="grid grid-cols-1 md:grid-cols-3 p-5 place-items-center gap-2 mx-auto">
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
                <div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-2 mx-auto">
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
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default CompnayBoardComponent;
