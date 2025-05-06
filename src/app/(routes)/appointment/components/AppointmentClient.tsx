import AppointmentClient from "@/app/(employer)/employer/appointments/components/AppointmentClient";
import React from "react";

const AppointmentClientCandidate = () => {
  return (
    <div className="mt-3 flex justify-center">
      <div className="w-3/4 flex flex-col items-center">
        <div className="rounded-t-lg overflow-hidden mb-4 w-full">
          <div className="bg-gradient-to-r from-primaryColor to-secondaryColor p-6 relative">
            <div className="absolute right-0 top-0 w-full h-full">
              <div className="absolute right-0 top-0 w-1/2 h-full opacity-20"></div>
            </div>
            <div className="relative z-10">
              <h1 className="text-white text-2xl font-bold mb-2">
                Danh sách lịch hẹn
              </h1>
              <p className="text-[15px] text-white max-w-xl">
                Xem lại danh sách những lịch hẹn mà nhà tuyển dụng đã hẹn bạn
                phỏng vấn. Theo dõi lịch hẹn ngay để không bỏ lỡ cơ hội nghề
                nghiệp dành cho bạn.
              </p>
            </div>
          </div>
        </div>
        <AppointmentClient />
      </div>
    </div>
  );
};

export default AppointmentClientCandidate;
