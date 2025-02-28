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
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { FolderPlus } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const formSchema = z
  .object({
    campaign_name: z
      .string()
      .nonempty({ message: "Tên chiến dịch không được để trống" })
      .min(6, { message: "Tên chiến dịch phải có ít nhất 6 ký tự" })
      .max(255, { message: "Tên chiến dịch không được vượt quá 255 ký tự" }),
    start: z
      .date({
        required_error: "Ngày bắt đầu không được để trống",
        invalid_type_error: "Ngày bắt đầu không hợp lệ",
      })
      .optional()
      .refine((val) => val !== undefined, {
        message: "Ngày bắt đầu không được để trống",
      }),
    end: z
      .date({
        required_error: "Ngày kết thúc không được để trống",
        invalid_type_error: "Ngày kết thúc không hợp lệ",
      })
      .optional()
      .refine((val) => val !== undefined, {
        message: "Ngày kết thúc không được để trống",
      }),
  })
  .refine((data) => data.start && data.end && data.start <= data.end, {
    message: "Ngày kết thúc phải sau ngày bắt đầu",
    path: ["end"],
  });

const DialogAddCampaignComponent = () => {
  const [open, setOpen] = useState(false);
  const placeholder = "VD: Tuyển dụng nhân viên IT tháng 3";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      campaign_name: "",
      start: undefined, // Initially unset
      end: undefined, // Initially unset
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    //call api
  };

  const errors = form.formState.errors;

  const formatDateForInput = (date: any) => {
    if (!date) return "";
    return date.toISOString().split("T")[0];
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(!open);
        form.reset();
      }}
    >
      <Button onClick={() => setOpen(true)}>
        <FolderPlus className="mr-2" />
        Thêm chiến dịch mới
      </Button>
      <DialogContent className="h-fit max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-ellipsis line-clamp-2 pt-1">
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
                name="campaign_name"
                label="Tên chiến dịch tuyển dụng"
                requrie={true}
              >
                {(field) => (
                  <Input
                    className={cn(errors.campaign_name && "border-red-500")}
                    placeholder={placeholder}
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
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? new Date(e.target.value) : undefined
                      )
                    }
                  />
                )}
              </FormFieldComponent>
            </div>
          </form>
        </Form>
        <DialogFooter className="flex gap-2 justify-center w-full">
          <DialogClose asChild>
            <Button variant="secondary">Hủy</Button>
          </DialogClose>
          <Button type="submit" form="add-campaign-form">
            Tiếp theo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogAddCampaignComponent;
