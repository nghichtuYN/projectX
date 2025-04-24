import React from "react";
import {
  RadioGroup,
  RadioGroupItem,
} from "../../../../components/ui/radio-group";
import { Label } from "../../../../components/ui/label";
type Props = {
  companyName: string | null;
  handeCompanyName: (term: string | null) => void;
};
const SelectTypeSearchComponent = ({
  companyName,
  handeCompanyName,
}: Props) => {
  const getRadioValue = () => {
    if (companyName === null) return "both";
    if (companyName === "true") return "company";
    return "jobs";
  };
  const handleValueChange = (value: string) => {
    if (value === "both") {
      handeCompanyName(null);
    } else if (value === "company") {
      handeCompanyName("true");
    } else {
      handeCompanyName("false");
    }
  };
  return (
    <>
      <div className=" p-3 flex gap-3 items-center ">
        <p className="font-semibold">Tìm kiếm theo:</p>
        <RadioGroup
          className="grid-cols-3 gap-6 "
          onValueChange={handleValueChange}
          value={getRadioValue()}
        >
          <div className="flex items-center space-x-2 ">
            <RadioGroupItem value="jobs" id="r1" />
            <Label htmlFor="r1">Tên việc làm</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="company" id="r2" />
            <Label htmlFor="r2">Tên Công ty</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="both" id="r3" />
            <Label htmlFor="r3">Cả hai</Label>
          </div>
        </RadioGroup>
      </div>
    </>
  );
};

export default SelectTypeSearchComponent;
