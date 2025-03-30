import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChevronsRight, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const JobComponent = () => {
  return (
    <Card className="bg-blue-50 border group border-secondaryColor hover:bg-white">
      <CardHeader className="p-3">
        <CardTitle className="flex gap-4 w-full items-start">
          <div className="lg:h-28 lg:w-28 w-10 h-10 flex-shrink-0 border border-gray-300 rounded-lg">
            <div className="relative h-full w-full overflow-hidden rounded-lg bg-gray-100">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-XQiivDBn4lbLgDbeMky8ZCoMG61VS3.png"
                alt="Company logo"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col w-full gap-1 ">
            <div className="flex items-start justify-between w-full">
              <div className="flex flex-col gap-2 w-5/6">
                <Link
                  href={`/jobs/${0}`}
                  className="text-xs md:text-lg w-full whitespace-normal font-semibold text-ellipsis leading-6 line-clamp-2 hover:text-secondaryColor"
                >
                  Chuyên Viên Kinh Doanh/ Tư Vấn Tài Chínhaaaaaaaa
                  aaaaaaaaaaaaaaaa
                </Link>
                <CardDescription className="flex flex-col gap-1 w-full">
                  <p className="text-[13px] md:text-md text-ellipsis leading-5 font-medium line-clamp-1 text-gray-600">
                    CÔNG TY TNHH ABC
                  </p>
                  <div className="flex gap-2 items-center">
                    <span className="text-xs md:text-sm rounded-full font-medium bg-gray-100 px-3 py-1 ">
                      Hà Nội
                    </span>
                    <span className="text-xs md:text-sm rounded-full font-medium bg-gray-100 px-3 py-1 ">
                      9 năm
                    </span>
                  </div>
                </CardDescription>
              </div>
              <div className="flex flex-col justify-between gap-1">
                <span className="text-xs md:text-sm rounded-full bg-gray-100 px-3 py-1 ">
                  Trên 16.8 triệu
                </span>
                <Button
                  className={`
                    mt-5 transition-all duration-500 ease-in-out
                    group-hover:opacity-100 group-hover:visible
                    opacity-0 invisible rounded-3xl bg-blue-50 text-secondaryColor border hover:bg-white hover:border-secondaryColor font-medium leading-6 text-sm
                  `}
                >
                  <p>Xem nhanh</p>
                  <ChevronsRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
            <hr className="border-solid border-gray-300" />
          </div>
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex justify-end gap-3 p-0 h-8 pb-3 pr-3 items-center">
        <div
          className="transition-all duration-500 ease-in-out
                    group-hover:opacity-100 group-hover:block
                    opacity-0 hidden "
        >
          <Button
            size={"sm"}
            className="rounded-full font-semibold  leading-6 text-sm"
          >
            Ứng tuyển
          </Button>
        </div>
        <div className="text-sm h-100 font-medium text-gray-400 group-hover:hidden">
          Đăng 1 tuần trước
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="p-1 border cursor-pointer border-secondaryColor rounded-full bg-white group-hover:bg-blu group-hover:text-white transition-all duration-500 ease-in-out">
                <Heart className=" h-4 w-4 text-secondaryColor  " />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Lưu tin</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
};

export default JobComponent;
