"use client";
import { useEffect } from "react";
import EmployerSidebaHeaderComponent from "@/components/EmployerSidebaHeaderComponent";
import SearchInputCampainComponent from "@/components/SearchInputCampainComponent";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import TableComponent, { TableColumn } from "@/components/TableComponent";
import { campaignOptions } from "@/data/campain";
import { campaignType } from "@/types/campaign";
import { getCampaigns } from "@/queries/queries";
import PaginationComponent from "@/components/PaginationComponent";
import SkeletonTableComponent from "@/components/SeketonTable";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useMutationHook } from "@/hooks/useMutationHook";
import { updateCampaign } from "@/services/campaign";
import { toast } from "sonner";
import { useAuthStore } from "@/store/UserStore";
import { CampaignContext } from "@/contexts/CampaignContex";
import FilterComponent from "./FilterJobComponent";
import DialogAddCampaignComponent from "./DialogAddCampaignComponent";
import CampaignColumn from "./CampaignColumn";
import JobCampaign from "./JobCampaign";

const CampainClient = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const filterBy = searchParams.get("filterBy") || "";
  const searchValue = searchParams.get("search") || "";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (user && !user?.recruiterVerified) {
      router.push("/employer/employer-verify");
    }
  }, [user]);

  const handleFilterBy = (filter_by: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (filter_by) {
      params.set("filter_by", filter_by);
    } else {
      params.delete("filter_by");
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  const {
    data: campaigns,
    refetch,
    isLoading,
    isFetching,
  } = getCampaigns(searchValue, currentPage);

  const updateStatusMutation = useMutationHook(
    (dataUpdate: campaignType) => {
      const { id } = dataUpdate;
      return updateCampaign(id, {
        name: dataUpdate?.name,
        description: dataUpdate?.description,
        open: dataUpdate.open,
        close: dataUpdate.close,
        status: dataUpdate.status,
      });
    },
    (data) => {
      refetch();
      toast.success(
        `Chiến dịch đã được ${data.status === 1 ? "kích hoạt" : "tạm dừng"}`
      );
    },
    (error) => {
      toast.error("Có lỗi xảy ra khi cập nhật trạng thái chiến dịch");
    }
  );

  const handleStatusChange = (row: campaignType) => {
    const newStatus = row.status === 1 ? 0 : 1;
    updateStatusMutation.mutate({ ...row, status: newStatus });
  };

  const columns: TableColumn<campaignType>[] = [
    {
      key: "name",
      classname: "w-[300px] h-full",
      title: "Chiến dịch tuyển dụng",
      renderColumn: (row) => {
        return (
          <CampaignColumn row={row} handleStatusChange={handleStatusChange} />
        );
      },
    },
    {
      key: "countJobs",
      title: "Tin tuyển dụng",
      renderColumn: (row) => {
        return <JobCampaign row={row} />;
      },
    },
    {
      key: "description",
      title: "CV từ hệ thống",
      renderColumn: (row) => {
        return (
          <div className="space-y-1">
            <div>CV đề xuất</div>
            <div className="text-sm text-gray-500">Chưa kích hoạt</div>
            <Button variant="ghost" size="sm" className="text-blue-500">
              <Eye className="w-4 h-4 mr-1" /> Xem chi tiết
            </Button>
          </div>
        );
      },
    },
    {
      key: "id",
      title: "Lọc CV",
      renderColumn: (row) => {
        return (
          <Button variant="outline" size="sm">
            Tìm CV
          </Button>
        );
      },
    },
    {
      key: "status",
      title: "Dịch vụ đang chạy",
      renderColumn: (row) => {
        return (
          <Button variant="outline" size="sm" className="text-green-500">
            Thêm
          </Button>
        );
      },
    },
  ];

  return (
    <CampaignContext.Provider value={{ refetch }}>
      <EmployerSidebaHeaderComponent>
        <div className="flex w-full justify-between items-center">
          <p className="text-lg font-semibold text-secondaryColor">
            Quản lý chiến dịch
          </p>
        </div>
      </EmployerSidebaHeaderComponent>
      <div className="pt-14 pl-8 pr-8 w-full">
        <div className="container w-full mx-auto p-4 space-y-4 bg-accent">
          <div className="flex gap-4 items-center">
            <FilterComponent
              dataOptions={campaignOptions}
              filterBy={filterBy}
              placeholder="Tất cả chiến dịch"
              onChangeFilterByValue={handleFilterBy}
            />
            <SearchInputCampainComponent
              page={currentPage}
              filterBy={filterBy}
              searchValue={searchValue}
              placeholder="Tìm chiến dịch (Nhấn enter để tìm kiếm)"
            />
            <DialogAddCampaignComponent refetch={refetch} />
          </div>
          <div>
            <div className="border rounded-lg bg-white">
              {isLoading || isFetching ? (
                <SkeletonTableComponent columnsCount={5} />
              ) : (
                <TableComponent
                  rows={campaigns?.items || []}
                  rowKey="id"
                  columns={columns}
                  rowClassName="group h-28 hover:bg-fourthColor"
                  content="Không có chiến dịch nào"
                />
              )}
            </div>
            {!!campaigns && campaigns?.totalPages > 1 && (
              <div className="flex justify-end w-full">
                <PaginationComponent
                  currentPage={currentPage}
                  totalPages={campaigns?.totalPages}
                  className={"flex justify-end"}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </CampaignContext.Provider>
  );
};

export default CampainClient;
