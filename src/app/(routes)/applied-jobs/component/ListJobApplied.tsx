import { Input } from "@/components/ui/input";
import { getAplliedJob } from "@/queries/queries";
import { Loader2, Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import EmptyState from "../../saved-jobs/components/EmptyState";
import JobApplied from "./JobApplied";

const ListJobApplied = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const searchValue = searchParams.get("search") || "";
  const currentPage = Number(searchParams.get("page") || 1);
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);
  const {
    data: listAppliedJobs,
    refetch,
    isLoading,
    isFetching,
  } = getAplliedJob(searchValue, currentPage);
  return (
    <div className="bg-white rounded-b-lg p-4 shadow-sm min-h-[80vh]">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-[15px] font-normal text-gray-800 mb">
          Danh sách{" "}
          <span className="font-bold">
            {listAppliedJobs?.items?.length
              ? listAppliedJobs?.items?.length
              : 0}
          </span>{" "}
          việc làm đã lưu
        </h2>
        <div className="flex items-center gap-2 border ">
          <Search className="h-4 w-4 text-muted-foreground ml-1" />
          <Input
            placeholder={"Tên việc làm"}
            defaultValue={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            className="border-none focus-visible:ring-0 placeholder:font-medium"
          />
        </div>
      </div>

      {isLoading || isFetching ? (
        <div className="flex justify-center">
          <Loader2 className="w-10 h-10 animate-spin" />
        </div>
      ) : listAppliedJobs && listAppliedJobs?.items?.length ? (
        listAppliedJobs?.items?.map((appliedJob) => (
          <JobApplied key={appliedJob.id} appliedJob={appliedJob} />
        ))
      ) : (
        <EmptyState search={searchValue} />
      )}
    </div>
  );
};

export default ListJobApplied;
