import React from "react";
import EmailComponent from "./EmailComponent";
import SocialComponent from "./SocialComponent";
import PhoneComponent from "./PhoneComponent";
import AddressComponent from "./AddressComponent";

const INFOMATION = [
  EmailComponent,
  SocialComponent,
  PhoneComponent,
  AddressComponent,
];

const InfomationComponent = () => {
  const [components, setComponents] = React.useState(INFOMATION);

  return (
    <>
      {components.map((Component, index) => (
        <div key={index}>
          <Component  />
        </div>
      ))}
    </>
  );
};

export default InfomationComponent;
