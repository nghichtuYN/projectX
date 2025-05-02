"use client";
import FilterComponent from "@/app/(employer)/employer/recruitment-campaigns/(components)/FilterJobComponent";
import EmployerSidebaHeaderComponent from "@/components/EmployerSidebaHeaderComponent";
import PaginationComponent from "@/components/PaginationComponent";
import SkeletonTableComponent from "@/components/SeketonTable";
import TableComponent, { TableColumn } from "@/components/TableComponent";
import { Input } from "@/components/ui/input";
import { CompanyOptions, JobOptions } from "@/data/Jobs";
import { getBusinessVerified } from "@/queries/queries";
import { BusinessVerification } from "@/types/BusinessVerification";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useMutationHook } from "@/hooks/useMutationHook";
import { toast } from "sonner";

import { acceptBusiness, rejectBusiness } from "@/services/admin";
import CompanyColumn from "./CompanyColumn";
import UserColumn from "./UserColumn";
import IntroductionColumn from "./IntroductionColumn";
import StatusColumn from "./StatusColumn";
import MajorColumn from "./MajorColumn";
import SizeColumn from "./SizeColumn";
import ActionColumn from "./ActionColumn";
import GPKDColumn from "./GPKDColumn";
const CompanyClient = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const filterBy = searchParams.get("filter_by") || "all";

  const searchValue = searchParams.get("search") || "";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const {
    data: business_verifications,
    isLoading,
    isFetching,
    refetch,
  } = getBusinessVerified(searchValue, currentPage, filterBy);
  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleFilterBy = (filter_by: string) => {
    const params = new URLSearchParams(searchParams);
    if (filter_by) {
      params.set("page", "1");
      params.set("filter_by", filter_by);
    } else {
      params.delete("filter_by");
    }
    router.replace(`${pathname}?${params.toString()}`);
  };
  const mutationUpdate = useMutationHook(
    (data: { id: string }) => {
      const { id } = data;
      return acceptBusiness(id);
    },
    (data) => {
      toast.success("Cập nhật thành công");
      refetch();
    }
  );
  const mutationReject = useMutationHook(
    (data: { id: string; rejectReason: string }) => {
      const { id, ...rest } = data;
      return rejectBusiness(id, rest);
    },
    (data) => {
      toast.success("Cập nhật thành công");
      refetch();
    }
  );
  const handleAccept = (id: string) => {
    mutationUpdate.mutate({ id });
  };
  const handleReject = (id: string, reason: string) => {
    mutationReject.mutate({ id, rejectReason: reason });
  };
  const columns: TableColumn<BusinessVerification>[] = [
    {
      key: "email",
      title: "Công ty",
      classname: "max-w-[250px]",
      renderColumn: (row) => {
        return <CompanyColumn row={row} />;
      },
    },
    {
      key: "companyId",
      title: "Người dùng",
      renderColumn: (row) => {
        return <UserColumn row={row} />;
      },
    },

    {
      key: "introduction",
      title: "Mô tả",
      classname: "min-w-[200px] max-w-[400px] h-full",
      renderColumn: (row) => {
        return <IntroductionColumn row={row} />;
      },
    },
    {
      key: "status",
      title: "Trạng thái",
      renderColumn: (row) => {
        return <StatusColumn row={row} />;
      },
    },
    {
      key: "major",
      title: "Lĩnh vực",
      renderColumn: (row) => {
        return <MajorColumn row={row} />;
      },
    },
    {
      key: "size",
      title: "Quy mô",
      renderColumn: (row) => {
        return <SizeColumn row={row} />;
      },
    },
    {
      key: "action",
      title: "Thao tác",
      renderColumn: (row) => {
        return (
          <ActionColumn
            row={row}
            handleAccept={handleAccept}
            handleReject={handleReject}
          />
        );
      },
    },
    {
      key: "registerationFile",
      title: "GPKD",
      renderColumn: (row) => {
        return <GPKDColumn row={row} />;
      },
    },
  ];

  return (
   
      <div className="pt-14 pl-8 pr-8 w-full">
        <div className="container w-full  mx-auto p-4 space-y-4  bg-accent">
          <div className=" flex gap-4 items-center">
            <FilterComponent
              dataOptions={CompanyOptions}
              filterBy={filterBy}
              onChangeFilterByValue={handleFilterBy}
              placeholder="Tất cả tin tuyển dụng"
            />
            <Input
              defaultValue={searchParams.get("search")?.toString() || ""}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Tên công ty"
            />
          </div>

          {/* Table */}
          <div>
            <div className="border rounded-lg bg-white">
              {isLoading || isFetching ? (
                <SkeletonTableComponent columnsCount={7} />
              ) : (
                <TableComponent
                  rows={business_verifications?.items || []}
                  rowKey="companyId"
                  columns={columns}
                  rowClassName="group h-28 hover:bg-fourthColor"
                  content="Không có công ty nào"
                />
              )}
            </div>
            {!!business_verifications &&
              business_verifications?.totalPages > 1 && (
                <div className="flex justify-end w-full">
                  <PaginationComponent
                    currentPage={currentPage}
                    totalPages={business_verifications?.totalPages}
                    className={"flex justify-end"}
                  />
                </div>
              )}
          </div>
        </div>
      </div>
  );
};

export default CompanyClient;
