import { Job } from "@/types/Jobs";
type Props = {
  row: Job;
};

const JobLevelColumn = ({ row }: Props) => {
  return (
    <div className="flex flex-wrap gap-2 ">
      {row.jobLevels?.map((jobLevel) => (
        <div key={jobLevel.id}>{jobLevel?.name},</div>
      ))}
    </div>
  );
};

export default JobLevelColumn;
