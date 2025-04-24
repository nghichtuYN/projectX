'use client'
import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { Salary } from "@/data/Salary";
import React from "react";
type Props = {
  salary: Salary;
};
const SalaryComponent = ({ salary }: Props) => {
  return (
    <div className="flex items-center space-x-2">
      <RadioGroupItem value={salary.value} id={salary.label} />
      <Label htmlFor={salary.label}>{salary.label}</Label>
    </div>
  );
};

export default SalaryComponent;
