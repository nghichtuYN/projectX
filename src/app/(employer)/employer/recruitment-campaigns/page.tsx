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
import { Progress } from "@/components/ui/progress";
import { Eye, FolderPlus, Plus } from "lucide-react";
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
const RecruitmentCampaignPage = () => {
  const pathname = usePathname();
  const [filterBy, setFilterBy] = useState("");
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();
  console.log(searchParams.get("search"));
  useEffect(() => {
    const searchFromUrl = searchParams.get("search") || "";
    const filterFromUrl = searchParams.get("filter_by") || "all";
    const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);
    setSearchValue(searchFromUrl);
    setFilterBy(filterFromUrl);
    setCurrentPage(pageFromUrl);
  }, []);
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
          {/* Search Bar */}
          <div className=" flex gap-4 items-center">
            <Select onValueChange={onChangeFilterByValue} value={filterBy}>
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Tất cả chiến dịch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả chiến dịch</SelectItem>
                <SelectItem value="only_open">
                  Chỉ chiến dịch đang mở
                </SelectItem>
                <SelectItem value="has_new_cv">
                  Có CV ứng viên mới cần xem
                </SelectItem>
                <SelectItem value="has_publishing_job">
                  Tin tuyển dụng đang hiển thị
                </SelectItem>
                <SelectItem value="has_running_service">
                  Có dịch vụ đang chạy
                </SelectItem>
                <SelectItem value="expired_job">
                  Tin tuyển dụng hết hạn hiển thị
                </SelectItem>
                <SelectItem value="waitting_approve_job">
                  Tin tuyển dụng đang xét duyệt
                </SelectItem>
              </SelectContent>
            </Select>
            <SearchInputCampainComponent
              page={currentPage}
              filterBy={filterBy}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              placeholder="Tìm chiến dịch (Nhấn enter để tìm kiếm)"
            />
            <DialogAddCampaignComponent />
          </div>

          {/* Table */}
          <div>
            <div className="border rounded-lg bg-white">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px] border border-r-2">
                      Chiến dịch tuyển dụng
                    </TableHead>
                    <TableHead className="border border-r-2">
                      Tin tuyển dụng
                    </TableHead>
                    <TableHead className="border border-r-2">
                      CV từ hệ thống
                    </TableHead>
                    <TableHead className="border border-r-2">Lọc CV</TableHead>
                    <TableHead className="border border-r-2">
                      Dịch vụ đang chạy
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaigns.map((campaign, index) => (
                    <TableRow
                      key={index}
                      className="group h-28 hover:bg-fourthColor"
                    >
                      <TableCell className="h-full border border-r-2">
                        <div className="flex justify-start items-start gap-2 h-28">
                          <Switch checked={campaign.active} />
                          <div className="flex flex-col">
                            <span className="font-medium">#{campaign.id}</span>
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
                                <span className="after:content-['|'] after:ml-0.5 after:text-accent cursor-pointer hover:text-secondaryColor">
                                  Sửa chiến dịch
                                </span>
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
                      {/* <TableCell className="border border-r-2">
                        <div className="space-y-1">
                          <div className="text-sm">{campaign.progress}%</div>
                          <Progress
                            value={campaign.progress}
                            className="w-[60px]"
                          />
                        </div>
                      </TableCell> */}
                      <TableCell className="border border-r-2">
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-600 border-green-200"
                        >
                          {campaign.postStatus}
                        </Badge>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default RecruitmentCampaignPage;
