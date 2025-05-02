"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import  z from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import React from "react";


const formSchema = z.object({
  name: z.string().min(2, {
    message: "Tên phải có ít nhất 2 ký tự.",
  }),
  phone: z.string().regex(/^[0-9]{10,11}$/, "Số điện thoại không hợp lệ"),
  company: z.string().min(2, "Tên công ty quá ngắn"),
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
});

export function EmployerGoogleRegistrationForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      company: "",
      district: "",
      workLocation: "",
      gender: "male",
    },
  });

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
            <p className="text-secondaryColor font-semibold text-2xl pl-3 pt-3">
              Thông tin nhà tuyển dụng
            </p>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Đang đăng ký..." : "Đăng ký"}
            </Button>
          </div>

          <div className="text-center text-sm">
            Đã có tài khoản?{" "}
            <a href="/login" className="text-secondaryColor hover:underline">
              Đăng nhập ngay
            </a>
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
