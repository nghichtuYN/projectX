import FormFieldComponent from "@/app/(auth)/(components)/FormFieldComponent";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { FormCampaignValues } from "./DialogAddCampaignComponent";
import { cn } from "@/lib/utils";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
type Props = {
  form: any;
  onSubmit: (values: FormCampaignValues) => void;
  errors: any;
  isLoading: boolean;
};
const FormCampaign = ({ form, onSubmit, errors, isLoading }: Props) => {
  return (
    <Form {...form}>
      <form
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
        <DialogFooter className="flex gap-2 justify-center w-full">
          <DialogClose asChild>
            <Button variant="secondary" disabled={isLoading}>
              Hủy
            </Button>
          </DialogClose>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Đang xử lý..." : "Tiếp theo"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default FormCampaign;
