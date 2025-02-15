"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { ChangeEvent, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import Link from "next/link";
import * as XLSX from "xlsx";
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

  const handleExport = () => {
    const data = [
      { name: "John Doe", email: "john@example.com" },
      { name: "Jane Doe", email: "jane@example.com" },
    ];
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "CV List");
    XLSX.writeFile(workbook, "CV_List.xlsx");
  };

  return (
    <Tabs defaultValue={activeTab}>
      <TabsList className="flex items-center gap-3 justify-start bg-white h-12">
        <Link href={`${pathname}?active_tab=jobs`}>
          <TabsTrigger
            className="data-[state=active]:text-secondaryColor h-full text-sm font-bold"
            value="jobs"
          >
            Tin tuyển dụng
          </TabsTrigger>
        </Link>

        <Link
          href={`${pathname}?active_tab=apply_cv&keyword=${encodeURIComponent(
            keyWord
          )}&quick_filter=${quickFilter}&label=${label}`}
        >
          <TabsTrigger
            className="data-[state=active]:text-secondaryColor h-full text-sm font-bold"
            value="apply_cv"
          >
            CV ứng tuyển
          </TabsTrigger>
        </Link>
        <Link href={`${pathname}?active_tab=viewed_job`}>
          <TabsTrigger
            className="data-[state=active]:text-secondaryColor h-full text-sm font-bold"
            value="viewed_job"
          >
            Ứng viên đã xem tin
          </TabsTrigger>
        </Link>
        <Link href={`${pathname}?active_tab=cv_recommendation`}>
          <TabsTrigger
            className="data-[state=active]:text-secondaryColor h-full text-sm font-bold"
            value="cv_recommendation"
          >
            CV đề xuất
          </TabsTrigger>
        </Link>
        <Link href={`${pathname}?active_tab=paid_cv`}>
          <TabsTrigger
            className="data-[state=active]:text-secondaryColor h-full text-sm font-bold"
            value="paid_cv"
          >
            CV tìm kiếm
          </TabsTrigger>
        </Link>
        <Link href={`${pathname}?active_tab=followed_cv`}>
          <TabsTrigger
            className="data-[state=active]:text-secondaryColor h-full text-sm font-bold"
            value="followed_cv"
          >
            CV đang theo dõi
          </TabsTrigger>
        </Link>
        <Link href={`${pathname}?active_tab=service`}>
          <TabsTrigger
            className="data-[state=active]:text-secondaryColor h-full text-sm font-bold"
            value="service"
          >
            Dịch vụ
          </TabsTrigger>
        </Link>
      </TabsList>

      <TabsContent value="jobs">
        <Card>
          <CardHeader>
            <CardTitle>Jobs</CardTitle>
            <CardDescription>Danh sách tin tuyển dụng</CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>

      <TabsContent value="apply_cv" className="bg-white min-h-[500px]">
        <div className="flex items-center gap-2 pt-2 pl-2 pr-2 w-full">
          <div className="w-2/3 flex  items-center gap-2  ">
            <div className="w-1/3 pl-1 flex items-center  bg-white border">
              <Search className="h-4 w-4 text-muted-foreground " />
              <Input
                placeholder={"Tìm ứng viên"}
                value={keyWord}
                onChange={onChangeKeyWordVaule}
                className="border-none focus-visible:ring-0 placeholder:font-medium"
              />
            </div>
            <Select onValueChange={onChangeQuickFilterValue} defaultValue="all">
              <SelectTrigger className="w-1/3">
                <SelectValue placeholder="Hiển thị tất cả" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Hiển thị tất cả</SelectItem>
                <SelectItem value="notViewed">
                  Chỉ hiển thị CV chưa xem
                </SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={onChangeLabelValue}>
              <SelectTrigger className="w-1/3">
                <SelectValue placeholder="Tất cả nhãn" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="is_not_label">Chưa gắn nhãn</SelectItem>
                <SelectItem value="1">Ưu tiền</SelectItem>
                <SelectItem value="2">Hiển thị tất cả</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end w-1/3">
            <Button
              variant={"outline"}
              className="boder border-secondaryColor rounded-3xl text-secondaryColor pr-6"
              onClick={handleExport}
            >
              Xuất danh sách CV
            </Button>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default TabsComponent;
