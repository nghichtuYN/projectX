"use client";
import DialogDeleteJob from "@/app/(employer)/employer/recruitment-campaigns/[id]/(components)/DialogDelete";
import EmployerSidebaHeaderComponent from "@/components/EmployerSidebaHeaderComponent";
import PaginationComponent from "@/components/PaginationComponent";
import SkeletonTableComponent from "@/components/SeketonTable";
import TableComponent, { TableColumn } from "@/components/TableComponent";
import { Input } from "@/components/ui/input";
import { useMutationHook } from "@/hooks/useMutationHook";
import { getAllJobTypes } from "@/queries/queries";
import { deleteJobType } from "@/services/jobTypes";
import { JobType } from "@/types/JobType";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import DialogAddJobType from "./components/DialogAddJobType";
import DialogEditJobType from "./components/DialogEditJobType";
import { Search } from "lucide-react";

const AdminJobTypesPage = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const searchValue = searchParams.get("search") || "";
  const currentPage = Number(searchParams.get("page") || 1);
  const {
    data: jobTypes,
    refetch,
    isLoading,
    isFetching,
  } = getAllJobTypes(searchValue, 10, currentPage, true);
  const handleSearch = async (term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
  };
  const mutationDelete = useMutationHook(
    (data: { id: string }) => {
      const { id } = data;
      return deleteJobType(id);
    },
    (data) => {
      toast.success("Xóa hình thức công việc thành công");
      refetch();
    },
    (error) => {
      toast.error("Xóa hình thức công việc thất bại");
    }
  );
  const columns: TableColumn<JobType>[] = [
    {
      key: "name",
      title: "Tên hình thức công việc",
      renderColumn: (row) => {
        return (
          <div className="flex justify-start items-start gap-2 w-full">
            <div className="flex flex-col w-full">
              <span className="font-medium ">{row.name}</span>
            </div>
          </div>
        );
      },
    },
    {
      key: "id",
      classname: "max-w-[60px]",
      title: "Tùy chỉnh",
      renderColumn: (row) => {
        return (
          <div className="flex items-center  gap-3 justify-center w-full">
            <DialogEditJobType id={row.id} refetch={refetch} />
            <DialogDeleteJob mutationDelete={mutationDelete} id={row?.id} />
          </div>
        );
      },
    },
  ];
  return (
    <>
      <EmployerSidebaHeaderComponent>
        <div className="flex w-full items-center ">
          <p className="text-lg font-semibold text-secondaryColor">
            Quản lý hình thức công việc
          </p>
        </div>
      </EmployerSidebaHeaderComponent>
      <div className="pt-14 pl-8 pr-8 w-full">
        <div className="container  mx-auto p-4 space-y-4  bg-accent">
          <div className=" grid grid-cols-4 gap-4"></div>
          <div className="container w-full  mx-auto p-4 space-y-4 bg-white">
            <div className="flex gap-4 items-center">
              <div className="flex items-center rounded-3xl bg-white w-full ">
                <Search className="h-4 w-4 text-muted-foreground " />
                <Input
                  placeholder="Tên hình thức công việc"
                  defaultValue={searchParams.get("search")?.toString() || ""}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="border-none h-11 focus-visible:ring-0 placeholder:font-medium rounded-3xl placeholder:overflow-hidden placeholder:text-ellipsis"
                />
              </div>
              <DialogAddJobType refetch={refetch} />
            </div>
            {isLoading || isFetching ? (
              <SkeletonTableComponent columnsCount={10} />
            ) : (
              <TableComponent
                columns={columns}
                rowKey={"id"}
                rows={jobTypes?.items || []}
                rowClassName="group h-28 hover:bg-fourthColor"
                content="Không có tin tuyển dụng nào"
              />
            )}
            {!!jobTypes && jobTypes?.totalPages > 1 && (
              <div className="flex justify-end w-full">
                <PaginationComponent
                  currentPage={jobTypes.pageNumber}
                  totalPages={jobTypes.totalPages}
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

export default AdminJobTypesPage;
