import { getSavedJob } from "@/queries/queries";
import JobSaved from "./JobSaved";
import { useMutationHook } from "@/hooks/useMutationHook";
import { toast } from "sonner";
import { unsaveJob } from "@/services/jobs";
import { Loader2, Search } from "lucide-react";
import EmptyState from "./EmptyState";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
const ListJobsSaved = () => {
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
    data: listJobSaveds,
    refetch,
    isLoading,
    isFetching,
  } = getSavedJob(searchValue, currentPage);

  const mutation = useMutationHook(
    (data: { id: string }) => {
      const { id } = data;
      return unsaveJob(id);
    },
    (data) => {
      toast.success("Bỏ lưu tin thành công ");
      refetch();
    },
    (error) => {
      toast.error("Bỏ lưu thất bại");
    }
  );

  const handleSaveJob = (id: string) => {
    if (id) {
      mutation.mutate({ id });
    }
  };
  return (
    
    <div className="bg-white rounded-b-lg p-4 shadow-sm min-h-[80vh]">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-[15px] font-normal text-gray-800 mb">
          Danh sách{" "}
          <span className="font-bold">
            {listJobSaveds?.items?.length ? listJobSaveds?.items?.length : 0}
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
      ) : listJobSaveds && listJobSaveds?.items?.length ? (
        listJobSaveds?.items?.map((job) => (
          <JobSaved handleSaveJob={handleSaveJob} key={job.id} job={job} />
        ))
      ) : (
        <EmptyState search={searchValue} />
      )}
    </div>
  );
};

export default ListJobsSaved;
