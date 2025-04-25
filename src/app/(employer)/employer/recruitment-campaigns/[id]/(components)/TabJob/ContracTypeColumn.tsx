import { Job } from "@/types/Jobs";
type Props = {
  row: Job;
};

const ContracTypeColumn = ({ row }: Props) => {
  return (
    <div className="flex flex-wrap gap-2">
      {row.contractTypes?.map((contractTypes) => (
        <div key={contractTypes.id}>{contractTypes?.name},</div>
      ))}
    </div>
  );
};

export default ContracTypeColumn;
