import { Button } from "@/components/ui/button";

import React from "react";
import SearchApllication from "./SearchApllication";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import FilterComponent from "../../../(components)/FilterJobComponent";
import { ApplicationOption, LabelOption, ProcessOption } from "@/data/Jobs";
import { getApllicatinByJobID, getApplyByCampain } from "@/queries/queries";
import SkeletonTableComponent from "@/components/SeketonTable";
import TableComponent, { TableColumn } from "@/components/TableComponent";
import PaginationComponent from "@/components/PaginationComponent";
import { Apllication } from "@/types/Apllication";
import { useMutationHook } from "@/hooks/useMutationHook";
import {
  hireApllication,
  interViewApllication,
  offerApllication,
  rejectApllication,
  seenApllication,
  shortlistApllication,
} from "@/services/application";
import { X } from "lucide-react";
import DialogAddAppointment from "./DialogAddAppointment";
import {
  formatDate,
  formatDateForInput,
  formatDateForInputTime,
} from "@/lib/utils";
import Link from "next/link";
// import * as XLSX from "xlsx";

const processActionMap: { [key: string]: (id: string) => Promise<any> } = {
  "1": shortlistApllication,
  "2": interViewApllication,
  "3": offerApllication,
  "4": hireApllication,
  "5": rejectApllication,
};

const TabContentApplyCv = () => {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const proces = searchParams.get("process") || "";
  const seen = searchParams.get("seen") || "all";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const param = useParams();
  const id = param.id as string | undefined;
  const jobId = param.jobid as string;

  if (!id) return <p>...</p>;
  const handleKeywordChange = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("keyword", term);
    } else {
      params.delete("keyword");
    }
    router.replace(`${pathName}?${params.toString()}`);
  }, 300);
  const handleQuickFilterChange = (term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      if (term === "all") {
        params.delete("seen");
      } else params.set("seen", term);
    } else {
      params.delete("seen");
    }
    router.replace(`${pathName}?${params.toString()}`);
  };
  const handleLabelChange = (term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("process", term);
    } else {
      params.delete("process");
    }
    router.replace(`${pathName}?${params.toString()}`);
  };
  const getData = () => {
    if (jobId) return getApllicatinByJobID(jobId, keyword, page, seen, proces);
    return getApplyByCampain(id, keyword, page, seen, proces);
  };
  const { data: applications, isLoading, isFetching, refetch } = getData();

  const mutation = useMutationHook(
    (data: { id: string }) => {
      const { id } = data;
      return seenApllication(id);
    },
    (data) => {
      refetch();
    }
  );
  const processMutation = useMutationHook(
    (data: { id: string; process: string }) => {
      const { id, process } = data;
      const actionFn = processActionMap[process];
      if (!actionFn) throw new Error("Invalid process type");
      return actionFn(id);
    },
    () => {
      refetch();
    }
  );

  const handleSeenCv = (id: string) => {
    mutation.mutate({ id: id });
  };
  const handleProcessChange = (id: string, process: string) => {
    processMutation.mutate({ id, process });
  };
  const handleDeleteFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    params.delete("process");
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  };
  // const handleExport = () => {
  //   const data = [
  //     { name: "John Doe", email: "john@example.com" },
  //     { name: "Jane Doe", email: "jane@example.com" },
  //   ];
  //   const worksheet = XLSX.utils.json_to_sheet(data);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "CV List");
  //   XLSX.writeFile(workbook, "CV_List.xlsx");
  // };
  // const;
  const parseTime = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };
  const columns: TableColumn<Apllication>[] = [
    {
      key: "id",
      title: "Ứng viên",
      renderColumn: (row) => {
        return (
          <div className="flex flex-col gap-2 max-h-fit">
            <p>Họ và tên: {row.fullName}</p>
            <p>SĐT: {row.phoneNumber}</p>
            <p>Email: {row.email}</p>
            <Link
              href={`/employer/applications/${row.id}`}
              className="hover:underline group-hover:block hidden"
            >
              Xem chi tiết
            </Link>
          </div>
        );
      },
    },
    {
      key: "introduction",
      title: "Thư giới thiệu",
      renderColumn: (row) => {
        return (
          <div className="flex flex-col gap-2">
            <p>{row.introduction}</p>
          </div>
        );
      },
    },
    {
      key: "process",
      title: "Trạng thái",
      renderColumn: (row) => {
        return (
          <div className="flex justify-center">
            <FilterComponent
              dataOptions={ProcessOption}
              filterBy={row.process.toString()}
              onChangeFilterByValue={(value) =>
                handleProcessChange(row.id, value)
              }
              placeholder="Hiển thị tất cả"
            />
          </div>
        );
      },
    },
    {
      key: "appoitment",
      title: "Lịch hẹn",
      renderColumn: (row) => {
        const formattedStartTime = new Date(
          row?.appointment?.startTime!
        ).toLocaleTimeString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
        });

        const formattedEndTime = new Date(
          row?.appointment?.endTime!
        ).toLocaleTimeString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
        });

        return (
          <div className="flex justify-center">
            {row?.appointment ? (
              <div className="flex flex-col">
                <p>
                  {" "}
                  Ngày:{" "}
                  {formatDateForInput(new Date(row?.appointment?.startTime))}
                </p>
                <p className="flex items-center gap-2">
                  Bắt đầu: {/* {new Date(row.appointment?.startTime)} */}
                  {formattedStartTime}
                  {/* {row.appointment?.startTime} */}
                </p>
                <p>
                  Kết thúc:
                  {formattedEndTime}
                  {/* {parseTime(row?.appointment?.endTime)} */}
                </p>
                <p>Ghi chú: {row.appointment?.note}</p>
              </div>
            ) : (
              <DialogAddAppointment row={row} />
            )}
          </div>
        );
      },
    },
    {
      key: "resume",
      title: "CV ứng tuyển",
      renderColumn: (row) => {
        return (
          <div className="w-full flex justify-center">
            <a
              onClick={() => handleSeenCv(row.id)}
              href={`${process.env.NEXT_PUBLIC_API_URL_IMAGE}${row.resume.path}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-sm text-gray-500 hover:font-semibold hover:text-secondaryColor"
            >
              Xem chi tiết
            </a>
          </div>
        );
      },
    },
  ];

  return (
    <div className=" w-full  mx-auto p-4 space-y-4 bg-white">
      <div className="flex items-center gap-2 pt-2 pl-2 pr-2 w-full">
        <div className="w-2/3 flex  items-center gap-2  ">
          <SearchApllication
            keyWord={keyword}
            onChangeKeyWordVaule={handleKeywordChange}
          />
          <FilterComponent
            dataOptions={ApplicationOption}
            filterBy={seen}
            onChangeFilterByValue={handleQuickFilterChange}
            placeholder="Hiển thị tất cả CV"
          />
          <div className="flex gap-2 items-center">
            <FilterComponent
              dataOptions={ProcessOption}
              filterBy={proces}
              onChangeFilterByValue={handleLabelChange}
              placeholder="Lọc theo trạng thái"
            />
            {proces && (
              <X
                className="w-4 h-4 cursor-pointer "
                onClick={handleDeleteFilter}
              />
            )}
          </div>
        </div>
        <div className="flex justify-end w-1/3">
          <Button
            variant={"outline"}
            className="boder border-secondaryColor rounded-3xl text-secondaryColor pr-6"
            // onClick={handleExport}
          >
            Xuất danh sách CV
          </Button>
        </div>
      </div>

      {isLoading || isFetching ? (
        <SkeletonTableComponent columnsCount={5} rowsCount={1} />
      ) : (
        <TableComponent
          columns={columns}
          rowKey={"id"}
          rows={applications?.items || []}
          rowClassName="group hover:bg-fourthColor"
          content="Không có ứng viên nào"
        />
      )}
      {!!applications && applications?.totalPages > 1 && (
        <div className="flex justify-end w-full">
          <PaginationComponent
            currentPage={applications.pageNumber}
            totalPages={applications.totalPages}
            className={"flex justify-end"}
          />
        </div>
      )}
    </div>
  );
};

export default TabContentApplyCv;
