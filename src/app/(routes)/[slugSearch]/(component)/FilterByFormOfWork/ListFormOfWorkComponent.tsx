import React from "react";
import { RadioGroup } from "@/components/ui/radio-group";
import { FormOfWork } from "@/data/FormOfWork";
import FormOfWorkComponent from "./FormOfWorkComponent";
const ListFormOfWorkComponent = () => {
  return (
    <RadioGroup className="grid grid-cols-2 p-2 gap-3" defaultValue="all">
      {FormOfWork?.map((formOfWork, index) => (
        <FormOfWorkComponent formOfWork={formOfWork} key={index} />
      ))}
    </RadioGroup>
  );
};

export default ListFormOfWorkComponent;
