import React from "react";
import { BusinessVerification } from "@/types/BusinessVerification";
type Props = {
  row: BusinessVerification;
};
const MajorColumn = ({ row }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      {row.company?.majors?.map((major) => (
        <p className="text-xs text-gray-500" key={major.id}>
          {major.name}
        </p>
      ))}
    </div>
  );
};

export default MajorColumn;
