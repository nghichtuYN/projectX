import React from "react";
import { Button } from "../../../components/ui/button";
import { Search } from "lucide-react";
type Props = {
  handleClick: () => void;
};
const ButtonSearchComponent = ({ handleClick }: Props) => {
  return (
    <Button onClick={handleClick} className=" bg-secondaryColor rounded-full">
      <Search className="h-6 w-6 font-semibold  hidden xl:block" />
      <p className="font-semibold text-sm ">Tìm kiếm</p>
    </Button>
  );
};

export default ButtonSearchComponent;
