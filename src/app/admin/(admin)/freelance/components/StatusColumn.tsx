import { Badge } from "@/components/ui/badge";
import { FreelanceUser } from "@/types/Freelance";
import React from "react";
type Props = {
  row: FreelanceUser;
};
const StatusColumn = ({ row }: Props) => {
  return (
    <div className="text-center">
      {row.freelanceRecruiter.status === 0 && (
        <Badge className="text-xs bg-yellow-500">Đang chờ duyệt</Badge>
      )}
      {row.freelanceRecruiter.status === 1 && (
        <Badge className="text-xs bg-green-500">Đã duyệt</Badge>
      )}
      {row.freelanceRecruiter.status === 2 && (
        <Badge className="text-xs bg-red-500">Bị từ chối</Badge>
      )}
    </div>
  );
};

export default StatusColumn;
