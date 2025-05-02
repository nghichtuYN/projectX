import FormFieldComponent from "@/app/(auth)/(components)/FormFieldComponent";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
type Props = {
  form: any;
};
const NoteAppointment = ({ form }: Props) => {
  return (
    <FormFieldComponent
      icon={null}
      control={form.control}
      name="note"
      label="Ghi chú"
      requrie={true}
    >
      {(field) => <Textarea placeholder="Nhập ghi chú" rows={4} {...field} />}
    </FormFieldComponent>
  );
};

export default NoteAppointment;
