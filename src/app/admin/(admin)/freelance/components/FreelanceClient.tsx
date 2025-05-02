"use client";
import TableComponent, { TableColumn } from "@/components/TableComponent";
import { useMutationHook } from "@/hooks/useMutationHook";
import { getFreelanceVerified } from "@/queries/queries";
import { acceptFreelance, rejectFreelance } from "@/services/admin";
import { FreelanceUser } from "@/types/Freelance";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import FilterComponent from "@/app/(employer)/employer/recruitment-campaigns/(components)/FilterJobComponent";
import { Input } from "@/components/ui/input";
import SkeletonTableComponent from "@/components/SeketonTable";
import PaginationComponent from "@/components/PaginationComponent";
import {  FreelanceOptions } from "@/data/Jobs";
import UserColumn from "./UserColumn";
import StatusColumn from "./StatusColumn";
import FrontIdCard from "./FrontIdCard";
import BackIdCard from "./BackIdCard";
import ActionColumn from "./ActionColumn";


export default function FreelanceClient() {
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
      renderColumn: (row) => <UserColumn row={row} />,
    },
    {
      key: "status",
      title: "Trạng thái",
      renderColumn: (row) => <StatusColumn row={row} />,
    },
    {
      key: "front",
      title: "Mặt trước",
      renderColumn: (row) => <FrontIdCard row={row} />,
    },
    {
      key: "back",
      title: "Mặt sau",
      renderColumn: (row) => <BackIdCard row={row} />,
    },
    {
      key: "action",
      title: "Thao tác",
      renderColumn: (row) => (
        <ActionColumn
          row={row}
          handleAccept={handleAccept}
          handleReject={handleReject}
        />
      ),
    },
  ];

  return (
    <div className="pt-14 pl-8 pr-8 w-full">
      <div className="container w-full mx-auto p-4 space-y-4 bg-accent">
        <div className="flex gap-4 items-center">
          <FilterComponent
            dataOptions={FreelanceOptions}
            filterBy={filterBy}
            onChangeFilterByValue={handleFilterBy}
            placeholder="Tất cả tin tuyển dụng"
          />
          <Input
            defaultValue={searchParams.get("search")?.toString() || ""}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Tên nhà tuyển dụng"
          />
        </div>
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
                content="Không có nhà tuyển dụng nào"
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
}