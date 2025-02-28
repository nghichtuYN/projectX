import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

type Job = {
  companyImage: string;
  posistion: string;
  jobSalary: string;
  jD: string;
};

const JobCardComponent = ({ companyImage, posistion, jobSalary, jD }: Job) => {
  return (
    <Card className="group hover:bg-accent mb-3 border-none">
      <Link href="/" className="flex items-center p-3">
        <div className="shrink-0 mr-4">
          <Image
            src={
              "https://www.incnow.com/wp-content/uploads/2023/08/Shutterstock_1059255266-scaled.jpg"
            }
            alt={`logo`}
            width={64}
            height={64}
            className="rounded-lg object-contain"
          />
        </div>
        <CardHeader className="flex-1 min-w-0 p-0">
          <CardTitle className="font-semibold text-gray-900 truncate">
            {posistion}
          </CardTitle>
          <CardDescription className="text-sm text-gray-500 truncate">
            {jD}
          </CardDescription>
          <p className="text-sm font-medium text-emerald-600 mt-1">
            {jobSalary}
          </p>
        </CardHeader>
        <div className="shrink-0 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
        </div>
      </Link>
    </Card>
  );
};

export default JobCardComponent;
