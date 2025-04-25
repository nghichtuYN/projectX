import { Job } from "@/types/Jobs";

type Props = {
  row: Job;
};

const SalaryColumn = ({ row }: Props) => {
  return (
    <div>
      {row.minSalary && row.maxSalary ? (
        `${row.minSalary} - ${row.maxSalary}`
      ) : (
        <div className="text-xs">Thỏa thuận</div>
      )}
    </div>
  );
};

export default SalaryColumn;
