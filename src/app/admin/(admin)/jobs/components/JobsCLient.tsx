"use client";
import FilterComponent from "@/app/(employer)/employer/recruitment-campaigns/(components)/FilterJobComponent";
import ContracTypeColumn from "@/app/(employer)/employer/recruitment-campaigns/[id]/(components)/TabJob/ContracTypeColumn";
import JobInfoColumn from "@/app/(employer)/employer/recruitment-campaigns/[id]/(components)/TabJob/JobInfoColumn";
import JobLevelColumn from "@/app/(employer)/employer/recruitment-campaigns/[id]/(components)/TabJob/JobLevelColumn";
import JobTypeColumn from "@/app/(employer)/employer/recruitment-campaigns/[id]/(components)/TabJob/JobTypeColumn";
import SalaryColumn from "@/app/(employer)/employer/recruitment-campaigns/[id]/(components)/TabJob/SalaryColumn";
import SkillsColumn from "@/app/(employer)/employer/recruitment-campaigns/[id]/(components)/TabJob/SkillsColumn";
import PaginationComponent from "@/components/PaginationComponent";
import SkeletonTableComponent from "@/components/SeketonTable";
import TableComponent, { TableColumn } from "@/components/TableComponent";
import { Input } from "@/components/ui/input";
import { JobAdminOptions } from "@/data/Jobs";
import { useMutationHook } from "@/hooks/useMutationHook";
import { getAdminJob } from "@/queries/queries";
import { acceptJobs, rejectJobs } from "@/services/admin";
import { Job } from "@/types/Jobs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { useDebouncedCallback } from "use-debounce";
import ActionColumn from "./ActionColumn";

const JobsCLient = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const filterBy = searchParams.get("filter_by") || "all";

  const searchValue = searchParams.get("search") || "";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const {
    data: jobs,
    isLoading,
    isFetching,
    refetch,
  } = getAdminJob(searchValue, currentPage, 10);
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, 200);
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
      return acceptJobs(id);
    },
    (data) => {
      toast.success("Cập nhật thành công");
      refetch();
    }
  );
  const mutationReject = useMutationHook(
    (data: { id: string; rejectReason: string }) => {
      const { id, ...rest } = data;
      return rejectJobs(id, rest);
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
  const columns: TableColumn<Job>[] = [
    {
      key: "title",
      classname: "max-w-[250px] h-full",
      title: "Tin tuyển dụng",
      renderColumn: (row) => {
        return <JobInfoColumn row={row} />;
      },
    },
    {
      key: "contractTypes",
      title: "Loại hình ",
      classname: "max-w-[150px]",
      renderColumn: (row) => {
        return <ContracTypeColumn row={row} />;
      },
    },
    {
      key: "jobLevels",
      title: "Cấp bậc",
      classname: "max-w-[150px]",
      renderColumn: (row) => {
        return <JobLevelColumn row={row} />;
      },
    },
    {
      key: "jobTypes",
      title: "Hình thức",
      classname: "max-w-[150px]",

      renderColumn: (row) => {
        return <JobTypeColumn row={row} />;
      },
    },
    {
      key: "skills",
      title: "Kỹ năng",
      classname: "max-w-[150px]",
      renderColumn: (row) => {
        return <SkillsColumn row={row} />;
      },
    },
    {
      key: "Salary",
      title: "Lương",
      renderColumn: (row) => {
        return <SalaryColumn row={row} />;
      },
    },
    {
      key: "quantity",
      title: "Số lượng",
      renderColumn: (row) => {
        return <div>{row.quantity} người</div>;
      },
    },
    {
      key: "yearOfExperience",
      title: "Kinh nghiệm tối thiểu",
      renderColumn: (row) => {
        return <div>{row.yearOfExperience} năm</div>;
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
    <div className="pt-14 pl-8 pr-8 w-full">
      <div className="container w-full  mx-auto p-4 space-y-4  bg-accent">
        <div className=" flex gap-4 items-center">
          <FilterComponent
            dataOptions={JobAdminOptions}
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
                rows={jobs?.items || []}
                rowKey="id"
                columns={columns}
                rowClassName="group h-28 hover:bg-fourthColor"
                content="Không có công ty nào"
              />
            )}
          </div>
          {!!jobs && jobs?.totalPages > 1 && (
            <div className="flex justify-end w-full">
              <PaginationComponent
                currentPage={currentPage}
                totalPages={jobs?.totalPages}
                className={"flex justify-end"}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobsCLient;
