"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import { getDetailAppointment } from "@/queries/queries";
import {
  Briefcase,
  Calendar,
  Clock,
  Download,
  FileText,
  GraduationCap,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  User,
} from "lucide-react";
import ScheduleInterview from "./ScheduleInterview";
import JobCard from "./JobCard";
import InterviewCard from "./InterviewCard";
import Application from "./Application";
const getStatusInfo = (status: number) => {
  const statuses = [
    {
      label: "Pending",
      color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    },
    { label: "Rejected", color: "bg-red-100 text-red-800 border-red-200" },
    {
      label: "In Progress",
      color: "bg-blue-100 text-blue-800 border-blue-200",
    },
    {
      label: "Accepted",
      color: "bg-green-100 text-green-800 border-green-200",
    },
  ];
  return statuses[status] || statuses[0];
};
const AppointmentDetailClient = () => {
  const param = useParams();
  const router = useRouter();
  const id = param.id as string | undefined;
  if (!id) {
    return <div>ID không hợp lệ</div>;
  }
  const { data: interviewData } = getDetailAppointment(id);
  return (
    <div className="pt-14 pl-8 pr-8 w-full">
      <div className="container w-full mx-auto p-4 space-y-4 bg-accent">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-6">
            <Application interviewData={interviewData} />

            <InterviewCard interviewData={interviewData} />
          </div>

          <div className="md:col-span-2 space-y-6">
            <ScheduleInterview interviewData={interviewData} />

            <JobCard interviewData={interviewData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetailClient;
