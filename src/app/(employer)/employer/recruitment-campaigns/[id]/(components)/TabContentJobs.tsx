import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import FilterComponent from "../../(components)/FilterJobComponent";
import { Input } from "@/components/ui/input";
import { JobOptions } from "@/data/Jobs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getJobsByCampaignId } from "@/queries/queries";
import TableComponent, { TableColumn } from "@/components/TableComponent";
import { Job } from "@/types/Jobs";
import { Settings } from "lucide-react";
import SkeletonTableComponent from "@/components/SeketonTable";
import { useMutationHook } from "@/hooks/useMutationHook";
import { deleteJob } from "@/services/jobs";
import { toast } from "sonner";
import PaginationComponent from "@/components/PaginationComponent";
import JobInfoColumn from "./TabJob/JobInfoColumn";
import ContracTypeColumn from "./TabJob/ContracTypeColumn";
import JobLevelColumn from "./TabJob/JobLevelColumn";
import JobTypeColumn from "./TabJob/JobTypeColumn";
import SkillsColumn from "./TabJob/SkillsColumn";
import SalaryColumn from "./TabJob/SalaryColumn";
import Action from "./TabJob/Action";
import { useDebouncedCallback } from "use-debounce";

const TabContentJobs = () => {
  const param = useParams();
  const id = param.id as string | undefined;
  const jobId = param.jobid as string;
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
        return <JobInfoColumn id={id} row={row} />;
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
      key: "status",
      classname: "max-w-[60px]",
      title: (
        <div className="flex justify-center">
          <Settings className="w-5 h-5" />
        </div>
      ),
      renderColumn: (row) => {
        return <Action row={row} mutationDelete={mutationDelete} />;
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
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);

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
          rowClassName="group  hover:bg-fourthColor"
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
