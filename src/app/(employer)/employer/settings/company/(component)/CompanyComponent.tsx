import { Card, CardContent } from "@/components/ui/card";
import { Company } from "@/data/companyExample";
import { BriefcaseBusiness } from "lucide-react";
import Image from "next/image";
import React from "react";
type Props = {
  company: Company;
};
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const CompanyComponent = ({ company }: Props) => {
  return (
    <Card className="hover:shadow-md w-full  transition-shadow border border-[#FFA07A]/20">
      <CardContent className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-1">
            <p className="font-bold text-sm leading-6 truncate">
              {company.companyName}
            </p>
            <p className="text-xs text-gray-600 mt-0.5">
              MST: {company.taxCode}
            </p>
            <p className="text-xs text-gray-600 mt-0.5 truncate line-clamp-1 w-[300px]">
              {company.headQuarterAddress}
            </p>
            <div className="p-1 bg-accent rounded-sm w-fit">
              <p className="text-sm leading-5">{company.major.name}</p>
            </div>
          </div>
        </div>
        <Badge className="cursor-pointer">Chọn</Badge>
      </CardContent>
    </Card>
  );
};

export default CompanyComponent;
