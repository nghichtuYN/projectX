"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthStore } from "@/store/UserStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormChangePassword from "./FormChangePassword";
const formSchema = z
  .object({
    email: z.string().email({
      message: "Email không hợp lệ.",
    }),
    currentPassword: z.string().min(1, {
      message: "Vui lòng nhập mật khẩu hiện tại.",
    }),
    newPassword: z.string().min(6, {
      message: "Mật khẩu mới phải có ít nhất 6 ký tự.",
    }),
    confirmPassword: z.string().min(1, {
      message: "Vui lòng nhập lại mật khẩu mới.",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Mật khẩu không khớp.",
    path: ["confirmPassword"],
  });
export type FormChangePasswordValue = z.infer<typeof formSchema>;
const CardChangePassword = () => {
  const user = useAuthStore((state) => state.user);

  const form = useForm<FormChangePasswordValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  useEffect(() => {
    if (user) {
      form.reset({
        email: user.email,
      });
    }
  }, [user, form]);
  const onSubmit = (values: FormChangePasswordValue) => {
    console.log(values);
    // Submit form data to server
  };
  return (
    <Card className="w-full col-span-2 h-fit">
      <CardHeader>
        <CardTitle>Thay đổi mật khẩu đăng nhập</CardTitle>
        <CardDescription className="text-red-500">
          (*) Các thông tin bắt buộc
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormChangePassword form={form} onSubmit={onSubmit} />
      </CardContent>
    </Card>
  );
};

export default CardChangePassword;
