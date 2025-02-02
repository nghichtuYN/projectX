import { RegistrationForm } from "@/components/registration-form";
import Image from "next/image";
import React from "react";
import banner from "../../../../public/banner.png";

const RegisterPage = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-3">
      <div className="flex flex-col lg:col-span-2 h-svh">
        <div className="flex-1 flex items-center justify-center w-full overflow-y-auto p-6 md:p-10">
          <div className="w-full min-w-xs max-w-md">
            <RegistrationForm className="mt-20" />
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

export default RegisterPage;
