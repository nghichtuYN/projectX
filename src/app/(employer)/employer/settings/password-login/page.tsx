"use client";
import FormFieldComponent from "@/app/(auth)/(components)/FormFieldComponent";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Định nghĩa schema validation
const formSchema = z
  .object({
    currentPassword: z
      .string()
      .nonempty({ message: "Mật khẩu hiện tại không được để trống" })
      .min(8, {
        message: "Mật khẩu hiện tại phải có ít nhất 8 ký tự.",
      }),
    newPassword: z
      .string()
      .nonempty({ message: "Mật khẩu mới không được để trống" })
      .min(8, {
        message: "Mật khẩu mới phải có ít nhất 8 ký tự.",
      }),
    confirmPassword: z
      .string()
      .nonempty({ message: "Mật khẩu nhập lại không được để trống" })
      .min(8, {
        message: "Mật khẩu nhập lại phải có ít nhất 8 ký tự.",
      }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Mật khẩu mới và nhập lại mật khẩu không khớp.",
    path: ["confirmPassword"], // Hiển thị lỗi ở trường confirmPassword
  });

const ChangePasswordPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Khởi tạo form với schema
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const errors = form.formState.errors;

  // Xử lý submit form
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log(values);
      setIsLoading(false);
      form.reset(); // Reset form sau khi thành công (tùy chọn)
    }, 2000);
  }

  return (
    <div className="flex flex-col gap-2 p-2 h-fit w-full">
      <p className="text-lg font-semibold">Thay đổi mật khẩu</p>
      <div className="border border-secondaryColor p-3 rounded-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormFieldComponent
                control={form.control}
                name="currentPassword"
                icon={null}
                label="Mật khẩu hiện tại"
                requrie={true}
              >
                {(field) => (
                  <Input
                    className={cn(
                      errors.currentPassword &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                    placeholder="Nhập mật khẩu hiện tại"
                    type="password"
                    disabled={isLoading}
                    {...field}
                  />
                )}
              </FormFieldComponent>
              <FormFieldComponent
                control={form.control}
                name="newPassword"
                icon={null}
                label="Mật khẩu mới"
                requrie={true}
              >
                {(field) => (
                  <Input
                    className={cn(
                      errors.newPassword &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                    placeholder="Nhập mật khẩu mới"
                    type="password"
                    disabled={isLoading}
                    {...field}
                  />
                )}
              </FormFieldComponent>
              <FormFieldComponent
                control={form.control}
                name="confirmPassword"
                icon={null}
                label="Nhập lại mật khẩu"
                requrie={true}
              >
                {(field) => (
                  <Input
                    className={cn(
                      errors.confirmPassword &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                    placeholder="Nhập lại mật khẩu mới"
                    type="password"
                    disabled={isLoading}
                    {...field}
                  />
                )}
              </FormFieldComponent>
            </div>
            <div className="flex items-center gap-3 justify-center p-3">
              <Button
                type="button"
                variant="outline"
                disabled={isLoading}
                onClick={() => form.reset()}
              >
                Hủy
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Đang cập nhật..." : "Cập nhật"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
