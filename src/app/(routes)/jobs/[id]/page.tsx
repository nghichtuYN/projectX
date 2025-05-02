"use client";
import BreadCrumbComponent from "@/components/BreadCrumbComponent";
import SearchFilterDetailPage from "@/app/(routes)/(components)/SearchFilterDetail/SearchFilterDetailPageComponent";
import { useParams } from "next/navigation";
import { getJobPublicByID } from "@/queries/queries";
import CardJob from "./(components)/CardJob";
import CardDetailJob from "./(components)/CardDetailJob";
import CardCompany from "./(components)/CardCompany";
import CardInfo from "./(components)/CardInfo";
import CardInclude from "./(components)/CardInclude";
import { useMutationHook } from "@/hooks/useMutationHook";
import { saveJob, unsaveJob } from "@/services/jobs";
import { toast } from "sonner";

const JobDetailPage = () => {
  const param = useParams();
  const id = param.id as string | undefined;
  const { data: job, isLoading, refetch } = getJobPublicByID(id!);
  const mutation = useMutationHook(
    (data: { id: string; job: string }) => {
      const { id, job } = data;
      if (job === "save") {
        return saveJob(id);
      }
      return unsaveJob(id);
    },
    (data) => {
      toast.success(
        `${job?.isSaved ? "Bỏ lưu tin thành công " : "Lưu tin thành công"} `
      );
      refetch();
    },
    (error) => {
      toast.error("Lưu tin thất bại");
    }
  );

  const handleSaveJob = () => {
    if (id) {
      mutation.mutate({ id, job: job?.isSaved ? "unsaved" : "save" });
    }
  };

  if (!id) {
    return <div>JobDetailPage</div>;
  }

  return (
    <div className="items-center flex flex-col">
      <SearchFilterDetailPage />
      <div className="w-3/4">
        <BreadCrumbComponent />
        <div className="grid gap-5 pt-3 grid-cols-1 md:grid-cols-3 w-full">
          <div className="col-span-2 flex flex-col items-center gap-5">
            <CardJob job={job} handleSaveJob={handleSaveJob} />
            <CardDetailJob job={job} handleSaveJob={handleSaveJob} />
          </div>
          <div className="col-span-1 w-full flex flex-col gap-4">
            <CardCompany job={job} />
            <CardInfo job={job} />
            <CardInclude job={job} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
