import React from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

const SelectTypeSearchComponent = () => {
  return (
    <>
      <div className=" m-3 flex gap-4 ">
        <p className="font-semibold">Tìm kiếm theo:</p>
        <RadioGroup className="flex gap-6 " defaultValue="jobs">
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
