import { formatDate, formatDateForInput } from "@/lib/utils";
import { Appointment } from "@/types/Apllication";
import { Minus } from "lucide-react";
type Props = {
  row: Appointment;
};
const AppointmentColumn = ({ row }: Props) => {
  const formattedStartTime = new Date(row?.startTime!).toLocaleTimeString(
    "vi-VN",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );
  const formattedEndTime = new Date(row?.endTime!).toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div className="flex justify-center items-center gap-4">
      <div className="flex justify-center">
        <div className="flex flex-col">
          <p> Ngày: {formatDateForInput(new Date(row?.startTime))}</p>
          <p className="flex items-center gap-2">
            Bắt đầu:
            {formattedStartTime}
          </p>
          <p>
            Kết thúc:
            {formattedEndTime}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AppointmentColumn;
