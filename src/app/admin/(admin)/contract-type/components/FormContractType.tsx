'use client"';
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
import FormFieldComponent from "@/app/(auth)/(components)/FormFieldComponent";
import { FormContractTypeValues } from "./DialogAddContractType";
type FormContractTypeProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  form: any;
  onSubmit: (values: FormContractTypeValues) => void;
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

const FormContractType = ({
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
}: FormContractTypeProps) => {
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
              label="Tên hình thức"
            >
              {(field) => <Input placeholder="Nhập tên hình thức" {...field} />}
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

export default FormContractType;
