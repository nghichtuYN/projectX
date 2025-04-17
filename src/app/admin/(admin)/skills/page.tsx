"use client";
import DialogDelete from "@/app/(employer)/employer/recruitment-campaigns/[id]/(components)/DialogDelete";
import TableComponent, { TableColumn } from "@/components/TableComponent";
import { useMutationHook } from "@/hooks/useMutationHook";
import { getAllSkills } from "@/queries/queries";
import { deleteSkill } from "@/services/skills";
import { Skills } from "@/types/skills";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import DialogEditSkill from "./components/DialogEditSkill";
import EmployerSidebaHeaderComponent from "@/components/EmployerSidebaHeaderComponent";
import { Minus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import SkeletonTableComponent from "@/components/SeketonTable";
import PaginationComponent from "@/components/PaginationComponent";
import DialogAddSkill from "./components/DialogAddSkill";

const AdminSkillsPage = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const searchValue = searchParams.get("search") || "";
  const currentPage = Number(searchParams.get("page") || 1);
  const {
    data: skills,
    refetch,
    isLoading,
    isFetching,
  } = getAllSkills(searchValue, 10, currentPage, true);
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
      return deleteSkill(id);
    },
    (data) => {
      toast.success("Xóa kỹ năng thành công");
      refetch();
    },
    (error) => {
      toast.error("Xóa kỹ năng thất bại");
    }
  );
  const columns: TableColumn<Skills>[] = [
    {
      key: "name",
      title: "Tên kỹ năng",
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
      key: "description",
      title: "Mô tả",
      renderColumn: (row) => {
        return (
          <div className="flex justify-start items-center gap-2 w-full">
            <div className="flex flex-col w-full">
              <span className="font-medium ">
                {row.description ? (
                  row.description
                ) : (
                  <div className="flex items-center justify-center">
                    <Minus className="w-5 h-5" />
                    <Minus className="w-5 h-5" />
                  </div>
                )}
              </span>
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
            <DialogEditSkill id={row.id} refetch={refetch} />
            <DialogDelete mutationDelete={mutationDelete} id={row?.id} />
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
            Quản lý kỹ năng
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
                  placeholder="Tên kỹ năng"
                  defaultValue={searchParams.get("search")?.toString() || ""}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="border-none h-11 focus-visible:ring-0 placeholder:font-medium rounded-3xl placeholder:overflow-hidden placeholder:text-ellipsis"
                />
              </div>
              <DialogAddSkill refetch={refetch} />
            </div>
            {isLoading || isFetching ? (
              <SkeletonTableComponent columnsCount={3} />
            ) : (
              <TableComponent
                columns={columns}
                rowKey={"id"}
                rows={skills?.items || []}
                rowClassName="group h-28 hover:bg-fourthColor"
                content="Không có tin tuyển dụng nào"
              />
            )}
            {!!skills && skills?.totalPages > 1 && (
              <div className="flex justify-end w-full">
                <PaginationComponent
                  currentPage={skills.pageNumber}
                  totalPages={skills.totalPages}
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

export default AdminSkillsPage;
