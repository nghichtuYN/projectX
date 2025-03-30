import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Skeleton } from "@/components/ui/skeleton";
import { Skills } from "@/types/skills";
import React from "react";
import SkillComponent from "./SkillComponent";
type Props = {
  skills: Skills[] | undefined;
  isLoading: boolean;
  isFetching: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  field: any;
};
const ListSkillsComponent = ({
  skills,
  isLoading,
  isFetching,
  field,
}: Props) => {
  return (
    <CommandList>
      {isLoading || isFetching ? (
        <CommandGroup>
          <CommandItem>
            <Skeleton className="w-full" />
          </CommandItem>
          <CommandItem>
            <Skeleton className="w-full" />
          </CommandItem>
          <CommandItem>
            <Skeleton className="w-full" />
          </CommandItem>
          <CommandItem>
            <Skeleton className="w-full" />
          </CommandItem>
        </CommandGroup>
      ) : !skills || skills.length === 0 ? (
        <CommandEmpty>Không tìm thấy loại công việc</CommandEmpty>
      ) : (
        <CommandGroup>
          {skills.map((skill) => (
            <SkillComponent key={skill.id} skill={skill} field={field} />
          ))}
        </CommandGroup>
      )}
    </CommandList>
  );
};

export default ListSkillsComponent;
