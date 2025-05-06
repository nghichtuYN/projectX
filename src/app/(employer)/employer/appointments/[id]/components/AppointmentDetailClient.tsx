"use client";

import { useParams, useRouter } from "next/navigation";
import { getDetailAppointment } from "@/queries/queries";

import ScheduleInterview from "./ScheduleInterview";
import JobCard from "./JobCard";
import InterviewCard from "./InterviewCard";
import Application from "./Application";
const AppointmentDetailClient = () => {
  const param = useParams();
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

            <JobCard job={interviewData?.application?.job} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetailClient;
