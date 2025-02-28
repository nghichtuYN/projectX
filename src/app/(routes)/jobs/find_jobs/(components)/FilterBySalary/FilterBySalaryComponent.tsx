import React from "react";
import ListSalariesComponent from "./ListSalariesComponent";
import { Input } from "@/components/ui/input";
import { Minus } from "lucide-react";
import { Button } from "@/components/ui/button";

const FilterBySalaryComponent = () => {
  return (
    <div className="flex flex-col items-start w-full">
      <div className="w-full text-start">
        <p className="text-sm text-start w-full font-semibold">Mức lương</p>
        <ListSalariesComponent />
      </div>
      <div className="flex items-center gap-2 p-2">
        <div className="w-auto">
          <Input className="rounded-full" placeholder="Từ" type="number" />
        </div>
        <Minus />
        <div className="w-auto">
          <Input className="rounded-full" placeholder="Đến" type="number" />
        </div>
        <span className="text-sm">triệu</span>
      </div>
      <div className="flex w-full items-center justify-center">
        <Button className="rounded-full" disabled>
          Áp dụng
        </Button>
      </div>
    </div>
  );
};

export default FilterBySalaryComponent;
