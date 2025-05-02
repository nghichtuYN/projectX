import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { BriefcaseBusiness } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
type CompanyCardProps = {
  companyName?: string;
  category?: string;
  jobCount?: number;
  logoUrl?: string;
};

const CompanyCardComponent = ({
  companyName = "CÔNG TY CỔ PHẦN A Z Baaaaaaaaaaaaaaaa aa aaaaaaaaaaaaaaaaaaaaaaaaaa",
  category = "Xây dựng",
  jobCount = 4,
  logoUrl = "https://github.com/shadcn.png",
}: CompanyCardProps) => {
  return (
    <Card className="hover:shadow-md w-full transition-shadow border border-[#FFA07A]/20 ">
      <CardContent className="pt-2">
        <div className="flex items-center gap-4">
          <div className="relative  xl:w-14 h-14 shrink-0 p-1">
            <Image
              src={"https://github.com/shadcn.png"}
              alt={companyName}
              fill
              className="rounded-sm object-contain"
            />
          </div>
          <div className=" w-full">
            <Link
              href={`/company/${companyName.toLowerCase()}`}
              className="font-medium text-sm max-w-[200px] text-gray-900 truncate line-clamp-1"
            >
              {companyName}
            </Link>
            <p className="text-sm text-gray-600 mt-0.5 max-w-[180px]">
              {category}
            </p>
            <Separator />
            <p className="text-sm text-gray-500 mt-2 flex items-center gap-1 max-w-[180px]">
              <BriefcaseBusiness className="w-4 h-4" />
              {jobCount} việc làm
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyCardComponent;
