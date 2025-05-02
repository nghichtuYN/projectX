import FormFieldComponent from "@/app/(auth)/(components)/FormFieldComponent";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React from "react";
type Props = {
  form: any;
};
const HighLightStart = ({ form }: Props) => {
  const formatDateForInput = (date: Date | undefined) => {
    return date ? date.toISOString().split("T")[0] : "";
  };
  return (
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
          //   className={cn(errors.start && "border-red-500")}
          value={formatDateForInput(field.value)}
          //   disabled={isLoading}
          onChange={(e) =>
            field.onChange(
              e.target.value ? new Date(e.target.value) : undefined
            )
          }
        />
      )}
    </FormFieldComponent>
  );
};

export default HighLightStart;
