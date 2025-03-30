import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { streamBusiness } from "@/data/steamBusiness";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import React from "react";
import StreamBusinessComponent from "./StreamBusinessComponent";
type Props = {
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  value: string;
};
const ListStreamBusinessComponent = ({ setValue, setOpen, value }: Props) => {
  return (
    <CommandList>
      <CommandEmpty>Không tìm thấy lĩnh vực.</CommandEmpty>
      <CommandGroup>
        {streamBusiness.map((stream) => (
          <StreamBusinessComponent
            key={stream.value}
            value={value}
            setValue={setValue}
            setOpen={setOpen}
            stream={stream}
          />
        ))}
      </CommandGroup>
    </CommandList>
  );
};

export default ListStreamBusinessComponent;
