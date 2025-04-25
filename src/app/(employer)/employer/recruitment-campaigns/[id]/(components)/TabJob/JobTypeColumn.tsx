import { Job } from "@/types/Jobs";
type Props = {
  row: Job;
};

const JobTypeColumn = ({ row }: Props) => {
  return (
    <div className="flex flex-wrap gap-2">
      {row.jobTypes?.map((jobType) => (
        <div key={jobType.id}>{jobType?.name},</div>
      ))}
    </div>
  );
};

export default JobTypeColumn;
