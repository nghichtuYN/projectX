import React from "react";
import ListJobsComponent from "./ListJobsComponent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
type ActiveTab = {
  value: string;
  label: string;
};
const activeTabs: ActiveTab[] = [
  {
    value: "1",
    label: "Tên việc làm",
  },
  {
    value: "2",
    label: "Tên công ty",
  },
  {
    value: "0",
    label: "Cả hai",
  },
];
const FilterResultJobsComponent = () => {
  const [activeTab, setActiveTab] = React.useState("1");

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center w-full">
        <div className="flex items-center basis-2/3 gap-3">
          <p className="w-fit text-sm leading-[22px] font-semibold">
            Tìm kiếm theo:
          </p>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-fit"
          >
            <TabsList className="flex items-center gap-2">
              {activeTabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className=" rounded-lg  data-[state=active]:bg-white border data-[state=active]:font-semibold data-[state=active]:border-secondaryColor leading-[22px] text-sm font-medium data-[state=active]:text-secondaryColor   bg-gray-500 gap-2 w-fit"
                >
                  <Check
                    className={cn(
                      "h-4 w-4 ",
                      activeTab === tab.value ? "visible" : "invisible"
                    )}
                  />
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        <div className="flex items-center basis-1/3">
          <p>Ưu tiên hiển thị theo </p>
        </div>
      </div>
      <ListJobsComponent />
    </div>
  );
};

export default FilterResultJobsComponent;
