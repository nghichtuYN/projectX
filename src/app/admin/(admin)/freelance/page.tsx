"use client";
import TableComponent, { TableColumn } from "@/components/TableComponent";
import { useMutationHook } from "@/hooks/useMutationHook";
import { getFreelanceVerified } from "@/queries/queries";
import { acceptFreelance, rejectFreelance } from "@/services/admin";
import { FreelanceUser } from "@/types/Freelance";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import UserColumn from "./components/UserColumn";
import StatusColumn from "./components/StatusColumn";
import ActionColumn from "./components/ActionColumn";
import EmployerSidebaHeaderComponent from "@/components/EmployerSidebaHeaderComponent";
import FilterComponent from "@/app/(employer)/employer/recruitment-campaigns/(components)/FilterJobComponent";
import { Input } from "@/components/ui/input";
import SkeletonTableComponent from "@/components/SeketonTable";
import PaginationComponent from "@/components/PaginationComponent";
import { CompanyOptions } from "@/data/Jobs";
import FrontIdCard from "./components/FrontIdCard";
import BackIdCard from "./components/BackIdCard";

const FreelancePage = () => {
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
  } = getFreelanceVerified(searchValue, currentPage, filterBy);
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
      return acceptFreelance(id);
    },
    (data) => {
      toast.success("Cập nhật thành công");
      refetch();
    }
  );
  const mutationReject = useMutationHook(
    (data: { id: string; rejectReason: string }) => {
      const { id, ...rest } = data;
      return rejectFreelance(id, rest);
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
  const columns: TableColumn<FreelanceUser>[] = [
    {
      key: "user",
      title: "Tài khoản",
      renderColumn: (row) => {
        return <UserColumn row={row} />;
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
      key: "front",
      title: "Mặt trước",
      renderColumn: (row) => {
        return <FrontIdCard row={row} />;
      },
    },
    {
      key: "back",
      title: "Mặt sau",
      renderColumn: (row) => {
        return <BackIdCard row={row} />;
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
  ];
  return (
    <>
      <EmployerSidebaHeaderComponent>
        <div className="flex w-full items-center ">
          <p className="text-lg font-semibold text-secondaryColor">
            Danh sách nhà tuyển dụng tự do
          </p>
        </div>
      </EmployerSidebaHeaderComponent>
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
              placeholder="Tên tin tuyển dụng"
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
                  rowKey="userId"
                  columns={columns}
                  rowClassName="group hover:bg-fourthColor"
                  content="Không có chiến dịch nào"
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
    </>
  );
};

export default FreelancePage;
