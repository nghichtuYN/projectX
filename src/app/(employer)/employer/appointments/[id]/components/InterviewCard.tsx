import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppointmentDetail } from "@/types/Appointment";
import { User } from "lucide-react";
type Props = {
  interviewData: AppointmentDetail;
};
const InterviewCard = ({ interviewData }: Props) => {
  return (
    <Card className="shadow-md border-0">
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-semibold flex items-center gap-2">
          <User className="h-4 w-4 text-secondaryColor" />
          Phỏng vấn viên
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage
              src={`${process.env.NEXT_PUBLIC_API_URL_IMAGE}${interviewData?.participant?.profilePicture}`}
              alt={interviewData?.participant?.name}
            />
            <AvatarFallback>
              {interviewData?.participant?.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{interviewData?.participant?.name}</p>
            <p className="text-sm text-muted-foreground">HR Manager</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InterviewCard;
