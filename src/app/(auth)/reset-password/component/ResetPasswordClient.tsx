"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BriefcaseBusiness, Loader2, Mail } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import FormFieldComponent from "../../(components)/FormFieldComponent";

const formSchema = z.object({
  email: z.string().email({
    message: "Vui lòng nhập một địa chỉ email hợp lệ.",
  }),
});
type FormResetPassword = z.infer<typeof formSchema>;

const ResetPasswordClient = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const form = useForm<FormResetPassword>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = async (values: FormResetPassword) => {
    setIsLoading(true);
  };
  const errors = form.formState.errors;
  return (
    <div className="flex min-h-screen items-center  justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="">
        <Card className="w-96 max-w-md overflow-hidden border-none shadow-xl">
          <div className="relative z-10">
            <CardHeader className="text-center pb-2">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-secondaryColor to-primaryColor"></div>
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primaryColor to-secondaryColor shadow-md">
                <BriefcaseBusiness className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-secondaryColor to-thirdColor text-transparent bg-clip-text">
                ProjectX
              </CardTitle>
              <CardDescription className="text-base mt-2">
                Đặt lại mật khẩu
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pb-2">
              {!isSubmitted ? (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6 w-full"
                  >
                    <div className="space-y-4">
                      <FormFieldComponent
                        control={form.control}
                        name="email"
                        icon={Mail}
                        label="Email"
                        requrie={true}
                        
                      >
                        {(field) => (
                          <Input
                            className={cn(
                              errors.email &&
                                "border-red-500 focus-visible:ring-red-500"
                            )}
                            placeholder="Nhập email của bạn"
                            {...field}
                          />
                        )}
                      </FormFieldComponent>

                      <Button
                        type="submit"
                        className="w-full font-semibold hover:bg-white hover:text-secondaryColor hover:outline-secondaryColor text-white"
                        disabled={isLoading}
                      >
                        {isLoading ? "Đang gửi..." : "Đặt lại mật khẩu"}
                      </Button>
                    </div>

                    <div className="text-center text-sm">
                      <Link
                        href="/login"
                        className="text-secondaryColor hover:underline"
                      >
                        Quay lại đăng nhập
                      </Link>
                    </div>
                  </form>
                </Form>
              ) : (
                <div className="space-y-4">
                  <div className="rounded-md bg-green-50 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-5 w-5 text-green-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-green-800">
                          Đã gửi email đặt lại mật khẩu thành công!
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Vui lòng kiểm tra hộp thư của bạn và làm theo hướng dẫn để
                    đặt lại mật khẩu.
                  </p>
                  <div className="text-center pt-4">
                    <Link
                      href="/login"
                      className="text-secondaryColor hover:underline"
                    >
                      Quay lại đăng nhập
                    </Link>
                  </div>
                </div>
              )}
            </CardContent>
          </div>
          <div className="m-4 text-center text-xs text-gray-500">
            <p>© 2025 ProjectX - Nền tảng tuyển dụng hàng đầu</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ResetPasswordClient;
