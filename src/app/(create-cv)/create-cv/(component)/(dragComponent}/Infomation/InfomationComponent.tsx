import React, { useContext } from "react";
import EmailComponent from "./EmailComponent";
import SocialComponent from "./SocialComponent";
import PhoneComponent from "./PhoneComponent";
import AddressComponent from "./AddressComponent";
import { FormType } from "@/types/formCvtype";

const INFOMATION = [
  PhoneComponent,
  EmailComponent,
  SocialComponent,
  AddressComponent,
];
type Props = {
  handleChange: (
    field: keyof FormType,
    value: any,
    subField?: string,
    index?: number
  ) => void;
};
const InfomationComponent = ({ handleChange }: Props) => {
  const [components, setComponents] = React.useState(INFOMATION);

  return (
    <>
      <div className="grid grid-cols-4 gap-1 h-full w-full">
        {components.map((Component, index) => (
          <div key={index}>
            <Component
              index={index}
              length={components?.length}
              handleChange={handleChange}
              setComponents={setComponents}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default InfomationComponent;
