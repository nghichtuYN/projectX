"use client";
import { JobType } from "@/lib/jobType";
import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
const ITEMS_PER_PAGE = 6;
const ListJobComponent = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = Math.ceil(JobType.length / ITEMS_PER_PAGE);

  const startIndex = currentPage * ITEMS_PER_PAGE;
  const currentJobTypes = JobType.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % pageCount);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + pageCount) % pageCount);
  };

  const handleCategoryClick = (value: string) => {
    console.log(`Category clicked: ${value}`);
  };

  return (
    <Card className="w-full  mx-auto">
      <CardContent className="pt-2 w-full">
        <div className="">
          {currentJobTypes.map((category) => (
            <Button
              key={category.value}
              variant="ghost"
              className="w-full pt-2 pr-0   font-semibold justify-between mr-4 pb-2 text-left leading-5 hover:bg-transparent hover:text-secondaryColor hover:underline"
              onClick={() => handleCategoryClick(category.value)}
            >
              <p title={category?.label} className="w-4/5 overflow-hidden text-ellipsis ">{category.label}</p>
              <ChevronRight />
            </Button>
          ))}
        </div>
        <hr />
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm text-muted-foreground font-bold">
            {currentPage + 1}/{pageCount}
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "h-8 w-8 rounded-full hover:bg-secondaryColor hover:text-white",
                currentPage + 1 !== 1
                  ? "text-secondaryColor border-secondaryColor"
                  : ""
              )}
              disabled={currentPage + 1 === 1}
              onClick={prevPage}
            >
              <ChevronLeft className="h-4 w-4 " />
            </Button>

            <Button
              variant="outline"
              size="icon"
              disabled={currentPage + 1 === pageCount}
              className={cn(
                "h-8 w-8 rounded-full hover:bg-secondaryColor hover:text-white",
                currentPage + 1 !== pageCount
                  ? "text-secondaryColor border-secondaryColor"
                  : ""
              )}
              onClick={nextPage}
            >
              <ChevronRight className="h-4 w-4 " />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ListJobComponent;
