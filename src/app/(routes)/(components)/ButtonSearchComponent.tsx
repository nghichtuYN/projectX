import React from "react";
import { Button } from "../../../components/ui/button";
import { Search } from "lucide-react";

const ButtonSearchComponent = () => {
  return (
    <Button className="lg:p-1 w-4/5 bg-secondaryColor font-semibold text-sm hover:bg-white hover:border-secondaryColor hover:text-secondaryColor rounded-3xl">
      <Search className="sm:hidden block" />
      <p className="hidden md:block">Tìm kiếm</p>
    </Button>
  );
};

export default ButtonSearchComponent;
