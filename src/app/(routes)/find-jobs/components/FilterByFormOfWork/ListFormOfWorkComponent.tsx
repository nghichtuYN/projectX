import React from "react";

import FormOfWorkComponent from "./FormOfWorkComponent";
import { getAllContractType } from "@/queries/queries";
import { ScrollArea } from "@/components/ui/scroll-area";
const ListFormOfWorkComponent = () => {
  const { data: listContractType } = getAllContractType("", 0, 1, true);
  return (
    <ScrollArea className="w-full  mt-2 h-20  pl-2  gap-3">
      <div className="grid grid-cols-2">
        {listContractType?.items?.map((contractType) => (
          <FormOfWorkComponent contractType={contractType} key={contractType?.id} />
        ))}
      </div>
    </ScrollArea>
  );
};

export default ListFormOfWorkComponent;
