import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { educationLevels } from "@/data/educationLevels";
import { AppointmentDetail } from "@/types/Appointment";
import { Briefcase, GraduationCap, MapPin } from "lucide-react";
type Props = {
  interviewData: AppointmentDetail;
};
const JobCard = ({ interviewData }: Props) => {
  return (
    <Card className="shadow-md border-0">
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-semibold flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-secondaryColor" />
          Tin tuyển dụng
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-lg">
              {interviewData?.application?.job?.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {interviewData?.application?.job?.major?.name}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-secondaryColor" />
                <div>
                  <p className="text-xs text-muted-foreground">Địa điểm</p>
                  <p className="text-sm font-medium">
                    {interviewData?.application?.job?.location?.name}
                  </p>
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
                          edu.value ===
                          interviewData?.application?.job?.educationLevelRequire.toString()
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
                  {interviewData?.application?.job?.contractTypes
                    .map((t) => t.name)
                    .join(", ")}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Loại hình</p>
                <p className="text-sm font-medium">
                  {interviewData?.application?.job?.jobTypes
                    .map((t) => t.name)
                    .join(", ")}
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs text-muted-foreground mb-2">
              Kỹ năng yêu cầu
            </p>
            <div className="flex flex-wrap gap-2">
              {interviewData?.application?.job?.skills.map((skill) => (
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
