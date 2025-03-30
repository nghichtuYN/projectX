"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { campaigns } from "@/data/campaigns";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import EmployerSidebaHeaderComponent from "@/components/EmployerSidebaHeaderComponent";
import Link from "next/link";
import SearchInputCampainComponent from "@/components/SearchInputCampainComponent";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import DialogAddCampaignComponent from "./(components)/DialogAddCampaignComponent";
import { getAllCampaigns } from "@/services/campaign";
import { useQueryHook } from "@/hooks/useQueryHook";
import DialogEditCampaignComponent from "./(components)/DialogEditCampaignComponent";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/UserStore";
type campaignOptionsType = {
  value: string;
  label: string;
};
export type campaignType = {
  id: string;
  close: Date;
  countJob: number;
  description: string;
  name: string;
  open: Date;
  status: number;
};
type ListCampaign = {
  first: boolean;
  last: boolean;
  items: campaignType[];
  totalItems: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
};
const campaignOptions: campaignOptionsType[] = [
  { value: "all", label: "Tất cả chiến dịch" },
  { value: "only_open", label: "Chỉ chiến dịch đang mở" },
  { value: "has_new_cv", label: "Có CV ứng viên mới cần xem" },
  { value: "has_publishing_job", label: "Tin tuyển dụng đang hiển thị" },
  { value: "has_running_service", label: "Có dịch vụ đang chạy" },
  { value: "expired_job", label: "Tin tuyển dụng hết hạn hiển thị" },
  { value: "waitting_approve_job", label: "Tin tuyển dụng đang xét duyệt" },
];
type headerTableType = {
  classname: string | "";
  title: string;
};
const tableHeaders: headerTableType[] = [
  {
    classname: "w-[300px]",
    title: "Chiến dịch tuyển dụng",
  },
  {
    classname: "",
    title: "Tin tuyển dụng",
  },
  {
    classname: "",
    title: "CV từ hệ thống",
  },
  {
    classname: "",
    title: "Lọc CV",
  },
  {
    classname: "",
    title: "Dịch vụ đang chạy",
  },
];

const RecruitmentCampaignPage = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [filterBy, setFilterBy] = React.useState(
    searchParams.get("filter_by") || "all"
  );
  const [searchValue, setSearchValue] = React.useState(
    searchParams.get("search") || ""
  );
  const [currentPage, setCurrentPage] = React.useState(
    parseInt(searchParams.get("page") || "1", 10)
  );
  useEffect(() => {
    const query = new URLSearchParams();
    if (searchValue) query.set("search", searchValue);
    if (filterBy !== "all") query.set("filter_by", filterBy);
    if (currentPage >= 1) query.set("page", currentPage.toString());

    const newUrl = query.toString()
      ? `${pathname}?${query.toString()}`
      : pathname;
    router.push(newUrl, { scroll: false });
  }, [filterBy, currentPage, pathname, router]);
  const onChangeFilterByValue = (value: string) => {
    setFilterBy(value);
  };

  const { data, refetch } = useQueryHook<ListCampaign>(
    ["campaigns", searchValue, currentPage],
    () => getAllCampaigns(searchValue, currentPage)
  );
  const user = useAuthStore((state) => state.user);
  console.log(user);
  useEffect(() => {
    if (!user) return;
    if(!user) router.push('/employer-login')
  }, [user]);
  return (
    <>
      <EmployerSidebaHeaderComponent>
        <div className="flex w-full items-center ">
          <p className="text-lg font-semibold text-secondaryColor">
            Quản lý chiến dịch
          </p>
        </div>
      </EmployerSidebaHeaderComponent>
      <div className="pt-14 pl-8 pr-8">
        <div className="container  mx-auto p-4 space-y-4  bg-accent">
          <div className=" flex gap-4 items-center">
            <Select onValueChange={onChangeFilterByValue} value={filterBy}>
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Tất cả chiến dịch" />
              </SelectTrigger>
              <SelectContent>
                {campaignOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <SearchInputCampainComponent
              page={currentPage}
              filterBy={filterBy}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              placeholder="Tìm chiến dịch (Nhấn enter để tìm kiếm)"
            />
            <DialogAddCampaignComponent refetch={refetch} />
          </div>

          {/* Table */}
          <div>
            <div className="border rounded-lg bg-white">
              <Table>
                <TableHeader>
                  <TableRow>
                    {tableHeaders?.map((headers) => (
                      <TableHead
                        key={headers.title}
                        className={cn(headers.classname, "border border-r-2")}
                      >
                        {headers.title}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.items?.map((campaign, index) => (
                    <TableRow
                      key={index}
                      className="group h-28 hover:bg-fourthColor"
                    >
                      <TableCell className="h-full border border-r-2">
                        <div className="flex justify-start items-start gap-2 h-28">
                          <Switch
                            checked={campaign.status === 1 ? true : false}
                          />
                          <div className="flex flex-col">
                            <span className="font-medium text-xs">
                              #{campaign.id.replace(/-/g, "")}
                            </span>
                            <Link
                              className="hover:underline"
                              href={`/employer/recruitment-campaigns/${campaign?.id}?active_tab=jobs`}
                            >
                              {campaign.name}
                            </Link>
                            <div className="text-sm text-gray-500">
                              {campaign.status}
                            </div>

                            <div className="hidden group-hover:flex group-hover:flex-col text-sm font-medium gap-1 mt-2">
                              <div className="flex items-center gap-2">
                                <DialogEditCampaignComponent
                                  refetch={refetch}
                                  id={campaign?.id}
                                />
                                <span className="cursor-pointer hover:text-secondaryColor">
                                  Xem báo cáo
                                </span>
                              </div>
                              <span className="cursor-pointer hover:text-secondaryColor">
                                Xem CV ứng tuyển
                              </span>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="border border-r-2 ">
                        <div className="flex justify-center">
                          {!!campaign.countJob ? (
                            campaign.countJob
                          ) : (
                            <Link
                              href={`/employer/recruitment-campaigns/${campaign?.id}/create_job`}
                            >
                              <Button
                                size={"sm"}
                                className="text-sm leading-[21px] border border-secondaryColor text-secondaryColor"
                                variant={"outline"}
                              >
                                Đăng tin
                              </Button>
                            </Link>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="border border-r-2">
                        <div className="space-y-1">
                          <div>CV đề xuất</div>
                          <div className="text-sm text-gray-500">
                            Chưa kích hoạt
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-500"
                          >
                            <Eye className="w-4 h-4 mr-1" /> Xem chi tiết
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="border border-r-2">
                        <Button variant="outline" size="sm">
                          Tìm CV
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-green-500"
                        >
                          Thêm
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {data?.totalPages && data?.totalPages > 1 && (
              <div className="flex justify-end w-full">
                <Pagination className="flex justify-end">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>
                        2
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RecruitmentCampaignPage;
