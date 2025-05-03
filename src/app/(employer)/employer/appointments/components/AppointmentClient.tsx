"use client";
import TableComponent, { TableColumn } from "@/components/TableComponent";
import { Appointment } from "@/types/Apllication";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import FilterComponent from "../../recruitment-campaigns/(components)/FilterJobComponent";
import { Input } from "@/components/ui/input";
import SkeletonTableComponent from "@/components/SeketonTable";
import { getAppointment } from "@/queries/queries";
import PaginationComponent from "@/components/PaginationComponent";
import { AppointmentOptions } from "@/data/Jobs";
import ParticipantColumn from "./ParticipantColumn";
import AppointmentColumn from "./AppointmentColumn";

const AppointmentClient = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const filterBy = searchParams.get("filter_by") || "all";
  const searchValue = searchParams.get("search") || "";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const {
    data: listAppointment,
    isLoading,
    isFetching,
  } = getAppointment(searchValue, currentPage, filterBy, 10);
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, 500);
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
  const columns: TableColumn<Appointment>[] = [
    {
      key: "id",
      title: "Ứng viên",
      renderColumn: (row) => <ParticipantColumn row={row} />,
    },
    {
      key: "time",
      title: "Thời gian",
      renderColumn: (row) => <AppointmentColumn row={row} />,
    },
    {
      key: "note",
      title: "Ghi chú",
      renderColumn: (row) => {
        return <div className="flex justify-center">{row?.note}</div>;
      },
    },
  ];
  return (
    <div className="pt-14 pl-8 pr-8 w-full">
      <div className="container w-full mx-auto p-4 space-y-4 bg-accent">
        <div className="flex gap-4 items-center">
          <FilterComponent
            dataOptions={AppointmentOptions}
            filterBy={filterBy}
            onChangeFilterByValue={handleFilterBy}
            placeholder="Tất cả"
          />
          <Input
            defaultValue={searchParams.get("search")?.toString() || ""}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Tên ứng viên"
          />
        </div>
        <div>
          <div className="border rounded-lg bg-white">
            {isLoading || isFetching ? (
              <SkeletonTableComponent columnsCount={7} />
            ) : (
              <TableComponent
                rows={listAppointment?.items || []}
                rowKey="id"
                columns={columns}
                rowClassName="group hover:bg-fourthColor"
                content="Không có nhà tuyển dụng nào"
              />
            )}
          </div>
          {!!listAppointment && listAppointment?.totalPages > 1 && (
            <div className="flex justify-end w-full">
              <PaginationComponent
                currentPage={currentPage}
                totalPages={listAppointment?.totalPages}
                className={"flex justify-end"}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentClient;
