import { ScrollArea } from "@/components/ui/scroll-area";
import { BusinessVerification } from "@/types/BusinessVerification";
import React from "react";
type Props = {
  row: BusinessVerification;
};
const IntroductionColumn = ({ row }: Props) => {
  return (
    <div className="flex flex-col items-start">
      <ScrollArea className="w-full h-[100px] ">
        <div
          className="whitespace-pre-line text-xs"
          dangerouslySetInnerHTML={{ __html: row.company.introduction }}
        />
      </ScrollArea>
    </div>
  );
};

export default IntroductionColumn;
