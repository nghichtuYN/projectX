'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormInfo from "./FormInfo";
import { useAuthStore } from "@/store/UserStore";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Họ và tên phải có ít nhất 2 ký tự.",
  }),
  phone: z.string().optional(),
  email: z.string().email({
    message: "Email không hợp lệ.",
  }),
});
export type FormUpdateInfo = z.infer<typeof formSchema>;
const CardUpdateInfo = () => {
  const user = useAuthStore((state) => state.user);
  const form = useForm<FormUpdateInfo>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
    },
  });
  useEffect(() => {
    if (user) {
      form.reset({
        fullName: user.fullName,
        phone: user.phoneNumber,
        email: user.email,
      });
    }
  }, [user, form]);
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  return (
    <Card className="w-full col-span-2 h-fit">
      <CardHeader>
        <CardTitle>Cài đặt thông tin cá nhân</CardTitle>
        <CardDescription className="text-red-500">
          (*) Các thông tin bắt buộc
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormInfo form={form} onSubmit={onSubmit} />
      </CardContent>
    </Card>
  );
};

export default CardUpdateInfo;
