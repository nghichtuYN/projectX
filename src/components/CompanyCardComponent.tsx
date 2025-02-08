import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { BriefcaseBusiness } from "lucide-react";
type CompanyCardProps = {
  companyName?: string;
  category?: string;
  jobCount?: number;
  logoUrl?: string;
};

const CompanyCardComponent = ({
  companyName = "CÔNG TY CỔ PHẦN A Z B",
  category = "Xây dựng",
  jobCount = 4,
  logoUrl = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-De0UhCVVNeIi5gXTQOv9nt3eSXF11K.png",
}: CompanyCardProps) => {
  return (
    <Card className="hover:shadow-md w-3/4  transition-shadow border border-[#FFA07A]/20">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            <Image
              src={logoUrl || "/placeholder.svg"}
              alt={companyName}
              width={48}
              height={48}
              className="rounded-sm object-contain"
            />
          </div>
          <div className="min-w-0">
            <h3 className="font-medium text-base text-gray-900 truncate">
              {companyName}
            </h3>
            <p className="text-sm text-gray-600 mt-0.5">{category}</p>
            <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
              <BriefcaseBusiness />
              {jobCount} việc làm
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyCardComponent;
