import React from "react";
import { Input } from "./InputComponent";

const SearchPositionComponent = () => {
  const placeHolderInput = "Vị trí tuyển dụng, tên công ty";

  return (
    <>
      <Input
        type="text"
        placeholder={placeHolderInput}
        className="w-full h-11 rounded-3xl bg-accent p-2"
      />
    </>
  );
};

export default SearchPositionComponent;
