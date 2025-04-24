"use client";
import ListSalariesComponent from "./ListSalariesComponent";
import { Input } from "@/components/ui/input";
import { Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const FilterBySalaryComponent = () => {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const minSalary = searchParams.get("minSalary") || "@";
  const maxSalary = searchParams.get("maxSalary") || "@";
  const [minInput, setMinInput] = useState("");
  const [maxInput, setMaxInput] = useState("");

  const isValidInput = () => {
    const min = parseFloat(minInput);
    const max = parseFloat(maxInput);
    return (
      minInput !== "" &&
      maxInput !== "" &&
      !isNaN(min) &&
      !isNaN(max) &&
      min >= 0 &&
      max > min
    );
  };

  useEffect(() => {
    if (minSalary === "@" && maxSalary === "@") {
      setMinInput("");
      setMaxInput("");
    }
  }, [minSalary, maxSalary]);
  const handleSelectSalary = useCallback(
    (min: string, max: string) => {
      const params = new URLSearchParams(searchParams);
      if (min !== "@") {
        params.set("minSalary", min);
      } else {
        params.delete("minSalary");
      }
      if (max !== "@") {
        params.set("maxSalary", max);
      } else {
        params.delete("maxSalary");
      }
      router.replace(`${pathName}?${params.toString()}`, { scroll: false });
    },
    [pathName, router, searchParams]
  );
  const handleApply = () => {
    if (isValidInput()) {
      handleSelectSalary(minInput, maxInput);
    }
  };

  return (
    <div className="flex flex-col items-start w-full pb-2">
      <div className="w-full text-start">
        <p className="text-sm text-start w-full font-semibold">Mức lương</p>
        <ListSalariesComponent
          minSalary={minSalary}
          maxSalary={maxSalary}
          handleSelectSalary={handleSelectSalary}
        />
      </div>
      <div className="flex items-center gap-2 p-2">
        <div className="w-auto">
          <Input
            className={cn("rounded-full border")}
            placeholder="Từ"
            min={0}
            type="number"
            value={minInput}
            onChange={(e) => setMinInput(e.target.value)}
          />
        </div>
        <Minus />
        <div className="w-auto">
          <Input
            className={cn("rounded-full")}
            placeholder="Đến"
            type="number"
            value={maxInput}
            onChange={(e) => setMaxInput(e.target.value)}
          />
        </div>
        <span className="text-sm text-gray-400">triệu</span>
      </div>
      <div className="flex w-full items-center justify-center">
        <Button
          className="rounded-full"
          disabled={!isValidInput()}
          onClick={handleApply}
        >
          Áp dụng
        </Button>
      </div>
    </div>
  );
};

export default FilterBySalaryComponent;
