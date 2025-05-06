"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDateTime } from "@/lib/utils";
import { useAuthStore } from "@/store/UserStore";
import { AppliedJob } from "@/types/Apllication";
import {
  Calendar,
  Eye,
  FileText,
  Mail,
  MessageSquare,
  Phone,
} from "lucide-react";
import React from "react";
type Props = {
  application: AppliedJob;
};
const Application = ({ application }: Props) => {
  const user = useAuthStore((state) => state.user);
  return (
    <Card className="shadow-md border-0">
      <CardHeader className="bg-gradient-to-r from-secondaryColor to-indigo-600 text-white rounded-t-lg pb-6">
        <div className="flex flex-col items-center text-center">
          <Avatar className="h-24 w-24 border-4 border-white mb-4">
            <AvatarImage
              src={
                user?.profilePicture.includes("http")
                  ? user?.profilePicture
                  : `${process.env.NEXT_PUBLIC_API_URL_IMAGE}${user?.profilePicture}`
              }
              alt={application?.fullName}
            />
            <AvatarFallback className="text-2xl">
              {application?.fullName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-xl font-bold">
            {application?.fullName}
          </CardTitle>
          <Badge className={`mt-2`}>Ứng viên</Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-secondaryColor" />
            <span className="text-sm">{application?.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-secondaryColor" />
            <span className="text-sm">{application?.phoneNumber}</span>
          </div>
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-secondaryColor" />
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`${process.env.NEXT_PUBLIC_API_URL_IMAGE}${application?.resume?.path}`}
              className="text-sm text-secondaryColor hover:text-primaryColor flex items-center gap-1"
            >
              {application?.resume?.name}
              <Eye className="h-4 w-4" />
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-secondaryColor" />
            <div>
              <p className="text-xs text-muted-foreground">Ngày ứng tuyển</p>
              <p className="text-sm">
                {formatDateTime(application?.submitted)}
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
          <p className="text-sm text-gray-600">{application?.introduction}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Application;
