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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import React from "react";
import GoogleLoginButton from "./GoogleLoginButton";

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

const CustomInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  const { error } = useFormField();
  return (
    <Input
      {...props}
      ref={ref}
      className={cn(
        props.className,
        error && "border-red-500 focus-visible:ring-red-500"
      )}
    />
  );
});
CustomInput.displayName = "CustomInput";

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
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <User size={18} className="text-secondaryColor" />
                        Họ và tên
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={cn(
                            errors.name &&
                              "border-red-500 focus-visible:ring-red-500"
                          )}
                          placeholder="Nhập họ tên"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Mail size={18} className="text-secondaryColor" />
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={cn(
                            errors.email &&
                              "border-red-500 focus-visible:ring-red-500"
                          )}
                          placeholder="Nhập email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Lock size={18} className="text-secondaryColor" />
                        Mật khẩu
                      </FormLabel>
                      <FormControl>
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
                          {!isShowPassword ? (
                            <EyeOff
                              size={18}
                              className="absolute text-secondaryColor top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                              onClick={() => setIsShowPasswod(true)}
                            />
                          ) : (
                            <Eye
                              onClick={() => setIsShowPasswod(false)}
                              size={18}
                              className="absolute text-secondaryColor top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                            />
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Lock size={18} className="text-secondaryColor" />
                        Xác nhận mật khẩu
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            className={cn(
                              errors.password &&
                                "border-red-500 focus-visible:ring-red-500",
                              "relative"
                            )}
                            type={isShowConfirmPassword ? "text" : "password"}
                            {...field}
                            placeholder="Nhập lại mật khẩu"
                          />
                          {!isShowConfirmPassword ? (
                            <EyeOff
                              size={18}
                              className="absolute text-secondaryColor top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                              onClick={() => setIsShowConfirmPasswod(true)}
                            />
                          ) : (
                            <Eye
                              onClick={() => setIsShowConfirmPasswod(false)}
                              size={18}
                              className="absolute text-secondaryColor top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                            />
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
