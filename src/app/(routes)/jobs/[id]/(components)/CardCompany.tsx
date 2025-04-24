import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import company from "../../../../../../public/images/company.png";
import { Job, JobPublic } from "@/types/Jobs";
import { Box, MapPin, SquareArrowOutUpRight, Users } from "lucide-react";
import { listSizeCompany } from "@/data/SizeCompany";
import Link from "next/link";
type Props = {
  job: JobPublic;
};
const CardCompany = ({ job }: Props) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex gap-4">
          <div className="h-16 w-16 flex-shrink-0">
            <div className="relative h-full w-full overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={
                  job?.companyRecruiter?.id
                    ? `${process.env.NEXT_PUBLIC_API_URL_IMAGE}${job?.companyRecruiter?.logo}`
                    : company
                }
                alt="Company logo"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold hover:text-secondaryColor">
              {job?.companyRecruiter?.id
                ? job?.companyRecruiter?.companyName
                : job?.freelanceRecruiter?.fullName}
            </h3>
          </div>
        </CardTitle>
        <CardDescription className="flex flex-col gap-2 ">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-2 w-1/3">
              <Users className="h-4 w-4" />
              <p>Quy mô: </p>
            </span>
            <p className="w-2/3 text-black text-sm font-medium ">
              {
                listSizeCompany.find(
                  (size) =>
                    Number(size.value) === Number(job?.companyRecruiter?.size)
                )?.label
              }{" "}
              nhân viên
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-2 w-1/3">
              <Box className="h-4 w-4" />
              <p>Lĩnh vực:</p>
            </span>
            <p className="w-2/3 text-black flex items-center gap-2 text-sm font-medium ">
              {job?.companyRecruiter?.id
                ? job?.companyRecruiter?.majors?.map((major) => (
                    <span key={major.id}> {major.name}</span>
                  ))
                : "--"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-2 w-1/3">
              <MapPin className="h-4 w-4" />
              <p>Địa điểm:</p>
            </span>
            <p className="text-sm font-medium w-2/3 text-black overflow-hidden text-ellipsis line-clamp-2">
              {job?.companyRecruiter?.id
                ? job?.companyRecruiter?.headQuarterAddress
                : job?.officeAddress}
            </p>
          </div>
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-center">
        <Link
          className="flex items-center justify-center gap-2 text-secondaryColor font-semibold text-sm hover:underline"
          href={"/"}
        >
          Xem trang công ty <SquareArrowOutUpRight className="w-5 h-5" />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CardCompany;
