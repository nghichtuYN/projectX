"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BriefcaseBusiness,
  CheckCircle2,
  Clock,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { useMutationHook } from "@/hooks/useMutationHook";
import { confirmEmail } from "@/services/user";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const VerifyAccountClient = () => {
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(300);
  const [canResend, setCanResend] = useState(false);
  const searchParams = useSearchParams();
  const key = searchParams.get("key");
  const router=useRouter()
  useEffect(() => {
    if (timeLeft > 0 && !canResend) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !canResend) {
      setCanResend(true);
    }
  }, [timeLeft, canResend]);

  const handleResendOTP = () => {
    setTimeLeft(300);
    setCanResend(false);
    alert("Mã OTP mới đã được gửi!");
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };
  const mutation = useMutationHook(
    (data: { otp: string }) => confirmEmail(data),
    (data) => {
      setIsSubmitting(false);
      setIsVerified(true);
      setError("");
    },
    (error) => {
      setError("Mã xác thực không chính xác");
      setIsSubmitting(false);
    }
  );
  const handleMoveToNextStep = () => {
    if(key?.includes("employer")){
      router.push("/employer/dashboard");
    }else{
      router.push("/");
    }
  };
  const handleSubmit = async () => {
    if (otp.length !== 6) {
      setError("Vui lòng nhập đủ 6 chữ số OTP");
      return;
    }
    setIsSubmitting(true);
    setError("");
    mutation.mutate({ otp });
  };
  if (isVerified) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
        <div>
          <Card className="w-full max-w-md overflow-hidden border-none shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/20 z-0"></div>
            <div className="relative z-10">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-500 shadow-md">
                  <CheckCircle2 className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-green-700">
                  Xác thực thành công!
                </CardTitle>
                <CardDescription className="text-base mt-2">
                  Tài khoản của bạn đã được xác thực. Bạn có thể tiếp tục sử
                  dụng dịch vụ của ProjectX.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center pb-2">
                <p className="text-sm text-muted-foreground">
                  Bạn sẽ được chuyển hướng đến trang chủ sau vài giây...
                </p>
              </CardContent>
              <CardFooter className="flex justify-center pb-8">
                <Button
                  className="w-3/4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  onClick={() => handleMoveToNextStep()}
                >
                  Tiếp tục
                </Button>
              </CardFooter>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div>
        <Card className="w-full max-w-md overflow-hidden border-none shadow-xl">
          <div className="relative z-10">
            <CardHeader className="text-center pb-2">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-secondaryColor to-primaryColor"></div>
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primaryColor to-secondaryColor shadow-md">
                <BriefcaseBusiness className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-secondaryColor to-thirdColor text-transparent bg-clip-text">
                ProjectX
              </CardTitle>
              <CardDescription className="text-base mt-2">
                Vui lòng nhập mã OTP 6 chữ số đã được gửi đến số điện thoại của
                bạn
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pb-2">
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(value) => {
                    setOtp(value);
                    setError("");
                  }}
                  className="gap-2"
                >
                  <InputOTPGroup>
                    {Array.from({ length: 6 }).map((_, index) => (
                      <InputOTPSlot
                        key={index}
                        index={index}
                        className="rounded-xl border-2 border-blue-200 focus:border-blue-500 shadow-sm w-12 h-14 text-lg transition-all duration-200"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>

              {error && (
                <p className="text-center text-sm font-medium text-red-500 bg-red-50 py-2 px-3 rounded-lg">
                  {error}
                </p>
              )}

              <div className="flex items-center justify-center space-x-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {canResend
                    ? "Mã OTP đã hết hạn"
                    : `Mã OTP hết hạn sau ${formatTime(timeLeft)}`}
                </span>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center space-x-1 text-sm bg-blue-50 py-2 px-4 rounded-full">
                  <span className="text-muted-foreground">
                    Không nhận được mã?
                  </span>
                  <button
                    className={`flex items-center space-x-1 font-medium ${
                      canResend
                        ? "text-blue-600 hover:text-blue-700"
                        : "text-gray-400 cursor-not-allowed"
                    }`}
                    onClick={canResend ? handleResendOTP : undefined}
                    disabled={!canResend}
                  >
                    <RefreshCw
                      className={`h-3 w-3 ${
                        canResend ? "text-blue-600" : "text-gray-400"
                      }`}
                    />
                    <span>Gửi lại mã</span>
                  </button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center pb-8 pt-4">
              <Button
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                onClick={handleSubmit}
                disabled={otp.length !== 6 || isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="mr-2 h-5 w-5 animate-spin text-white" />
                    <span>Đang xác thực...</span>
                  </div>
                ) : (
                  "Xác thực"
                )}
              </Button>
            </CardFooter>
          </div>
        </Card>

        <div className="mt-4 text-center text-xs text-gray-500">
          <p>© 2025 ProjectX - Nền tảng tuyển dụng hàng đầu</p>
        </div>
      </div>
    </div>
  );
};

export default VerifyAccountClient;
