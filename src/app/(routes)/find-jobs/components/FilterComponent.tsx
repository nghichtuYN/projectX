"use client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Filter } from "lucide-react";
import FiterByJobsCategoryComponent from "./FilterByJobCategories/FiterByJobsCategoryComponent";
import FilterByExperienceComponent from "./FilterByExperience/FilterByExperienceComponent";
import FilterByLeverComponent from "./FilterByLevel/FilterByLeverComponent";
import FilterBySalaryComponent from "./FilterBySalary/FilterBySalaryComponent";
import FilterByStreamBusinessComponent from "./FilterByStreamBusiness/FilterByStreamBusinessComponent";
import FilterByFormOfWorkComponent from "./FilterByFormOfWork/FilterByFormOfWorkComponent";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const FilterComponent = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const majors = searchParams.getAll("majors");
  const jobLevels = searchParams.getAll("jobLevels");
  const jobTypes = searchParams.getAll("jobTypes");
  const contractTypes = searchParams.getAll("contractTypes");
  const minSalary = searchParams.get("minSalary") || undefined;
  const maxSalary = searchParams.get("maxSalary") || undefined;
  const minExp = searchParams.get("minExp") || undefined;
  const maxExp = searchParams.get("maxExp") || undefined;

  const filterCount =
    (majors.length > 0 ? 1 : 0) +
    (jobLevels.length > 0 ? 1 : 0) +
    (jobTypes.length > 0 ? 1 : 0) +
    (contractTypes.length > 0 ? 1 : 0) +
    (minSalary !== undefined || maxSalary !== undefined ? 1 : 0) +
    (minExp !== undefined || maxExp !== undefined ? 1 : 0);
  const handleDeleteFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("majors");
    params.delete("jobLevels");
    params.delete("jobTypes");
    params.delete("contractTypes");
    params.delete("minSalary");
    params.delete("maxSalary");
    params.delete("minExp");
    params.delete("maxExp");

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };
  return (
    <div className="flex flex-col items-center gap-2 justify-center h-full w-full">
      <div className="flex items-center justify-between w-full p-1">
        <div className="flex items-center gap-1 w-full">
          <Filter className="w-5 h-5 text-secondaryColor" />
          <p className="text-lg font-bold">Lọc nâng cao </p>
        </div>
        <Button
          variant={"outline"}
          className={cn(
            "rounded-full border-solid  hover:border-secondaryColor",
            filterCount > 0 && "text-red-500 font-semibold"
          )}
          size={"default"}
          onClick={handleDeleteFilter}
          disabled={filterCount === 0}
        >
          Xóa lọc {filterCount > 0 && `(${filterCount})`}
        </Button>
      </div>
      <hr className="border w-full pl-1 pr-1 border-gray-300" />

      <ScrollArea className="w-full p-1 h-[80vh]">
        <FiterByJobsCategoryComponent />
        <hr className="border-dashed w-full p-1 border-gray-300" />
        <FilterByExperienceComponent />
        <hr className="border-dashed w-full p-1 border-gray-300" />
        <FilterByLeverComponent />
        <hr className="border-dashed w-full p-1 border-gray-300" />
        <FilterBySalaryComponent />
        <hr className="border-dashed w-full p-1 border-gray-300" />
        <FilterByStreamBusinessComponent />
        <hr className="border-dashed w-full p-1 border-gray-300" />
        <FilterByFormOfWorkComponent />
        <hr className="border-dashed w-full p-1 border-gray-300" />
      </ScrollArea>
    </div>
  );
};

export default FilterComponent;
