"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Lock, Mail } from "lucide-react";
import React from "react";

import FormFieldComponent from "../../../(auth)/(components)/FormFieldComponent";
import IsShowPasswordComponent from "../../../(auth)/(components)/IsShowPasswordComponent";
import EmloyerInfoComponent from "../../employer-gg-register/(components)/EmloyerInfoComponent";
import Link from "next/link";

export const formSchema = z
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
    phone: z.string().regex(/^[0-9]{10,11}$/, "Số điện thoại không hợp lệ"),
    company: z.string().min(2, "Tên công ty quá ngắn"),
    confirmPassword: z.string(),
    gender: z.enum(["male", "female"], {
      message: "Vui lòng chọn giới tính.",
    }),
    workLocation: z
      .string({
        required_error: "Vui lòng chọn địa điểm làm việc.",
      })
      .min(1, {
        message: "Vui lòng chọn địa điểm làm việc.",
      }),
    district: z
      .string({
        required_error: "Vui lòng chọn quận huyện làm việc.",
      })
      .min(1, {
        message: "Vui lòng chọn quận huyện làm việc.",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp.",
    path: ["confirmPassword"],
  });

export function EmployerRegistrationForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShowPassword, setIsShowPasswod] = useState<boolean>(false);
  const [isShowConfirmPassword, setIsShowConfirmPasswod] =
    useState<boolean>(false);
  const [openWorkLocation, setOpenWorkLocation] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      company: "",
      district: "",
      workLocation: "",
      gender: "male",
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
    <div className={cn("flex flex-col gap-6 pl-3 ", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    errors.email && "border-red-500 focus-visible:ring-red-500"
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
            <p className="text-secondaryColor font-semibold text-2xl pl-3 pt-3">
              Thông tin nhà tuyển dụng
            </p>
            <EmloyerInfoComponent
              openWorkLocation={openWorkLocation}
              setOpenWorkLocation={setOpenWorkLocation}
              open={open}
              setOpen={setOpen}
              form={form}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Đang đăng ký..." : "Đăng ký"}
            </Button>
          </div>

          <div className="text-center text-sm">
            Đã có tài khoản?{" "}
            <Link href="/employer-login" className="text-secondaryColor hover:underline">
              Đăng nhập ngay
            </Link>
          </div>
        </form>
      </Form>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        Bằng cách đăng ký, bạn đồng ý với <a href="#">Điều khoản dịch vụ</a> và{" "}
        <a href="#">Chính sách bảo mật</a> của chúng tôi.
      </div>
    </div>
  );
}
