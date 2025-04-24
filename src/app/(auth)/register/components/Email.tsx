import FormFieldComponent from "../../(components)/FormFieldComponent";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Mail } from "lucide-react";
type Props = {
  form: any;
  errors: any;
};
const Email = ({ form, errors }: Props) => {
  return (
    <FormFieldComponent
      control={form.control}
      name="email"
      icon={Mail}
      label=" Email đăng nhập"
      requrie={true}
    >
      {(field) => (
        <Input
          className={cn(
            errors.email && "border-red-500 focus-visible:ring-red-500"
          )}
          placeholder="Nhập email"
          {...field}
        />
      )}
    </FormFieldComponent>
  );
};

export default Email;
