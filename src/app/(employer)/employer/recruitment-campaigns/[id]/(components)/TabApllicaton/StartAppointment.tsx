import FormFieldComponent from "@/app/(auth)/(components)/FormFieldComponent";
import { Input } from "@/components/ui/input";
import { formatDateForInput } from "@/lib/utils";
type Props = {
  form: any;
};
const StartAppointment = ({ form }: Props) => {
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
          value={formatDateForInput(field.value)}
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

export default StartAppointment;
