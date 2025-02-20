import React from "react";
import EmailComponent from "./EmailComponent";
import SocialComponent from "./SocialComponent";
import PhoneComponent from "./PhoneComponent";
import AddressComponent from "./AddressComponent";

const INFOMATION = [
  PhoneComponent,
  EmailComponent,
  SocialComponent,
  AddressComponent,
];
type Props = {
  handleChange: (field: string, value: string) => void;
};
const InfomationComponent = ({ handleChange }: Props) => {
  const [components, setComponents] = React.useState(INFOMATION);

  return (
    <>
      <div className="grid grid-cols-4 gap-1 w-full">
        {components.map((Component, index) => (
          <div key={index}>
            <Component handleChange={handleChange} />
          </div>
        ))}
      </div>
    </>
  );
};

export default InfomationComponent;
