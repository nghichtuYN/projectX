import { BusinessVerification } from "@/types/BusinessVerification";
import React from "react";
type Props = {
  row: BusinessVerification;
};
const GPKDColumn = ({ row }: Props) => {
  return (
    <div className="w-full flex justify-center">
      <a
        href={`${process.env.NEXT_PUBLIC_API_URL_IMAGE}${row.company.registrationFile.path}`}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline text-sm text-gray-500 hover:font-semibold hover:text-secondaryColor"
      >
        Xem chi tiết
      </a>
    </div>
  );
};

export default GPKDColumn;
