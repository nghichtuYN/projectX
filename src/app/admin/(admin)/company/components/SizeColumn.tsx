import React from "react";
import { BusinessVerification } from "@/types/BusinessVerification";
import { listSizeCompany } from "@/data/SizeCompany";
type Props = {
  row: BusinessVerification;
};
const SizeColumn = ({ row }: Props) => {
  return (
    <p className="text-xs text-gray-500">
      {
        listSizeCompany.find(
          (size) => Number(size.value) === Number(row.company?.size)
        )?.label
      }{" "}
      nhân viên
    </p>
  );
};

export default SizeColumn;
