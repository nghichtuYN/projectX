"use client";

import { getApllicatinByID } from "@/queries/queries";
import { useParams } from "next/navigation";
import Application from "./Application";
import JobCard from "./JobCard";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const ApplicationDetail = () => {
  const param = useParams();
  const id = param.id as string | undefined;
  const [lineCamp, setLineCamp] = useState(false);

  if (!id) {
    return <div> ID không hợp lệ</div>;
  }
  const { data: application } = getApllicatinByID(id);
  return (
    <div className="w-full bg-accent flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-3 ">
        <div className="col-span-1">
          <Application application={application} />
        </div>
        <div className="col-span-2">
          <JobCard job={application?.job} />
          <div className="md:col-span-2 mt-3">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500  text-white p-4  rounded-t-lg text-xl font-bold">
              Mô tả việc làm
            </div>
            <div className="border border-gray-200 p-4 rounded-b-lg bg-white">
              <div
                className={cn(
                  "whitespace-pre-line text-gray-700",
                  !lineCamp && "line-clamp-[10]"
                )}
                dangerouslySetInnerHTML={{
                  __html: application?.job?.description,
                }}
              />
              <Button
                variant="link"
                className="text-secondaryColor p-0 mt-2 font-medium"
                onClick={() => setLineCamp(!lineCamp)}
              >
                {lineCamp ? (
                  <div className="flex items-center gap-2">
                    Thu gọn <ChevronUp className="h-4 w-4 ml-1" />
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    Xem thêm <ChevronDown className="h-4 w-4 ml-1" />
                  </div>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetail;
