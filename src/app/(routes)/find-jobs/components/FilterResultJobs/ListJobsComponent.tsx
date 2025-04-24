import { SearchX } from "lucide-react";
import JobComponent from "./JobComponent";
import { JobPublic } from "@/types/Jobs";

type Props = {
  jobs: JobPublic[] | undefined;
  refetch:any
};

const ListJobsComponent = ({ jobs ,refetch}: Props) => {
  return (
    <div className="flex flex-col gap-3">
      {jobs && jobs.length > 0 ? (
        jobs.map((job) => <JobComponent refetch={refetch} job={job} key={job.id} />)
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
          <SearchX className="w-10 h-10"/>
          <h3 className="text-lg font-semibold">Không tìm thấy kết quả</h3>
          <p className="mt-2 text-sm">
            Vui lòng thử lại với các tiêu chí khác.
          </p>
        </div>
      )}
    </div>
  );
};

export default ListJobsComponent;
