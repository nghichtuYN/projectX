import { Job } from "@/types/Jobs";
import Link from "next/link";
type Props = {
  row: Job;
  id: string;
};
const JobInfoColumn = ({ row,id }: Props) => {
  return (
    <div className="flex justify-start items-start gap-2 w-full">
      <div className="flex flex-col w-full">
        <span className="font-medium text-xs">#{row.id}</span>
        <Link
          className="hover:underline w-2/3"
          href={`/employer/recruitment-campaigns/${id}/edit_job/${row?.id}`}
        >
          <p title={row.title} className="truncate">
            {row.title}
          </p>
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
};

export default JobInfoColumn;
