"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import { ChangeEvent, useEffect, useState } from "react";

import Link from "next/link";
import TabContentApplyCv from "./TabContentApplyCv";
import { tabLists } from "@/data/campain";
import TabContentJobs from "./TabContentJobs";

const TabsComponent = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [keyWord, setKeyWord] = useState("");
  const [quickFilter, setQuickFilter] = useState("all");
  const [label, setLabel] = useState("");
  const activeTab = searchParams.get("active_tab") || "jobs";

  useEffect(() => {
    if (activeTab === "apply_cv") {
      const newUrl = `${pathname}?active_tab=apply_cv&keyword=${encodeURIComponent(
        keyWord
      )}&quick_filter=${quickFilter}&label=${label}`;
      router.push(newUrl, { scroll: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyWord, quickFilter, label]);

  const onChangeKeyWordVaule = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyWord(e.target.value);
  };
  const onChangeQuickFilterValue = (value: string) => {
    setQuickFilter(value);
  };
  const onChangeLabelValue = (value: string) => {
    setLabel(value);
  };

  return (
    <Tabs defaultValue={activeTab}>
      <TabsList className="flex items-center gap-3 justify-start bg-white h-12">
        {tabLists?.map((tab) => (
          <Link
            key={tab.value}
            href={
              tab.value === "apply_cv"
                ? tab.href(pathname, keyWord, quickFilter, label)
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
        <TabContentJobs activeTab={activeTab} />
      </TabsContent>

      <TabsContent value="apply_cv" className="bg-white min-h-[500px]">
        <TabContentApplyCv
          keyWord={keyWord}
          label={label}
          quickFilter={quickFilter}
          onChangeKeyWordVaule={onChangeKeyWordVaule}
          onChangeLabelValue={onChangeLabelValue}
          onChangeQuickFilterValue={onChangeQuickFilterValue}
        />
      </TabsContent>
    </Tabs>
  );
};

export default TabsComponent;
