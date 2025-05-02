'use client'
import { EmployerRegistrationForm } from "@/app/(employer)/employer-register/components/employer-registration-form";
import { useState } from "react";
import Image from "next/image";
import banner from "../../../../public/banner.png";
import RuleRegisterComponent from "@/app/(employer)/employer-register/components/RuleRegisterComponent";
import { cn } from "@/lib/utils";
import GoogleLoginButton from "@/components/GoogleLoginButton";
import DialogSelectRole from "./components/DialogSelectRole";

const EmployerRegisterPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const [roleName, setRoleName] = useState<string>("Business");

  const setRole = (role: string) => {
    setRoleName(role);
    setIsDialogOpen(false);
  };
  return (
    <div className="grid min-h-svh lg:grid-cols-3 overflow-hidden">
      <div className="flex flex-col w-full lg:col-span-2 overflow-y-auto h-svh">
        <div className="flex flex-col items-center justify-center w-full pt-2">
          <div className="w-2/3 flex flex-col gap-4">
            <p className="text-start text-3xl text-secondaryColor font-extrabold">
              Project X
            </p>
            <p className="text-secondaryColor font-semibold text-2xl">
              Đăng ký tài khoản Nhà tuyển dụng
            </p>
            <span className="text-sm">
              Cùng tạo dựng lợi thế cho doanh nghiệp bằng trải nghiệm công nghệ
              tuyển dụng.
            </span>
          </div>
          <RuleRegisterComponent />
          <div className="w-2/3 flex items-center  gap-4">
            <p className="text-secondaryColor font-semibold text-2xl pl-3 pt-3">
              Tài khoản:
            </p>
          </div>
          <div className="pt-2 ">
            <GoogleLoginButton roleName={roleName}  />
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center w-full ">
          <div className="w-2/3">
            <div
              className={cn(
                "relative text-center text-sm after:absolute after:inset-0 after:top-1/2",
                " after:z-0 after:flex after:items-center after:border-t after:border-border mt-4"
              )}
            >
              <span className="relative z-10 bg-background px-2 text-muted-foreground">
                Hoặc bằng email
              </span>
            </div>
            <EmployerRegistrationForm roleName={roleName} />
            <DialogSelectRole
              isDialogOpen={isDialogOpen}
              setIsDialogOpen={setIsDialogOpen}
              setRole={setRole}
            />
          </div>
        </div>
      </div>

      {/* Cột chứa ảnh không cuộn */}
      <div className="relative hidden bg-muted lg:block">
        <Image
          width={600}
          height={800}
          src={banner}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default EmployerRegisterPage;
