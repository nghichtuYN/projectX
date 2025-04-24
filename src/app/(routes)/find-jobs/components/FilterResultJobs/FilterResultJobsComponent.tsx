"use client";

import ListJobsComponent from "./ListJobsComponent";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Job, JobPublic } from "@/types/Jobs";

// Define the type for companyName options
type CompanyNameOption = {
  value: "true" | "false" | "null";
  label: string;
};

const companyNames: CompanyNameOption[] = [
  {
    value: "false",
    label: "Tên việc làm",
  },
  {
    value: "true",
    label: "Tên công ty",
  },
  {
    value: "null",
    label: "Cả hai",
  },
];
type Props = {
  jobs: JobPublic[] | undefined;
  refetch:any
};
const FilterResultJobsComponent = ({ jobs ,refetch}: Props) => {
  const searchParams = useSearchParams();
  const companyName = searchParams.get("companyName") || "null";
  const pathName = usePathname();
  const router = useRouter();
  const getRadioValue = () => {
    if (companyName === "true") return "true";
    if (companyName === "false") return "false";
    return "null";
  };
  const handleCompanyName = useCallback(
    (term: string) => {
      if (term === companyName) return;
      console.log("handleCompanyName called with term:", term);
      const params = new URLSearchParams(searchParams);
      params.set("companyName", term);
      const newUrl = `${pathName}?${params.toString()}`;
      console.log("New URL:", newUrl);
      router.replace(newUrl);
    },
    [pathName, router, searchParams, companyName]
  );

  const handleValueChange = (value: string) => {
    handleCompanyName(value);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center w-full">
        <div className="flex items-center basis-2/3 gap-3">
          <p className="w-fit text-sm leading-[22px] font-semibold">
            Tìm kiếm theo:
          </p>
          <Tabs
            value={getRadioValue()}
            onValueChange={handleValueChange}
            className="w-fit"
          >
            <TabsList className="flex items-center gap-2">
              {companyNames.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  onClick={() => console.log(`Clicked tab: ${tab.value}`)} // Debug click
                  className="rounded-lg data-[state=active]:bg-white border data-[state=active]:font-semibold text-black data-[state=active]:border-secondaryColor leading-[22px] text-sm font-medium data-[state=active]:text-secondaryColor bg-gray-200 gap-2 w-fit"
                >
                  <Check
                    className={cn(
                      "h-4 w-4",
                      companyName === tab.value ? "visible" : "invisible"
                    )}
                  />
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        <div className="flex items-center basis-1/3">
          <p>Ưu tiên hiển thị theo</p>
        </div>
      </div>
      <ListJobsComponent jobs={jobs} refetch={refetch}/>
    </div>
  );
};

export default FilterResultJobsComponent;
