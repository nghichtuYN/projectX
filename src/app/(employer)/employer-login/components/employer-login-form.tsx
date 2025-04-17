"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, Lock, Mail } from "lucide-react";
import GoogleLoginButton from "../../../../components/GoogleLoginButton";
import { useAuthStore } from "@/store/UserStore";
import { redirect, useRouter } from "next/navigation";
import FormFieldComponent from "../../../(auth)/(components)/FormFieldComponent";
import IsShowPasswordComponent from "@/app/(auth)/(components)/IsShowPasswordComponent";
import { toast } from "sonner";
import { useMutationHook } from "@/hooks/useMutationHook";
import { signIn } from "@/services/user";

const formSchema = z.object({
  email: z.string().email({
    message: "Vui lòng nhập một địa chỉ email hợp lệ.",
  }),
  password: z.string().min(8, {
    message: "Mật khẩu phải có ít nhất 8 ký tự.",
  }),
});

export function EmployerLoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [isShowPassword, setIsShowPasswod] = useState<boolean>(false);
  const loadUser = useAuthStore((state) => state.loadUser);
  const router = useRouter();
  const errors = form.formState.errors;
  const onSuccess = (data: any) => {
    toast.success("Đăng nhập thành công🚀");
    loadUser();
    setIsLoading(false);
    router.push("/employer/dashboard");
  };
  const onError = (error: any) => {
    toast.error("Đăng nhập thất bại🚀");
    const errorMessage = error.response?.data?.message || "Có lỗi xảy ra";
    if (error.response?.status === 400 || error.response?.status === 401) {
      if (errorMessage.toLowerCase().includes("email")) {
        form.setError("email", {
          type: "manual",
          message: "Tài khoản hoặc mật khẩu không đúng",
        });
      } else if (errorMessage.toLowerCase().includes("password")) {
        form.setError("password", {
          type: "manual",
          message: errorMessage || "Mật khẩu không đúng",
        });
      } else {
        // Nếu lỗi không cụ thể, gán vào cả hai trường hoặc hiển thị thông báo chung
        form.setError("email", { type: "manual", message: errorMessage });
        form.setError("password", { type: "manual", message: errorMessage });
      }
    } else {
      toast.error(errorMessage); // Lỗi khác (500, mạng, etc.)
    }
    setIsLoading(false);
  };
  const mutaionLogin = useMutationHook(
    (data: { email: string; password: string }) => signIn(data),
    (data: any) => onSuccess(data),
    onError
  );
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    mutaionLogin.mutate(values);
    setIsLoading(false);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-start">
          <CardTitle className="text-xl text-secondaryColor">
            Chào mừng bạn đã quay trở lại
          </CardTitle>
          <CardDescription>
            Cùng tạo dựng lợi thế cho doanh nghiệp bằng trải nghiệm công nghệ
            tuyển dụng
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className=" space-y-4 space-x-4">
                <GoogleLoginButton />
              </div>
              <div
                className={cn(
                  "relative text-center text-sm after:absolute after:inset-0 after:top-1/2",
                  " after:z-0 after:flex after:items-center after:border-t after:border-border"
                )}
              >
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Hoặc bằng email
                </span>
              </div>
              <div className="space-y-4">
                <FormFieldComponent
                  control={form.control}
                  name="email"
                  icon={Mail}
                  label=" Email đăng nhập"
                  requrie={true}
                >
                  {(field) => (
                    <Input
                      className={cn(
                        errors.email &&
                          "border-red-500 focus-visible:ring-red-500"
                      )}
                      placeholder="Nhập email"
                      {...field}
                    />
                  )}
                </FormFieldComponent>
                <FormFieldComponent
                  control={form.control}
                  name="password"
                  icon={Lock}
                  label="Mật khẩu"
                  requrie={true}
                >
                  {(field) => (
                    <div className="relative">
                      <Input
                        className={cn(
                          errors.password &&
                            "border-red-500 focus-visible:ring-red-500",
                          "relative"
                        )}
                        placeholder="Nhập mật khẩu"
                        type={isShowPassword ? "text" : "password"}
                        {...field}
                      />
                      <IsShowPasswordComponent
                        isShowPassword={isShowPassword}
                        setIsShowPasswod={setIsShowPasswod}
                      />
                    </div>
                  )}
                </FormFieldComponent>
                <Button
                  type="submit"
                  className="w-full font-semibold hover:bg-white hover:text-secondaryColor hover:outline-secondaryColor  text-white"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Đang đăng nhập...
                    </>
                  ) : (
                    "Đăng nhập"
                  )}
                </Button>
              </div>

              <div className="text-center text-sm">
                Chưa có tài khoản?{" "}
                <a
                  href="/employer-register"
                  className="text-secondaryColor hover:underline"
                >
                  Đăng ký ngay
                </a>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
