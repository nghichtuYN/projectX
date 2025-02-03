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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import GoogleLoginButton from "./GoogleLoginButton";
import { useAuthStore } from "@/store/UserStore";
import { redirect } from "next/navigation";

const formSchema = z.object({
  email: z.string().email({
    message: "Vui lòng nhập một địa chỉ email hợp lệ.",
  }),
  password: z.string().min(8, {
    message: "Mật khẩu phải có ít nhất 8 ký tự.",
  }),
});

export function EmployerLoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [isShowPassword, setIsShowPasswod] = useState<boolean>(false);
  const setUser = useAuthStore((state) => state.setUser);

  const errors = form.formState.errors;
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // Simulate API call
    setUser({ name: "test", email: "test", id: "2" });
    redirect("/");
    setTimeout(() => {
      console.log(values);
      setIsLoading(false);
    }, 2000);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-start">
          <CardTitle className="text-xl text-secondaryColor">
            Chào mừng bạn đã quay trở lại
          </CardTitle>
          <CardDescription>
            Cùng tạo dựng lợi thế cho doanh nghiệp bằng trải nghiệm công nghệ
            tuyển dụng
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Hoặc tiếp tục bằng
                </span>
              </div> */}
              <div className=" space-y-4 space-x-4">
                <GoogleLoginButton />
              </div>
              <div className="space-y-4">
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
                          placeholder="Email"
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
                      <div className="flex items-center justify-between">
                        <FormLabel className="flex items-center gap-2">
                          <Lock size={18} className="text-secondaryColor" />
                          Mật khẩu
                        </FormLabel>
                        <a
                          href="#"
                          className="text-sm text-secondaryColor hover:underline"
                        >
                          Quên mật khẩu?
                        </a>
                      </div>
                      <FormControl>
                        <div className="relative">
                          <Input
                            className={cn(
                              errors.password &&
                                "border-red-500 focus-visible:ring-red-500",
                              "relative"
                            )}
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
                <Button
                  type="submit"
                  className="w-full font-semibold hover:bg-white hover:text-secondaryColor hover:outline-secondaryColor  text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
                </Button>
              </div>

              <div className="text-center text-sm">
                Chưa có tài khoản?{" "}
                <a
                  href="/employer-register"
                  className="text-secondaryColor hover:underline"
                >
                  Đăng ký ngay
                </a>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
