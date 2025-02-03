"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Building,
  Building2,
  Check,
  ChevronsUpDown,
  Eye,
  EyeOff,
  House,
  Lock,
  Mail,
  Phone,
  User,
} from "lucide-react";
import React from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { JobType } from "@/lib/jobType";

const formSchema = z
  .object({
    name: z.string().min(2, {
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

export function EmployerRegistrationForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShowPassword, setIsShowPasswod] = useState<boolean>(false);
  const [isShowConfirmPassword, setIsShowConfirmPasswod] =
    useState<boolean>(false);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
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
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Mail size={18} className="text-secondaryColor" />
                    Email đăng nhập<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className={cn(
                        errors.email &&
                          "border-red-500 focus-visible:ring-red-500"
                      )}
                      placeholder="Nhập email"
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
                  <FormLabel className="flex items-center gap-2">
                    <Lock size={18} className="text-secondaryColor" />
                    Mật khẩu<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Lock size={18} className="text-secondaryColor" />
                    Xác nhận mật khẩu<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        className={cn(
                          errors.password &&
                            "border-red-500 focus-visible:ring-red-500",
                          "relative"
                        )}
                        type={isShowConfirmPassword ? "text" : "password"}
                        {...field}
                        placeholder="Nhập lại mật khẩu"
                      />
                      {!isShowConfirmPassword ? (
                        <EyeOff
                          size={18}
                          className="absolute text-secondaryColor top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                          onClick={() => setIsShowConfirmPasswod(true)}
                        />
                      ) : (
                        <Eye
                          onClick={() => setIsShowConfirmPasswod(false)}
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
            <p className="text-secondaryColor font-semibold text-2xl pl-3 pt-3">
              Thông tin nhà tuyển dụng
            </p>
            <div className="flex items-center w-full gap-3">
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <User size={18} className="text-secondaryColor" />
                        Họ và tên<span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={cn(
                            errors.name &&
                              "border-red-500 focus-visible:ring-red-500"
                          )}
                          placeholder="Nhập họ tên"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end w-full">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex flex-col items-start gap-4 ">
                        <FormLabel className="flex items-center gap-2">
                          <User size={18} className="text-secondaryColor" />
                          Giới tính<span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            className="flex gap-6 "
                            defaultValue="jobs"
                          >
                            <div className="flex items-center ">
                              <RadioGroupItem value="jobs" id="r1" />
                              <Label htmlFor="r1">Nam</Label>
                            </div>
                            <div className="flex items-center ">
                              <RadioGroupItem value="company" id="r2" />
                              <Label htmlFor="r2">Nữ</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Phone size={18} className="text-secondaryColor" />
                    Số điện thoại cá nhân<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className={cn(
                        errors.name &&
                          "border-red-500 focus-visible:ring-red-500"
                      )}
                      placeholder="Nhập họ tên"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Building size={18} className="text-secondaryColor" />
                    Công ty<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className={cn(
                        errors.name &&
                          "border-red-500 focus-visible:ring-red-500"
                      )}
                      placeholder="Nhập họ tên"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Phone size={18} className="text-secondaryColor" />
                    Số điện thoại cá nhân<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className={cn(
                        errors.name &&
                          "border-red-500 focus-visible:ring-red-500"
                      )}
                      placeholder="Nhập họ tên"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center w-full gap-3">
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Building2 size={18} className="text-secondaryColor" />
                        Địa điểm làm việc<span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={open}
                              className="w-[200px] justify-between"
                            >
                              {value
                                ? JobType.find(
                                    (framework) => framework.value === value
                                  )?.label
                                : "Chọn địa điểm..."}
                              <ChevronsUpDown className="opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput
                                placeholder="Search framework..."
                                className="h-9"
                              />
                              <CommandList>
                                <CommandEmpty>No framework found.</CommandEmpty>
                                <CommandGroup>
                                  {JobType.map((framework) => (
                                    <CommandItem
                                      key={framework.value}
                                      value={framework.value}
                                      onSelect={(currentValue) => {
                                        setValue(
                                          currentValue === value
                                            ? ""
                                            : currentValue
                                        );
                                        setOpen(false);
                                      }}
                                    >
                                      {framework.label}
                                      <Check
                                        className={cn(
                                          "ml-auto",
                                          value === framework.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end w-full">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex flex-col items-start gap-4 ">
                        <FormLabel className="flex items-center gap-2">
                          <House size={18} className="text-secondaryColor" />
                          Quận/Huyện<span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-[200px] justify-between"
                              >
                                {value
                                  ? JobType.find(
                                      (framework) => framework.value === value
                                    )?.label
                                  : "Chọn địa điểm..."}
                                <ChevronsUpDown className="opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                              <Command>
                                <CommandInput
                                  placeholder="Search framework..."
                                  className="h-9"
                                />
                                <CommandList>
                                  <CommandEmpty>
                                    No framework found.
                                  </CommandEmpty>
                                  <CommandGroup>
                                    {JobType.map((framework) => (
                                      <CommandItem
                                        key={framework.value}
                                        value={framework.value}
                                        onSelect={(currentValue) => {
                                          setValue(
                                            currentValue === value
                                              ? ""
                                              : currentValue
                                          );
                                          setOpen(false);
                                        }}
                                      >
                                        {framework.label}
                                        <Check
                                          className={cn(
                                            "ml-auto",
                                            value === framework.value
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
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
