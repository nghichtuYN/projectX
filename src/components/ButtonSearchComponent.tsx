import React from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

const ButtonSearchComponent = () => {
  return (
    <div className="mr-3">
      <Button className="lg:p-1 bg-secondaryColor font-semibold hover:bg-white hover:border-secondaryColor hover:text-secondaryColor rounded-2xl">
        <Search className="h-5 w-5" />
        <div className="hidden md:block ">Tìm kiếm</div>
      </Button>
    </div>
  );
};

export default ButtonSearchComponent;
