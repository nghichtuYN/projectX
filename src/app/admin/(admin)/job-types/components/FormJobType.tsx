import React, { ReactNode } from "react";
import { Loader2, LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormJobTypeValues } from "./DialogAddJobType";
import FormFieldComponent from "@/app/(auth)/(components)/FormFieldComponent";
type FormJobTypeProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  form: any;
  onSubmit: (values: FormJobTypeValues) => void;
  isLoading: boolean;
  title: string;
  description: string;
  contentTrigger?: string;
  IconTrigger: LucideIcon;
  contentButton: string;
  contentLoading: string;
  colorIconTrigger?: string;
  triggerContent: (
    IconTrigger: LucideIcon,
    colorIconTrigger?: string,
    contentTrigger?: string | undefined
  ) => ReactNode;
};
const FormJobType = ({
  open,
  setOpen,
  form,
  onSubmit,
  isLoading,
  title,
  description,
  contentTrigger,
  IconTrigger,
  contentButton,
  contentLoading,
  colorIconTrigger,
  triggerContent,
}: FormJobTypeProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {triggerContent(IconTrigger, contentTrigger, colorIconTrigger)}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-4"
          >
            <FormFieldComponent
              control={form.control}
              name="name"
              icon={null}
              requrie={true}
              label="Tên loại hình công việc"
            >
              {(field) => (
                <Input
                  placeholder="Nhập tên loại hình công việc"
                  //   defaultValue={field.value}
                  {...field}
                />
              )}
            </FormFieldComponent>

            <DialogFooter>
              <Button
                type="button"
                variant="destructive"
                onClick={() => setOpen(false)}
              >
                Hủy bỏ
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {contentLoading}
                  </>
                ) : (
                  contentButton
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default FormJobType;
