import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const FilterResultJobsComponent = () => {
  return (
    <div>
      {[...Array(100)].map((_, i) => (
        <Card key={i}>
          <div className="p-4">
            <div className="flex gap-4 items-center">
              <div className="lg:h-16 lg:w-16 w-10 h-10 flex-shrink-0">
                <div className="relative h-full w-full overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-XQiivDBn4lbLgDbeMky8ZCoMG61VS3.png"
                    alt="Company logo"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="flex-1">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Link
                      href={`/jobs/${0}`}
                      className="text-xs md:text-lg font-semibold text-ellipsis line-clamp-2 hover:text-secondaryColor"
                    >
                      Chuyên Viên Kinh Doanh/ Tư Vấn Tài Chính
                    </Link>
                  </HoverCardTrigger>
                  <HoverCardContent className=" w-96  h-[500px]  rounded-md">
                    <div>
                      <div className="flex gap-4 ">
                        <div className="h-16 w-16 flex-shrink-0">
                          <div className="relative h-full w-full rounded-lg bg-gray-100">
                            <Image
                              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-XQiivDBn4lbLgDbeMky8ZCoMG61VS3.png"
                              alt="Company logo"
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <div className="flex-1 ">
                          <h3 className="font-semibold hover:text-secondaryColor">
                            Chuyên Viên Kinh Doanh/ Tư Vấn Tài Chính
                          </h3>
                          <p className="text-sm text-gray-600">
                            CÔNG TY TNHH ABC
                          </p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                              Trên 16.8 triệu
                            </span>
                            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                              Hà Nội
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <ScrollArea className="h-4/6 w-full">
                      <div
                        style={{ whiteSpace: "pre-line" }}
                        // dangerouslySetInnerHTML={{ __html: jd }}
                      />
                    </ScrollArea>
                    <div className="flex w-full gap-2 mt-2 shadow-md ">
                      <Link className="w-1/3" href={`/jobs/${i}`}>
                        <Button
                          className="w-full text-secondaryColor font-semibold border-secondaryColor hover:bg-secondaryColor hover:text-white"
                          variant={"outline"}
                        >
                          Ứng tuyển
                        </Button>
                      </Link>
                      <Button className="w-2/3 font-semibold hover:bg-white hover:text-secondaryColor hover:outline-secondaryColor border-collapse ">
                        Xem chi tiết
                      </Button>
                    </div>
                  </HoverCardContent>
                </HoverCard>
                <p className="text-xs md:text-md text-ellipsis line-clamp-1 text-gray-600">
                  CÔNG TY TNHH ABC
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1">
                <span className="text-xs md:text-sm rounded-full bg-gray-100 px-3 py-1 ">
                  Trên 16.8 triệu
                </span>
                <span className="text-xs md:text-sm rounded-full bg-gray-100 px-3 py-1 ">
                  Hà Nội
                </span>
              </div>
              <Heart className="md:h-5 md:w-5 h-4 w-4 text-secondaryColor  " />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default FilterResultJobsComponent;
