import React from "react";
type Props = {
  handleChange: (field: string, value: string) => void;
};
const ReferencerComponent = ({ handleChange }: Props) => {
  return <div>ReferencerComponent</div>;
};

export default ReferencerComponent;
