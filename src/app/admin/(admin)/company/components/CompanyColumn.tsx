import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BusinessVerification } from "@/types/BusinessVerification";
import React from "react";
type Props = {
  row: BusinessVerification;
};
const CompanyColumn = ({ row }: Props) => {
  return (
    <div className="flex items-center gap-4">
      <Avatar className="w-12 h-12">
        <AvatarImage
          src={`${process.env.NEXT_PUBLIC_API_URL_IMAGE}${row.company.logo}`}
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <div className="flex flex-col items-start gap-1">
        <p className="truncate text-sm font-semibold w-[180px]">
          {row.company.companyName}
        </p>
        <p className="truncate text-xs font-medium text-gray-500 w-[200px]">
          MST: {row.company.taxCode}
        </p>
        <p className="truncate text-xs font-medium text-gray-500 w-[200px]">
          Website: {!!row.company.website ? row.company.website : "- -"}
        </p>
        <p className="truncate text-xs font-medium text-gray-500 w-[200px]">
          Năm sáng lập:{" "}
          {!!row.company.foundedYear ? row.company.foundedYear : "- -"}
        </p>
        <p className="truncate text-xs font-medium text-gray-500 w-[180px]">
          Email: {row.company.contactEmail}
        </p>
        <p className="truncate text-xs font-medium text-gray-500">
          SĐT: {row.company.contactPhone}
        </p>
        <p
          title={row.company.headQuarterAddress}
          className="truncate text-xs font-medium text-gray-500 w-[200px]"
        >
          Địa chỉ: {row.company.headQuarterAddress}
        </p>
        <p
          title={row.company.headQuarterAddress}
          className="truncate text-xs font-medium text-gray-500 w-[200px]"
        >
          Thành phố: {row.company.location.name}
        </p>
        {!row.businessVerified && (
          <Badge variant={"destructive"}>Chưa xác thực</Badge>
        )}
      </div>
    </div>
  );
};

export default CompanyColumn;
