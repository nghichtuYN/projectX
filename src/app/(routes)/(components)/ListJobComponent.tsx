"use client";
import  { useState } from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAllMajors } from "@/queries/queries";
import Link from "next/link";

const ITEMS_PER_PAGE = 6;

const ListJobComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: Majors } = getAllMajors("", ITEMS_PER_PAGE, currentPage, true);

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const nextPage = () => {
    if (Majors && currentPage < Majors.totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <Card className="w-full mx-auto">
      <CardContent className="pt-2 w-full">
        <div className="">
          {Majors?.items.map((major) => (
            <Link
              href={`find-jobs?majors=${major?.id}`}
              key={major.id}
              className="w-full pt-2 pr-0  flex text-sm font-semibold justify-between mr-4 pb-2 text-left leading-5 hover:bg-transparent hover:text-secondaryColor hover:underline"
            >
              <p
                title={major?.name}
                className="w-4/5 overflow-hidden text-ellipsis"
              >
                {major?.name}
              </p>
              <ChevronRight className="h-5 w-5 font-medium" />
            </Link>
          ))}
        </div>
        <hr />
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm text-muted-foreground font-bold">
            {currentPage}/{Majors?.totalPages || 1}
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevPage}
              className={cn(
                "h-8 w-8 rounded-full hover:bg-secondaryColor hover:text-white",
                currentPage !== 1
                  ? "text-secondaryColor border-secondaryColor"
                  : ""
              )}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={nextPage}
              disabled={currentPage === Majors?.totalPages}
              className={cn(
                "h-8 w-8 rounded-full hover:bg-secondaryColor hover:text-white",
                currentPage !== Majors?.totalPages
                  ? "text-secondaryColor border-secondaryColor"
                  : ""
              )}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ListJobComponent;
