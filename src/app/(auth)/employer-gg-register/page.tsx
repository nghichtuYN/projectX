import Image from "next/image";
import banner from "../../../../public/banner.png";
import React from "react";
import { EmployerGoogleRegistrationForm } from "@/components/employer-gg-registration-form";

const EmployerGoogleRegisterPage = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-3 overflow-hidden">
      <div className="flex flex-col w-full lg:col-span-2 overflow-y-auto h-svh">
        <div className="flex flex-col items-center justify-center w-full pt-2">
          <div className="w-2/3 flex flex-col gap-4">
            <p className="text-start text-3xl text-secondaryColor font-extrabold">
              Project X
            </p>
            <span className="text-sm">
              Vui lòng điền các thông tin nhà tuyển dụng bên dưới để chúng tôi
              hỗ trợ bạn tốt hơn:
            </span>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center w-full ">
          <div className="w-2/3">
            <div className="flex w-full items-center "></div>

            <EmployerGoogleRegistrationForm className="mt-5" />
          </div>
        </div>
      </div>

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

export default EmployerGoogleRegisterPage;
