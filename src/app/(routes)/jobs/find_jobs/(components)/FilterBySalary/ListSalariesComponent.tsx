import { RadioGroup } from "@/components/ui/radio-group";
import { Salaries } from "@/data/Salary";
import React from "react";
import SalaryComponent from "./SalaryComponent";

const ListSalariesComponent = () => {
  return (
    <RadioGroup className="grid grid-cols-2 p-2 gap-3" defaultValue="all">
      {Salaries?.map((salary, index) => (
        <SalaryComponent salary={salary} key={index} />
      ))}
    </RadioGroup>
  );
};

export default ListSalariesComponent;
