import { Badge } from "@/components/ui/badge";
import { StatusJob } from "@/data/JobStatus";
import { cn, formatDate, formatDateForInput } from "@/lib/utils";
import { Job } from "@/types/Jobs";
import { Minus } from "lucide-react";
import Link from "next/link";
type Props = {
  row: Job;
  id?: string;
};
export const getBadgeStyle = (
  status: number
): {
  variant: "default" | "outline" | "secondary" | "destructive";
  className?: string;
} => {
  switch (status) {
    case 0:
      return { variant: "secondary", className: "bg-gray-200 text-gray-800" }; // Nháp
    case 1:
      return { variant: "default", className: "bg-yellow-100 text-yellow-800" }; // Chờ duyệt
    case 2:
      return { variant: "destructive" }; // Từ chối
    case 3:
      return { variant: "default", className: "bg-green-100 text-green-800" }; // Kích hoạt
    case 4:
      return { variant: "outline", className: "text-gray-500 border-gray-300" }; // Đóng
    default:
      return { variant: "default" };
  }
};
const JobInfoColumn = ({ row, id }: Props) => {
  const statusLabel = StatusJob.find((s) => s.status === row.status)?.label;
  const { variant, className } = getBadgeStyle(row.status);
  return (
    <div className="flex justify-start items-start gap-2 w-full">
      <div className="flex flex-col gap-1 w-full">
        <span className="font-medium text-xs">#{row.id}</span>
        {id ? (
          <Link
            className="hover:underline w-2/3"
            href={`/employer/recruitment-campaigns/${id}/edit_job/${row?.id}`}
          >
            <p title={row.title} className="truncate">
              {row.title}
            </p>
          </Link>
        ) : (
          <p title={row.title} className="truncate">
            {row.title}
          </p>
        )}
        <div className="flex items-center gap-1">
          <p>{formatDate(row.startDate!)}</p>
          <Minus className="w-4 h-4" />
          <p>{formatDate(row.endDate!)}</p>
          <p></p>
        </div>
        <div>
          <p className="w-2/3 truncate text-sm text-gray-500">
            {row.officeAddress}
          </p>
        </div>
        <div className="w-full">
          <p className="w-2/3 truncate text-sm text-gray-500">
            {row.location.name}
          </p>
        </div>
        <Badge variant={variant} className={cn(className, "w-fit")}>
          {statusLabel}
        </Badge>

        {row?.rejectReason && row.status === 2 && (
          <p>Lí do: {row.rejectReason}</p>
        )}
      </div>
    </div>
  );
};

export default JobInfoColumn;
