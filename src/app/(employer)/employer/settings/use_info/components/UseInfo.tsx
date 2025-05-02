"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AvatarComponent from "./AvatarComponent";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useMutationHook } from "@/hooks/useMutationHook";
import { updateUser } from "@/services/user";
import Email from "./Email";
import FullName from "./FullName";
import Phone from "./Phone";
import { useAuthStore } from "@/store/UserStore";
export const userSchema = z.object({
  fullName: z.string().nonempty("Tên người dùng không được để trống"),
  profilePicture: z.string(),
  phoneNumber: z.string().regex(/^[0-9]{10,11}$/, "Số điện thoại không hợp lệ"),
  email: z
    .string()
    .nonempty("Email không được để trống")
    .email("Email không hợp lệ"),
});
export type UserFormValues = z.infer<typeof userSchema>;

const UseInfo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [avatar, setAvatar] = useState<File[]>([]);
  const user = useAuthStore((state) => state.user);
  const loadUser = useAuthStore((state) => state.loadUser);
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      fullName: "",
      profilePicture: "",
      phoneNumber: "",
      email: "",
    },
  });
  useEffect(() => {
    if (user) {
      form.reset({
        fullName: user.fullName || "",
        profilePicture:
          `${process.env.NEXT_PUBLIC_API_URL_IMAGE}${user?.profilePicture}` || "",
        phoneNumber: user.phoneNumber || "",
        email: user.email || "",
      });
    }
  }, [user, form]);
  const onSuccess = (data: any) => {
    setIsLoading(false);
    loadUser();
    toast.success("Cập nhật tin thành công");
  };
  const onError = (errors: any) => {
    console.log(errors);
  };
  const mutation = useMutationHook(
    (data: FormData) => updateUser(data),
    onSuccess,
    onError
  );
  const onSubmit = (values: UserFormValues) => {
    setIsLoading(true);
    console.log(values);
    const formData = new FormData();
    formData.append("fullName", values.fullName);
    formData.append("phoneNumber", values.phoneNumber);
    if (avatar && avatar.length > 0) {
      formData.append("profilePicture", avatar[0]);
    }
    mutation.mutate(formData);
  };
  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-sm font-semibold">
          Cập nhật thông tin cá nhân
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form
            id="form-user"
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-3"
          >
            <AvatarComponent form={form} setLogoImage={setAvatar} />
            <Email form={form} />
            <FullName form={form} />
            <Phone form={form} />
            <div className="flex justify-end col-span-2 gap-4 pt-4">
              <Button variant="outline" form="form-user" className="min-w-24">
                Hủy
              </Button>
              <Button
                type="submit"
                className="min-w-24 bg-emerald-500 hover:bg-emerald-600"
              >
                Lưu
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UseInfo;
