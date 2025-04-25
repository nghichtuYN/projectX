"use client";

import { useSearchParams, usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import Link from "next/link";
import TabContentApplyCv from "./TabApllicaton/TabContentApplyCv";
import { tabLists } from "@/data/campain";
import TabContentJobs from "./TabContentJobs";

const TabsComponent = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const activeTab = searchParams.get("active_tab") || "jobs";

  return (
    <Tabs defaultValue={activeTab}>
      <TabsList className="flex items-center gap-3 justify-start bg-white h-12">
        {tabLists?.map((tab) => (
          <Link
            key={tab.value}
            href={
              tab.value === "apply_cv"
                ? tab.href(pathname, "", "all", "")
                : tab.href(pathname)
            }
          >
            <TabsTrigger
              className="data-[state=active]:text-secondaryColor h-full text-sm font-bold"
              value={tab.value}
            >
              {tab.label}
            </TabsTrigger>
          </Link>
        ))}
      </TabsList>

      <TabsContent value="jobs">
        <TabContentJobs />
      </TabsContent>

      <TabsContent value="apply_cv" className="bg-white min-h-[500px]">
        <TabContentApplyCv />
      </TabsContent>
    </Tabs>
  );
};

export default TabsComponent;
