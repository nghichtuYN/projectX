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
import { getApplyByCampain } from "@/queries/queries";
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
  const label = searchParams.get("label") || "";
  const quick_filter = searchParams.get("quick_filter") || "jobs";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const param = useParams();
  const id = param.id as string | undefined;
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
      params.set("quick_filter", term);
    } else {
      params.delete("quick_filter");
    }
    router.replace(`${pathName}?${params.toString()}`);
  };
  const handleLabelChange = (term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("label", term);
    } else {
      params.delete("label");
    }
    router.replace(`${pathName}?${params.toString()}`);
  };
  const {
    data: applications,
    isLoading,
    isFetching,
    refetch,
  } = getApplyByCampain(id, keyword, page);

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
  const columns: TableColumn<Apllication>[] = [
    {
      key: "id",
      title: "Ứng viên",
      renderColumn: (row) => {
        return (
          <div className="flex flex-col gap-2">
            <p>Họ và tên: {row.fullName}</p>
            <p>SĐT: {row.phoneNumber}</p>
            <p>Email: {row.email}</p>
          </div>
        );
      },
    },
    {
      key: "introduction",
      title: "Mô tả",
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
    <div className="container w-full  mx-auto p-4 space-y-4 bg-white">
      <div className="flex items-center gap-2 pt-2 pl-2 pr-2 w-full">
        <div className="w-2/3 flex  items-center gap-2  ">
          <SearchApllication
            keyWord={keyword}
            onChangeKeyWordVaule={handleKeywordChange}
          />
          <FilterComponent
            dataOptions={ApplicationOption}
            filterBy={quick_filter}
            onChangeFilterByValue={handleQuickFilterChange}
            placeholder="Hiển thị tất cả"
          />
          <FilterComponent
            dataOptions={LabelOption}
            filterBy={label}
            onChangeFilterByValue={handleLabelChange}
            placeholder="Tất cả nhãn"
          />
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
        <SkeletonTableComponent columnsCount={5} />
      ) : (
        <TableComponent
          columns={columns}
          rowKey={"id"}
          rows={applications?.items || []}
          rowClassName="group hover:bg-fourthColor"
          content="Không có tin tuyển dụng nào"
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
