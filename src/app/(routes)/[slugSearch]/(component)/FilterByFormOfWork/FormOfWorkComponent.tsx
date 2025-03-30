import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { FormOfWork } from "@/data/FormOfWork";
import React from "react";
type Props = {
  formOfWork: FormOfWork;
};
const FormOfWorkComponent = ({ formOfWork }: Props) => {
  return (
    <div className="flex items-center space-x-2">
      <RadioGroupItem value={formOfWork.value} id={formOfWork.label} />
      <Label htmlFor={formOfWork.label}>{formOfWork.label}</Label>
    </div>
  );
};

export default FormOfWorkComponent;
