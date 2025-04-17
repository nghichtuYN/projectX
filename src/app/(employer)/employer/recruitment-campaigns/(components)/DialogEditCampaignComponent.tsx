"use client";
import FormFieldComponent from "@/app/(auth)/(components)/FormFieldComponent";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutationHook } from "@/hooks/useMutationHook";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState, useCallback, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  createCampaign,
  getDetailsCampaign,
  updateCampaign,
} from "@/services/campaign";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useQueryHook } from "@/hooks/useQueryHook";
import { CampaignContext } from "../page";
import { campaignType } from "@/types/campaign";

// Cập nhật schema để thêm trường status
export const formSchema = z
  .object({
    name: z
      .string()
      .nonempty({ message: "Tên chiến dịch không được để trống" })
      .min(6, { message: "Tên chiến dịch phải có ít nhất 6 ký tự" })
      .max(255, { message: "Tên chiến dịch không được vượt quá 255 ký tự" }),
    description: z
      .string()
      .max(1000, { message: "Mô tả không được vượt quá 1000 ký tự" }),
    start: z
      .date({
        required_error: "Ngày bắt đầu không được để trống",
        invalid_type_error: "Ngày bắt đầu không hợp lệ",
      })
      .refine((val) => val !== undefined, {
        message: "Ngày bắt đầu không được để trống",
      }),
    end: z
      .date({
        required_error: "Ngày kết thúc không được để trống",
        invalid_type_error: "Ngày kết thúc không hợp lệ",
      })
      .refine((val) => val !== undefined, {
        message: "Ngày kết thúc không được để trống",
      }),
    status: z.enum(["0", "1", "2"], {
      required_error: "Vui lòng chọn trạng thái chiến dịch",
    }),
  })
  .refine((data) => data.start && data.end && data.start <= data.end, {
    message: "Ngày kết thúc phải sau ngày bắt đầu",
    path: ["end"],
  });

type Props = {
  id: string;
};

const DialogEditCampaignComponent = ({ id }: Props) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const context = useContext(CampaignContext);
  const { refetch } = context;
  const { data } = useQueryHook<campaignType>(
    ["campaign", id],
    () => getDetailsCampaign(id),
    { enabled: !!open }
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      start: undefined,
      end: undefined,
      status: "0", // Giá trị mặc định
    },
  });

  // Đồng bộ dữ liệu từ API vào form khi data thay đổi
  useEffect(() => {
    if (data) {
      const statusValue =
        data.status === 0
          ? "0"
          : data.status === 1
          ? "1"
          : data.status === 2
          ? "2"
          : "0";
      form.reset({
        name: data.name || "",
        description: data.description || "",
        start: data.open ? new Date(data.open) : undefined,
        end: data.close ? new Date(data.close) : undefined,
        status: statusValue,
      });
    }
  }, [data, form]);
  const errors = form.formState.errors;

  const onSuccess = useCallback(
    (data: any) => {
      toast.success("Cập nhật chiến dịch thành công 🚀");
      setIsLoading(false);
      form.reset();
      setOpen(false);
      refetch();
    },
    [form, router]
  );

  const onError = useCallback(
    (error: any) => {
      setIsLoading(false);
      const errorMessage =
        error.response?.data?.message ||
        "Có lỗi xảy ra khi cập nhật chiến dịch";
      toast.error(errorMessage);
      console.log(error);
      if (error.response?.status === 400) {
        form.setError("name", {
          type: "manual",
          message: errorMessage,
        });
      } else if (error.response?.status === 422) {
        const errors = error.response.data.errors;
        Object.keys(errors).forEach((key) => {
          form.setError(key as any, {
            type: "manual",
            message: errors[key][0],
          });
        });
      }
    },
    [form]
  );

  const mutation = useMutationHook(
    (dataUpdate: z.infer<typeof formSchema>) =>
      updateCampaign(id, {
        name: dataUpdate?.name,
        description: dataUpdate?.description,
        open: dataUpdate.start,
        close: dataUpdate.end,
        status: parseInt(dataUpdate.status),
      }),
    onSuccess,
    onError
  );

  const onSubmit = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      try {
        setIsLoading(true);
        await mutation.mutateAsync(values);
      } catch (error) {
        setIsLoading(false);
      }
    },
    [mutation]
  );

  const formatDateForInput = (date: Date | undefined) => {
    return date ? date.toISOString().split("T")[0] : "";
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <span
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
          setOpen(true);
        }}
        className="after:content-['|'] after:ml-0.5 after:text-accent cursor-pointer hover:text-secondaryColor"
      >
        Sửa chiến dịch
      </span>
      <DialogContent className="h-fit max-w-2xl">
        <DialogHeader className="border-b-2 pb-2">
          <DialogTitle className="text-ellipsis line-clamp-2 pt-1 leading-8">
            Tạo chiến dịch tuyển dụng của bạn
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            id="add-campaign-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div className="px-4 space-y-6">
              <FormFieldComponent
                icon={null}
                control={form.control}
                name="name"
                label="Tên chiến dịch tuyển dụng"
                requrie={true}
              >
                {(field) => (
                  <Input
                    className={cn(errors.name && "border-red-500")}
                    placeholder="VD: Tuyển dụng nhân viên IT tháng 3"
                    disabled={isLoading}
                    {...field}
                  />
                )}
              </FormFieldComponent>

              <FormFieldComponent
                icon={null}
                control={form.control}
                name="description"
                label="Mô tả chiến dịch"
                requrie={false}
              >
                {(field) => (
                  <Textarea
                    placeholder="Nhập thông tin chi tiết về chiến dịch tuyển dụng của bạn"
                    className={cn(errors.description && "border-red-500")}
                    disabled={isLoading}
                    rows={4}
                    {...field}
                  />
                )}
              </FormFieldComponent>

              <FormFieldComponent
                control={form.control}
                name="start"
                label="Ngày bắt đầu"
                requrie={true}
                icon={null}
              >
                {(field) => (
                  <Input
                    type="date"
                    className={cn(errors.start && "border-red-500")}
                    value={formatDateForInput(field.value)}
                    disabled={isLoading}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? new Date(e.target.value) : undefined
                      )
                    }
                  />
                )}
              </FormFieldComponent>

              <FormFieldComponent
                control={form.control}
                icon={null}
                name="end"
                label="Ngày kết thúc"
                requrie={true}
              >
                {(field) => (
                  <Input
                    type="date"
                    className={cn(errors.end && "border-red-500")}
                    value={formatDateForInput(field.value)}
                    disabled={isLoading}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? new Date(e.target.value) : undefined
                      )
                    }
                  />
                )}
              </FormFieldComponent>

              {/* Thêm trường chọn trạng thái với RadioGroup */}
              <FormFieldComponent
                control={form.control}
                name="status"
                label="Trạng thái chiến dịch"
                requrie={true}
                icon={null}
              >
                {(field) => (
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex space-x-4 mt-2"
                    disabled={isLoading}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="0" id="draft" />
                      <Label htmlFor="draft">Nháp</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1" id="open" />
                      <Label htmlFor="open">Mở</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="2" id="closed" />
                      <Label htmlFor="closed">Đóng</Label>
                    </div>
                  </RadioGroup>
                )}
              </FormFieldComponent>
            </div>
          </form>
        </Form>
        <DialogFooter className="flex gap-2 justify-center w-full">
          <DialogClose asChild>
            <Button variant="secondary" disabled={isLoading}>
              Hủy
            </Button>
          </DialogClose>
          <Button type="submit" form="add-campaign-form" disabled={isLoading}>
            {isLoading ? "Đang xử lý..." : "Tiếp theo"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogEditCampaignComponent;
