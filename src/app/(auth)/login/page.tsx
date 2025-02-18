import { LoginForm } from "@/app/(auth)/login/(components)/login-form";
import Image from "next/image";
import banner from "../../../../public/banner.png";
export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-3">
      <div className="flex flex-col lg:col-span-2 gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center w-full">
          <div className="w-full min-w-xs max-w-md">
            <LoginForm />
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
}
