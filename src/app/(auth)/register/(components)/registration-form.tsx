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
import { Lock, Mail, User } from "lucide-react";
import React from "react";
import GoogleLoginButton from "../../../../components/GoogleLoginButton";
import FormFieldComponent from "../../(components)/FormFieldComponent";
import IsShowPasswordComponent from "../../(components)/IsShowPasswordComponent";

const formSchema = z
  .object({
    name: z.string().min(2, {
      message: "Tên phải có ít nhất 2 ký tự.",
    }),
    email: z.string().email({
      message: "Vui lòng nhập một địa chỉ email hợp lệ.",
    }),
    password: z.string().min(8, {
      message: "Mật khẩu phải có ít nhất 8 ký tự.",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp.",
    path: ["confirmPassword"],
  });

export function RegistrationForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShowPassword, setIsShowPasswod] = useState<boolean>(false);
  const [isShowConfirmPassword, setIsShowConfirmPasswod] =
    useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const errors = form.formState.errors;

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log(values);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-start">
          <CardTitle className="text-xl text-secondaryColor">
            Chào mừng bạn đến với Project X
          </CardTitle>
          <CardDescription>
            Tạo tài khoản để trải nghiệm công nghệ tuyển dụng tiên tiến
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormFieldComponent
                  control={form.control}
                  name="name"
                  icon={User}
                  label="Họ và tên"
                  requrie={true}
                >
                  {(field) => (
                    <Input
                      className={cn(
                        errors.name &&
                          "border-red-500 focus-visible:ring-red-500"
                      )}
                      placeholder="Nhập họ tên"
                      {...field}
                    />
                  )}
                </FormFieldComponent>
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
                <FormFieldComponent
                  control={form.control}
                  name="confirmPassword"
                  icon={Lock}
                  label="Xác nhận mật khẩu"
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
                        placeholder="Nhập lại mật khẩu"
                        type={isShowConfirmPassword ? "text" : "password"}
                        {...field}
                      />
                      <IsShowPasswordComponent
                        isShowPassword={isShowConfirmPassword}
                        setIsShowPasswod={setIsShowConfirmPasswod}
                      />
                    </div>
                  )}
                </FormFieldComponent>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Đang đăng ký..." : "Đăng ký"}
                </Button>
              </div>
              <div
                className={cn(
                  "relative text-center text-sm after:absolute after:inset-0 after:top-1/2",
                  " after:z-0 after:flex after:items-center after:border-t after:border-border"
                )}
              >
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Hoặc đăng nhập bằng
                </span>
              </div>
              <div className="ml- space-y-4 pl-90">
                <GoogleLoginButton />
              </div>

              <div className="text-center text-sm">
                Đã có tài khoản?{" "}
                <a
                  href="/login"
                  className="text-secondaryColor hover:underline"
                >
                  Đăng nhập ngay
                </a>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        Bằng cách đăng ký, bạn đồng ý với <a href="#">Điều khoản dịch vụ</a> và{" "}
        <a href="#">Chính sách bảo mật</a> của chúng tôi.
      </div>
    </div>
  );
}
