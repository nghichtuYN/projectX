import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDateTime } from "@/lib/utils";
import { AppointmentDetail } from "@/types/Appointment";
import {
  Calendar,
  Download,
  Eye,
  FileText,
  Mail,
  MessageSquare,
  Phone,
} from "lucide-react";
import React from "react";
type Props = {
  interviewData: AppointmentDetail;
};
const Application = ({ interviewData }: Props) => {
  return (
    <Card className="shadow-md border-0">
      <CardHeader className="bg-gradient-to-r from-secondaryColor to-indigo-600 text-white rounded-t-lg pb-6">
        <div className="flex flex-col items-center text-center">
          <Avatar className="h-24 w-24 border-4 border-white mb-4">
            <AvatarImage
              src={`${process.env.NEXT_PUBLIC_API_URL_IMAGE}${interviewData?.participant?.profilePicture}`}
              alt={interviewData?.application?.fullName}
            />
            <AvatarFallback className="text-2xl">
              {interviewData?.application?.fullName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-xl font-bold">
            {interviewData?.application?.fullName}
          </CardTitle>
          <Badge className={`mt-2`}>Ứng viên</Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-secondaryColor" />
            <span className="text-sm">{interviewData?.application?.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-secondaryColor" />
            <span className="text-sm">
              {interviewData?.application?.phoneNumber}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-secondaryColor" />
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`${process.env.NEXT_PUBLIC_API_URL_IMAGE}${interviewData?.application?.resume?.path}`}
              className="text-sm text-secondaryColor hover:text-primaryColor flex items-center gap-1"
            >
              {interviewData?.application?.resume?.name}
              <Eye className="h-4 w-4" />
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-secondaryColor" />
            <div>
              <p className="text-xs text-muted-foreground">Ngày ứng tuyển</p>
              <p className="text-sm">
                {formatDateTime(interviewData?.application?.submitted)}
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        <div>
          <h3 className="text-md font-semibold mb-2 flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-secondaryColor" />
            Thư giới thiệu
          </h3>
          <p className="text-sm text-gray-600">
            {interviewData?.application?.introduction}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Application;
