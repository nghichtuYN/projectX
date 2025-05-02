import FormFieldComponent from "@/app/(auth)/(components)/FormFieldComponent";
import { Input } from "@/components/ui/input";
type Props = {
  form: any;
};
const HighLightEnd = ({ form }: Props) => {
  const formatDateForInput = (date: Date | undefined) => {
    return date ? date.toISOString().split("T")[0] : "";
  };
  return (
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

export default HighLightEnd;
