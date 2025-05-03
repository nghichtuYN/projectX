import FormFieldComponent from "@/app/(auth)/(components)/FormFieldComponent";
import { Input } from "@/components/ui/input";
import { formatDateForInput, formatDateForInputTime } from "@/lib/utils";
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
          type="time"
          value={field.value}
          onChange={(e) => field.onChange(e.target.value)}
        />
      )}
    </FormFieldComponent>
  );
};

export default StartAppointment;
