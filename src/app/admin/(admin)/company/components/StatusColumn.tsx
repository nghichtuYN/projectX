import { Badge } from "@/components/ui/badge";
import { BusinessVerification } from "@/types/BusinessVerification";
import React from "react";
type Props = {
  row: BusinessVerification;
};
const StatusColumn = ({ row }: Props) => {
  return (
    <div className="text-center">
      {row.company.status === 0 && (
        <Badge  className="text-xs bg-yellow-500">Đang chờ duyệt</Badge>
      )}
      {row.company.status === 1 && (
        <Badge className="text-xs bg-green-500">Đã duyệt</Badge>
      )}
      {row.company.status === 2 && (
        <Badge className="text-xs bg-red-500">Bị từ chối</Badge>
      )}
    </div>
  );
};

export default StatusColumn;
