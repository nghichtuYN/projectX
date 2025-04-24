import React, { useCallback, useEffect, useState } from "react";
import ListExperiencesComponent from "./ListExperiencesComponent";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Minus } from "lucide-react";
import { Button } from "@/components/ui/button";

const FilterByExperienceComponent = () => {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const minExp = searchParams.get("minExp") || "@";
  const maxExp = searchParams.get("maxExp") || "@";
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
    if (minExp === "@" && maxExp === "@") {
      setMinInput("");
      setMaxInput("");
    }
  }, [minExp, maxExp]);
  const handleSelectExp = useCallback(
    (min: string, max: string) => {
      const params = new URLSearchParams(searchParams);
      if (min !== "@") {
        params.set("minExp", min);
      } else {
        params.delete("minExp");
      }
      if (max !== "@") {
        params.set("maxExp", max);
      } else {
        params.delete("maxExp");
      }
      router.replace(`${pathName}?${params.toString()}`, { scroll: false });
    },
    [pathName, router, searchParams]
  );
  const handleApply = () => {
    if (isValidInput()) {
      handleSelectExp(minInput, maxInput);
    }
  };
  return (
    <div className="flex flex-col items-start w-full pb-2">
      <div className="w-full text-start">
        <p className="text-sm text-start w-full font-semibold">Kinh nghiệm</p>
        <ListExperiencesComponent
          minExp={minExp}
          maxExp={maxExp}
          handleSelectExp={handleSelectExp}
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
        <span className="text-sm text-gray-400">năm</span>
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

export default FilterByExperienceComponent;
