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
import { Lock, Mail } from "lucide-react";
import GoogleLoginButton from "./GoogleLoginButton";
import { useAuthStore } from "@/store/UserStore";
import { redirect } from "next/navigation";
import FormFieldComponent from "./FormFieldComponent";
import IsShowPasswordComponent from "./IsShowPasswordComponent";

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
  const setUser = useAuthStore((state) => state.setUser);

  const errors = form.formState.errors;
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // Simulate API call
    setUser({ name: "test", email: "test", id: "2" });
    redirect("/");
    setTimeout(() => {
      console.log(values);
      setIsLoading(false);
    }, 2000);
  }

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
                  {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
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
