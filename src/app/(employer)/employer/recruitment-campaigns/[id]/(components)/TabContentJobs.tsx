import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import React, { useEffect, useMemo } from "react";
import FilterComponent from "../../(components)/FilterJobComponent";
import { Input } from "@/components/ui/input";
import { JobOptions } from "@/data/Jobs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getJobsByCampaignId } from "@/queries/queries";
import TableComponent, { TableColumn } from "@/components/TableComponent";
import { Job } from "@/types/Jobs";

import { Pencil } from "lucide-react";
import { useDebounce } from "use-debounce";
import SkeletonTableComponent from "@/components/SeketonTable";
import DialogDeleteJob from "./DialogDelete";

import { useMutationHook } from "@/hooks/useMutationHook";
import { deleteJob } from "@/services/jobs";
import { toast } from "sonner";
import PaginationComponent from "@/components/PaginationComponent";
type Props = {
  activeTab: string;
};

const TabContentJobs = ({ activeTab }: Props) => {
  const param = useParams();
  const id = param.id as string | undefined;
  if (!id) {
    return <div>Campaign ID không hợp lệ</div>;
  }
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const filterBy = searchParams.get("filterBy") || "";
  const searchValue = searchParams.get("search") || "";
  const currentPage = Number(searchParams.get("page") || 1);
  const {
    data: jobs,
    isLoading,
    isFetching,
    refetch,
  } = getJobsByCampaignId(id, searchValue, currentPage);

  const columns: TableColumn<Job>[] = [
    {
      key: "title",
      classname: "max-w-[250px] h-full",
      title: "Tin tuyển dụng",
      renderColumn: (row) => {
        return (
          <div className="flex justify-start items-start gap-2 w-full">
            <div className="flex flex-col w-full">
              <span className="font-medium text-xs">
                #{row.id.replace(/-/g, "")}
              </span>
              <Link
                className="hover:underline w-2/3"
                href={`/employer/recruitment-campaigns/${row?.id}?active_tab=jobs`}
              >
                <p className="truncate">{row.title}</p>
              </Link>
              <div className="">
                <p className="w-2/3 truncate text-sm text-gray-500">
                  {row.officeAddress}
                </p>
              </div>
              <div className="w-full">
                <p className="w-2/3 truncate text-sm text-gray-500">
                  {row.location.name}
                </p>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      key: "contractTypes",
      title: "Loại hình ",
      classname: "max-w-[150px]",
      renderColumn: (row) => {
        return (
          <div className="flex flex-wrap gap-2">
            {row.contractTypes?.map((contractTypes) => (
              <div key={contractTypes.id}>{contractTypes?.name},</div>
            ))}
          </div>
        );
      },
    },
    {
      key: "jobLevels",
      title: "Chức vụ",
      classname: "max-w-[150px]",
      renderColumn: (row) => {
        return (
          <div className="flex flex-wrap gap-2 ">
            {row.jobLevels?.map((jobLevel) => (
              <div key={jobLevel.id}>{jobLevel?.name},</div>
            ))}
          </div>
        );
      },
    },
    {
      key: "jobTypes",
      title: "Hình thức",
      classname: "max-w-[150px]",

      renderColumn: (row) => {
        return (
          <div
            className="flex flex-wrap gap-2
          "
          >
            {row.jobTypes?.map((jobType) => (
              <div key={jobType.id}>{jobType?.name},</div>
            ))}
          </div>
        );
      },
    },
    {
      key: "skills",
      title: "Kỹ năng",
      classname: "max-w-[150px]",
      renderColumn: (row) => {
        return (
          <div
            className="flex flex-wrap gap-2
          "
          >
            {row.skills?.map((skill) => (
              <div key={skill.id}>{skill?.name},</div>
            ))}
          </div>
        );
      },
    },
    {
      key: "minSalary",
      title: "Lương",
      renderColumn: (row) => {
        return (
          <div className="">
            {row.minSalary && row.maxSalary ? (
              `${row.minSalary} - ${row.maxSalary}`
            ) : (
              <div className="text-xs">Thỏa thuận</div>
            )}
          </div>
        );
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
      key: "status",
      classname: "max-w-[60px]",
      renderColumn: (row) => {
        return (
          <div className="flex items-center  gap-3 justify-center w-full">
            <Link
              href={`/employer/recruitment-campaigns/${id}/edit_job/${row?.id}`}
            >
              <Pencil className="w-5 h-5 text-yellow-500" />
            </Link>
            <DialogDeleteJob mutationDelete={mutationDelete} id={row?.id} />
          </div>
        );
      },
    },
  ];
  const onSuccess = (data: any) => {
    toast.success("Xóa thành công");
    refetch();
  };

  const onError = (error: any) => {
    toast.error("Xóa thất bại");
    console.log(error);
  };
  const mutationDelete = useMutationHook(
    (data: any): Promise<any> => {
      const { id } = data;
      if (id) {
        return deleteJob(id);
      }
      return Promise.reject(new Error("ID không hợp lệ"));
    },
    onSuccess,
    onError
  );
  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleFilterBy = (filter_by: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (filter_by) {
      params.set("filter_by", filter_by);
    } else {
      params.delete("filter_by");
    }
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="container w-full  mx-auto p-4 space-y-4 bg-white">
      <div className="flex gap-4 items-center">
        <FilterComponent
          dataOptions={JobOptions}
          filterBy={filterBy}
          onChangeFilterByValue={handleFilterBy}
          placeholder="Tất cả tin tuyển dụng"
        />
        <Input
          defaultValue={searchParams.get("search")?.toString() || ""}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Tên tin tuyển dụng"
        />
        <Link href={`/employer/recruitment-campaigns/${id}/create_job`}>
          <Button>Tạo tin tuyển dụng mới</Button>
        </Link>
      </div>
      {isLoading || isFetching ? (
        <SkeletonTableComponent columnsCount={10} />
      ) : (
        <TableComponent
          columns={columns}
          rowKey={"id"}
          rows={jobs?.items || []}
          rowClassName="group h-28 hover:bg-fourthColor"
          content="Không có tin tuyển dụng nào"
        />
      )}
      {!!jobs && jobs?.totalPages > 1 && (
        <div className="flex justify-end w-full">
          <PaginationComponent
            currentPage={jobs.pageNumber}
            totalPages={jobs.totalPages}
            className={"flex justify-end"}
          />
        </div>
      )}
    </div>
  );
};

export default TabContentJobs;
