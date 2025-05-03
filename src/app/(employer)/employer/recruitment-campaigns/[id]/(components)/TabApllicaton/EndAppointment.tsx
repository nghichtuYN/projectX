import FormFieldComponent from "@/app/(auth)/(components)/FormFieldComponent";
import { Input } from "@/components/ui/input";
import { formatDateForInput, formatDateForInputTime } from "@/lib/utils";
import React from "react";
type Props = {
  form: any;
};
const EndAppointment = ({ form }: Props) => {
  return (
    <FormFieldComponent
      control={form.control}
      icon={null}
      name="end"
      label="Ngày kết thúc"
      requrie={true}
    >
      {(field) => (
        // StartAppointment.tsx
        <Input
          type="time"
          value={field.value}
          onChange={(e) => field.onChange(e.target.value)}
        />
      )}
    </FormFieldComponent>
  );
};

export default EndAppointment;
