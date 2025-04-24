import { AppliedJob } from "@/types/Apllication";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { BookmarkX, Clock } from "lucide-react";
import Link from "next/link";
import { getTimeSince } from "@/lib/utils";
type Props = {
  appliedJob: AppliedJob;
};
const JobApplied = ({ appliedJob }: Props) => {
  function formatDateTime(isoString: string) {
    // Parse the ISO string into a Date object
    const date = new Date(isoString);

    // Adjust for UTC+7 by adding 7 hours (7 * 60 * 60 * 1000 milliseconds)
    date.setTime(date.getTime() + 7 * 60 * 60 * 1000);

    // Extract day, month, year, hours, and minutes
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getUTCFullYear();
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");

    // Format as DD/MM/YYYY - HH:mm
    return `${day}/${month}/${year} - ${hours}:${minutes}`;
  }
  return (
    <Card className="mb-4 border-l-4 border-l-secondaryColor hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row gap-4 p-4">
          <div className="flex-shrink-0">
            <div className="w-24 h-24 border rounded-md overflow-hidden flex items-center justify-center bg-white p-2">
              <Image
                src={
                  appliedJob?.job?.companyRecruiter.id
                    ? `${process.env.NEXT_PUBLIC_API_URL_IMAGE}${appliedJob?.job?.companyRecruiter?.logo}`
                    : `${process.env.NEXT_PUBLIC_API_URL_IMAGE}${appliedJob?.job?.freelanceRecruiter?.profilePicture}`
                }
                alt="Company logo"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
          </div>
          <div className="flex-grow space-y-2">
            <h3 className="text-[16px] font-semibold text-gray-800">
              {appliedJob?.job?.title}
            </h3>
            <div className="text-emerald-600 text-sm font-semibold">
              {
                <div className="">
                  {appliedJob?.job?.minSalary && appliedJob?.job?.maxSalary ? (
                    `${appliedJob?.job?.minSalary} - ${appliedJob?.job?.maxSalary}`
                  ) : (
                    <div className="text-xs">Thỏa thuận</div>
                  )}
                </div>
              }
            </div>
            <div className="text-gray-600 text-sm font-normal">
              {appliedJob?.job?.companyRecruiter?.id
                ? appliedJob?.job.companyRecruiter?.companyName
                : appliedJob?.job?.freelanceRecruiter?.fullName}
            </div>
            <div className="text-gray-500 text-sm font-normal">
              Đã ứng tuyển: {formatDateTime(appliedJob?.applied)}
            </div>
            <div className="flex justify-between items-center  pt-2 border-t">
              <div className="flex items-center gap-3  ">
                <Badge variant="outline" className="bg-gray-100 text-xs">
                  {appliedJob?.job?.location?.name}
                </Badge>
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="w-3 h-3 mr-1 text-xs" />
                  Cập nhật {getTimeSince(appliedJob?.modified)}
                </div>
              </div>
              {/* <div className="flex gap-2">
                <Link href={`/jobs/${job?.id}`}>
                  <Button className="font-semibold  leading-6 text-sm">
                    Ứng tuyển
                  </Button>
                </Link>
                <Button
                  onClick={() => handleSaveJob(job?.id)}
                  variant="outline"
                  className="border-red-500"
                >
                  <div className="flex items-center gap-3 text-red-500">
                    <BookmarkX className="w-5 h-5 font-bold" />
                    <p>Bỏ lưu</p>
                  </div>
                </Button>
              </div> */}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobApplied;
