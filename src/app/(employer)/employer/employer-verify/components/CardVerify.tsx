"use client";
import { CheckCircle2, Loader2, MoveRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useAuthStore } from "@/store/UserStore";

const CardVerify = () => {
  const user = useAuthStore((state) => state.user);
  if (!user) return <Loader2 className="animate-spin w-5 h-5" />;
  const getValue = () => {
    if (user?.emailConfirmed && user?.recruiterVerified) return 100;
    if (user?.emailConfirmed && !user?.recruiterVerified) return 50;
    if (!user?.emailConfirmed && user?.recruiterVerified) return 50;
    return 0;
  };
  console.log(user?.emailConfirmed && user?.recruiterVerified);
  return (
    <Card className="w-full mx-auto bg-white h-full p-6 border">
      <div className="mb-10">
        <h1 className="text-2xl font-bold mb-4">
          Xin chào, <span className="text-secondaryColor">Hoàng Đặng</span>
        </h1>
        <p className="text-gray-700 mb-2">
          Vui lòng thực hiện các bước xác thực dưới đây để bắt đầu đăng tin và
          nhận hồ sơ ứng tuyển cho tin tuyển dụng của bạn.
          <span className="text-secondaryColor font-medium">Tìm hiểu thêm</span>
        </p>
      </div>

      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <h2 className="text-xl font-bold">Xác thực thông tin</h2>
          <div className="flex items-center">
            <span className="text-gray-500">Hoàn thành</span>
            <span className="text-secondaryColor font-bold ml-1">
              {getValue()}%
            </span>
          </div>
        </div>
        <Progress value={getValue()} className="h-2 bg-gray-200" />
      </div>

      <div className="flex flex-col gap-4">
        {/* Completed verification steps */}
        <div className="flex items-center justify-between group hover:bg-gray-200 border-b rounded-md p-2 ">
          <div className="flex items-center gap-3">
            {user?.recruiterVerified && user?.verificationSubmitted ? (
              <CheckCircle2 className="h-6 w-6 text-secondaryColor fill-sectext-secondaryColor" />
            ) : (
              <div className="h-6 w-6 rounded-full border-2 border-gray-300" />
            )}
            <span
              className={cn(
                user?.recruiterVerified && user?.verificationSubmitted
                  ? "text-gray-400"
                  : "text-gray-700"
              )}
            >
              Cập nhật thông tin công ty
            </span>
          </div>
          <div className="p-1 rounded-full bg-white group-hover:bg-secondaryColor cursor-pointer">
            <Link href={"/employer/settings/company"}>
              <MoveRight className="h-5 w-5 text-secondaryColor group-hover:text-white" />
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-between group hover:bg-gray-200 border-b rounded-md p-2 ">
          <div className="flex items-center gap-3">
            {user?.emailConfirmed ? (
              <CheckCircle2 className="h-6 w-6 text-secondaryColor fill-sectext-secondaryColor" />
            ) : (
              <div className="h-6 w-6 rounded-full border-2 border-gray-300" />
            )}
            <span
              className={cn(
                user?.emailConfirmed ? "text-gray-400" : "text-gray-700"
              )}
            >
              Xác thực email
            </span>
          </div>
          <div className="p-1 rounded-full bg-white group-hover:bg-secondaryColor cursor-pointer">
            <Link href={"/employer/employer-verify/verify-email"}>
              <MoveRight className="h-5 w-5 text-secondaryColor group-hover:text-white" />
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link href={"/employer/dashboard"} className="text-gray-500">
          Tôi sẽ xác thực sau
        </Link>
      </div>
    </Card>
  );
};

export default CardVerify;
