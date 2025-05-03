import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { AppointmentDetail } from "@/types/Appointment";
import { Calendar, Clock } from "lucide-react";
type Props = {
  interviewData: AppointmentDetail;
};
const ScheduleInterview = ({ interviewData }: Props) => {
  return (
    <Card className="shadow-md border-0">
      <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-t-lg">
        <CardTitle className="text-xl font-bold">Lịch hẹn</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-indigo-50 rounded-lg p-4 flex flex-col items-center justify-center">
            <Calendar className="h-8 w-8 text-indigo-600 mb-2" />
            <p className="text-sm text-muted-foreground">Date</p>
            <p className="font-semibold text-lg">
              {formatDate(interviewData?.startTime)}
            </p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 flex flex-col items-center justify-center">
            <Clock className="h-8 w-8 text-purple-600 mb-2" />
            <p className="text-sm text-muted-foreground">Time</p>
            <p className="font-semibold text-lg">
              {new Date(interviewData?.startTime!).toLocaleTimeString("vi-VN", {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              -{" "}
              {new Date(interviewData?.endTime!).toLocaleTimeString("vi-VN", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-md font-semibold mb-2">Ghi chú</h3>
            <div className="bg-gray-50 p-3 rounded-md text-sm">
              {interviewData?.note}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScheduleInterview;
