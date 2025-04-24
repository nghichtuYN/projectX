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
import { Loader2, Lock, Mail, User } from "lucide-react";
import React from "react";
import GoogleLoginButton from "../../../../components/GoogleLoginButton";
import FormFieldComponent from "../../(components)/FormFieldComponent";
import IsShowPasswordComponent from "../../(components)/IsShowPasswordComponent";
import { useMutationHook } from "@/hooks/useMutationHook";
import { signUp } from "@/services/user";
import { toast } from "sonner";
import FullName from "./FullName";
import Email from "./Email";
import Password from "./Password";
import ConfirmPassWord from "./ConfirmPassWord";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    fullName: z.string().min(2, {
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
export type RegisterFormValues = z.infer<typeof formSchema>;

export function RegistrationForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShowPassword, setIsShowPasswod] = useState<boolean>(false);
  const [isShowConfirmPassword, setIsShowConfirmPasswod] =
    useState<boolean>(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const errors = form.formState.errors;
  const mutation = useMutationHook(
    (data: RegisterFormValues) => {
      const roleName = "Candidate";
      return signUp({
        fullname: data.fullName,
        email: data.email,
        password: data.password,
        roleName: roleName,
      });
    },
    (data) => {
      setIsLoading(false);
      toast.success("Đăng ký thành công");
      router.push("/login");
    },
    (errors) => {
      toast.error("Đăng ký thất bại");
    }
  );
  const onSubmit = (values: RegisterFormValues) => {
    setIsLoading(true);
    mutation.mutate(values);
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
                <FullName form={form} errors={errors} />
                <Email form={form} errors={errors} />

                <Password
                  form={form}
                  errors={errors}
                  isShowPassword={isShowPassword}
                  setIsShowPasswod={setIsShowPasswod}
                />
                <ConfirmPassWord
                  form={form}
                  errors={errors}
                  isShowConfirmPassword={isShowConfirmPassword}
                  setIsShowConfirmPasswod={setIsShowConfirmPasswod}
                />

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
