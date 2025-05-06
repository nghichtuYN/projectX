'use client'
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { educationLevels } from "@/data/educationLevels";
import { JobPublic } from "@/types/Jobs";
import { GraduationCap, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
type Props = {
  job: JobPublic;
};
const JobCard = ({ job }: Props) => {
  console.log(`${process.env.NEXT_PUBLIC_API_URL_IMAGE}${job?.companyRecruiter?.logo}`)
  return (
    <Card className="shadow-md border-0">
      <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-t-lg">
        <CardTitle className="text-xl font-bold">Việc làm</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-2">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <div className="w-24 h-24 relative border rounded-md overflow-hidden flex items-center justify-center bg-white p-2">
                <Image
                   src={
                    // job?.companyRecruiter?.id
                       `${process.env.NEXT_PUBLIC_API_URL_IMAGE}/${job?.companyRecruiter?.logo}`
                      // : company
                  }
                  alt="Company logo"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex-grow space-y-2">
              <Link
                href={`/jobs/${job?.id}`}
                className="text-[16px] font-semibold text-gray-800"
              >
                {job?.title}
              </Link>
              <div className="text-emerald-600 text-sm font-semibold">
                {
                  <div className="">
                    {job?.minSalary && job?.maxSalary ? (
                      `${job?.minSalary} - ${job?.maxSalary}`
                    ) : (
                      <div className="text-xs">Thỏa thuận</div>
                    )}
                  </div>
                }
              </div>
              <div className="text-gray-600 text-sm font-normal">
                {job?.companyRecruiter?.id
                  ? job.companyRecruiter?.companyName
                  : job?.freelanceRecruiter?.fullName}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-secondaryColor" />
                <div>
                  <p className="text-xs text-muted-foreground">Địa điểm</p>
                  <p className="text-sm font-medium">{job?.location?.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <GraduationCap className="h-5 w-5 text-secondaryColor" />
                <div>
                  <p className="text-xs text-muted-foreground">Học vấn</p>
                  <p className="text-sm font-medium">
                    {
                      educationLevels?.find(
                        (edu) =>
                          edu.value === job?.educationLevelRequire.toString()
                      )?.name
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">Hình thức</p>
                <p className="text-sm font-medium">
                  {job?.contractTypes.map((t) => t.name).join(", ")}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Loại hình</p>
                <p className="text-sm font-medium">
                  {job?.jobTypes.map((t) => t.name).join(", ")}
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs text-muted-foreground mb-2">
              Kỹ năng yêu cầu
            </p>
            <div className="flex flex-wrap gap-2">
              {job?.skills.map((skill) => (
                <Badge
                  key={skill.id}
                  variant="outline"
                  className="bg-purple-50 text-primaryColor hover:bg-purple-100 border-purple-200"
                >
                  {skill.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;
