"use client";
import { Suspense } from "react";
import ListJobsSaved from "./ListJobsSaved";
const CardSavedJos = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 ">
      {/* Header with gradient background */}
      <div className="rounded-t-lg overflow-hidden mb-4">
        <div className="bg-gradient-to-r from-primaryColor to-secondaryColor p-6 relative">
          <div className="absolute right-0 top-0 w-full h-full">
            <div className="absolute right-0 top-0 w-1/2 h-full opacity-20"></div>
          </div>
          <div className="relative z-10">
            <h1 className="text-white text-2xl font-bold mb-2">
              Việc làm đã lưu
            </h1>
            <p className="text-[15px] text-white max-w-xl">
              Xem lại danh sách những việc làm mà bạn đã lưu trước đó. Ứng tuyển
              ngay để không bỏ lỡ cơ hội nghề nghiệp dành cho bạn.
            </p>
          </div>
        </div>
      </div>
      <Suspense>
        <ListJobsSaved />
      </Suspense>
    </div>
  );
};

export default CardSavedJos;
