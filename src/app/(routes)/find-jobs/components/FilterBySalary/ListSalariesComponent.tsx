"use client";
import { RadioGroup } from "@/components/ui/radio-group";
import { Salaries } from "@/data/Salary";
import SalaryComponent from "./SalaryComponent";
type Props = {
  minSalary?: string;
  maxSalary?: string;
  handleSelectSalary?: (min: string, max: string) => void;
};
const ListSalariesComponent = ({
  minSalary,
  maxSalary,
  handleSelectSalary,
}: Props) => {
  const currentValue = () => {
    if (minSalary && maxSalary) {
      if (minSalary === "@" && maxSalary === "@") {
        return "all";
      }
      if (minSalary && maxSalary === "@") {
        return `${minSalary}-@`;
      }
      if (maxSalary && minSalary === "@") {
        return `@-${maxSalary}`;
      }
      return `${minSalary}-${maxSalary}`;
    }
  };

  const handleValueChange = (value: string) => {
    if (!handleSelectSalary) return;
    if (value === "all") {
      handleSelectSalary("@", "@");
    } else {
      const [min, max] = value.split("-").map(String);
      handleSelectSalary(min, max);
    }
  };
  return (
    <RadioGroup
      className="grid grid-cols-2 p-2 gap-3"
      value={currentValue()}
      onValueChange={handleValueChange}
    >
      {Salaries?.map((salary, index) => (
        <SalaryComponent salary={salary} key={index} />
      ))}
    </RadioGroup>
  );
};

export default ListSalariesComponent;
