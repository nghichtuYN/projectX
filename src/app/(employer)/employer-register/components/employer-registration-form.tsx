"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, Lock, Mail, User } from "lucide-react";
import React from "react";

import FormFieldComponent from "../../../(auth)/(components)/FormFieldComponent";
import IsShowPasswordComponent from "../../../(auth)/(components)/IsShowPasswordComponent";
import Link from "next/link";
import { useMutationHook } from "@/hooks/useMutationHook";
import { signUp } from "@/services/user";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import DialogSelectRole from "./DialogSelectRole";
import { z } from "zod";

export const formSchema = z
  .object({
    name: z.string().min(2, {
      message: "Tên phải có ít nhất 2 ký tự.",
    }),
    email: z.string().email({
      message: "Vui lòng nhập một địa chỉ email hợp lệ.",
    }).nonempty("Email không được để trống"),
    password: z
      .string()
      .min(8, {
        message: "Mật khẩu phải có ít nhất 8 ký tự.",
      })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
        {
          message:
            "Mật khẩu phải có ít nhất 1 chữ cái viết hoa, 1 chữ cái viết thường, 1 chữ số và 1 ký tự đặc biệt.",
        }
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp.",
    path: ["confirmPassword"],
  }); 
type Props={
  roleName:string
}
export function EmployerRegistrationForm({ roleName }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShowPassword, setIsShowPasswod] = useState<boolean>(false);
  const router = useRouter();

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
  const onSuccess = (data: any) => {
    toast.success("Đăng nhập thành công🚀");
    setIsLoading(false);
    router.push(`/verify-account?key=${window.location.pathname}`);
  };
  const onError = (error: any) => {
    toast.error("Tạo tài khoản thất bại🚀");
    const errorMessage = error.response?.data?.message || "Có lỗi xảy ra";
    if (
      error.response?.status === 400 ||
      error.response?.status === 401 ||
      error.response?.status === 409
    ) {
      if (errorMessage.toLowerCase().includes("email")) {
        form.setError("email", {
          type: "manual",
          message: "Tài khoản đã tồn tại",
        });
      } else if (errorMessage.toLowerCase().includes("password")) {
        form.setError("password", {
          type: "manual",
          message: errorMessage || "Mật khẩu không đúng",
        });
      } else {
        form.setError("email", { type: "manual", message: errorMessage });
        form.setError("password", { type: "manual", message: errorMessage });
      }
    } else {
      toast.error(errorMessage); // Lỗi khác (500, mạng, etc.)
    }
    setIsLoading(false);
  };
  const mutation = useMutationHook(
    (data: {
      fullname: string;
      email: string;
      password: string;
      roleName: string;
    }) => {
      return signUp(data);
    },
    onSuccess,
    onError
  );

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    mutation.mutate({
      fullname: values.name,
      email: values.email,
      password: values.password,
      roleName: roleName,
    });
  };

  return (
    <div className={cn("flex flex-col gap-6 pl-3 mt-5 ")}>
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
              name="name"
              icon={User}
              label="Họ và tên"
              requrie={true}
            >
              {(field) => (
                <Input
                  className={cn(
                    errors.name && "border-red-500 focus-visible:ring-red-500"
                  )}
                  placeholder="Nhập họ tên"
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
            <Button type="submit" className="w-full " disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang đăng ký...
                </>
              ) : (
                "Đăng ký"
              )}
            </Button>
          </div>

          <div className="text-center text-sm">
            Đã có tài khoản?{" "}
            <Link
              href="/employer-login"
              className="text-secondaryColor hover:underline"
            >
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
