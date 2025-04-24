import { Checkbox } from "@/components/ui/checkbox";
import { JobLevel } from "@/types/JobLevelType";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
type Props = {
  level: JobLevel;
};
const LevelComponent = ({ level }: Props) => {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobLevels = searchParams.getAll("jobLevels");
  const handleSelectLevel = useCallback(
    (levelId: string, isSelected: boolean) => {
      const params = new URLSearchParams(searchParams);
      if (isSelected) {
        const updatedLevels = jobLevels.filter((level) => level !== levelId);
        params.delete("jobLevels");
        updatedLevels.forEach((level) => params.append("jobLevels", level));
      } else {
        params.append("jobLevels", levelId);
      }
      router.replace(`${pathName}?${params.toString()}`, { scroll: false });
    },
    [jobLevels, pathName, router, searchParams]
  );
  const isChecked = jobLevels.includes(level?.id);

  return (
    <div className="flex items-center space-x-2 mb-3">
      <Checkbox
        id={level?.id}
        checked={isChecked}
        onCheckedChange={(checked) => {
          handleSelectLevel(level?.id, isChecked);
        }}
      />
      <label
        htmlFor={level?.name}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {level?.name}
      </label>
    </div>
  );
};

export default LevelComponent;
