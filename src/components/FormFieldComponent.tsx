/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Control } from "react-hook-form";
import { ReactNode } from "react";

type FormFieldProps = {
  control: Control<any>;
  name: string;
  icon: React.ElementType;
  children: (field: any) => ReactNode;
  label: string;
  requrie: boolean;
};

const FormFieldComponent: React.FC<FormFieldProps> = ({
  control,
  name,
  icon: Icon,
  children,
  label,
  requrie,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2">
            <Icon size={18} className="text-secondaryColor" />
            {label}
            {requrie ? <span className="text-red-500">*</span> : null}
          </FormLabel>
          <FormControl>{children(field)}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormFieldComponent;
