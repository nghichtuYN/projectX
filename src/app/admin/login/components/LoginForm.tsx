"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import FormFieldComponent from "@/app/(auth)/(components)/FormFieldComponent";
import { cn } from "@/lib/utils";
import { Loader2, Lock, Mail } from "lucide-react";
import IsShowPasswordComponent from "@/app/(auth)/(components)/IsShowPasswordComponent";
import Link from "next/link";
import { z } from "zod";
import { useMutationHook } from "@/hooks/useMutationHook";
import { signIn } from "@/services/user";
import { toast } from "sonner";
import { useAuthStore } from "@/store/UserStore";
import { useRouter } from "next/navigation";
const formSchema = z.object({
  email: z
    .string()
    .nonempty("Email không được để trống")
    .email({ message: "Vui lòng nhập địa chỉ email hợp lệ" }),
  password: z
    .string()
    .nonempty("Mật khẩu không được để trống")
    .min(8, { message: "Mật khẩu phải có ít nhất 8 ký tự" }),
});
const LoginForm = () => {
  const [isShowPassword, setIsShowPasswod] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const errors = form.formState.errors;
  const loadUser = useAuthStore((state) => state.loadUser);
  const router = useRouter();
  const onSuccess = (data: any) => {
    toast.success("Đăng nhập thành công🚀");
    loadUser();
    setIsLoading(false);
    router.push("/admin/dashboard");
  };
  const onError = (error: any) => {
    toast.error("Đăng nhập thất bại🚀");
    const errorMessage = error.response?.data?.message || "Có lỗi xảy ra";
    if (error.response?.status === 400 || error.response?.status === 401) {
      if (errorMessage.toLowerCase().includes("email")) {
        form.setError("email", {
          type: "manual",
          message: "Tài khoản hoặc mật khẩu không đúng",
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
      toast.error(errorMessage);
    }
    setIsLoading(false);
  };
  const mutaionLogin = useMutationHook(
    (data: { email: string; password: string }) => signIn(data),
    (data: any) => onSuccess(data),
    onError
  );
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    mutaionLogin.mutate(values);
  };
  return (
    <Card className="border-none shadow-lg">
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

            <div className="w-full text-end">
              <Link
                href={"/"}
                className="px-0 text-sm  font-normal hover:underline text-secondaryColor"
              >
                Quên mật khẩu?
              </Link>
            </div>
            <Button type="submit" className="w-full " disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang đăng nhập...
                </>
              ) : (
                "Đăng nhập"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
