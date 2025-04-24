import { JobPublic } from "@/types/Jobs";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BriefcaseBusiness, GraduationCap, Shield, User, Users } from "lucide-react";
import { educationLevels } from "@/data/educationLevels";
type Props = {
  job: JobPublic;
};
const CardInfo = ({ job }: Props) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex gap-4">Thông tin chung</CardTitle>
        <CardDescription className="flex flex-col items-start gap-4 pt-2">
          <span className="flex  items-center gap-2">
            <div className="rounded-3xl bg-secondaryColor p-2">
              <Shield className="w-6 h-6 text-white " />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-md text-black">Cấp bậc</p>
              <div className="font-semibold text-black flex items-center gap-2">
                {job?.jobLevels?.map((jobLevel, index) => (
                  <div key={jobLevel.id}>
                    {jobLevel?.name}
                    {index < job?.jobLevels.length - 1 ? ", " : ""}
                  </div>
                ))}
              </div>
            </div>
          </span>
          <span className="flex items-center gap-2">
            <div className="rounded-3xl bg-secondaryColor p-2">
              <GraduationCap className="w-6 h-6 text-white " />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-md text-black">Học vấn</p>
              <span className="font-semibold text-black">
                {
                  educationLevels.find(
                    (_, index) => index === job?.yearOfExperience
                  )?.name
                }
              </span>
            </div>
          </span>
          <span className="flex items-center gap-2">
            <div className="rounded-3xl bg-secondaryColor p-2">
              <Users className="w-6 h-6 text-white " />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-md text-black">Số lượng tuyển</p>
              <span className="font-semibold text-black">
                {job?.quantity} người
              </span>
            </div>
          </span>
          <span className="flex items-center gap-2">
            <div className="rounded-3xl bg-secondaryColor p-2">
              <BriefcaseBusiness className="w-6 h-6 text-white " />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-md text-black">Hình thức làm việc</p>
              <span className="font-semibold text-black flex items-center gap-2">
                {job?.contractTypes?.map((contractType, index) => (
                  <div key={contractType.id}>
                    {contractType.name}{" "}
                    {index < job?.contractTypes.length - 1 ? ", " : ""}
                  </div>
                ))}
              </span>
            </div>
          </span>
          <span className="flex items-center gap-2">
            <div className="rounded-3xl bg-secondaryColor p-2">
              <User className="w-6 h-6 text-white " />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-md text-black">Giới tính</p>
              <span className="font-semibold text-black">Nữ</span>
            </div>
          </span>
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default CardInfo;
