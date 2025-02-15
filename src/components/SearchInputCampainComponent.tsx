"use client";
import { Search } from "lucide-react";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
type Props = {
  placeholder?: string;
};
const SearchInputCampainComponent = ({ placeholder }: Props) => {
  const router = useRouter();

  const [searchValue, setSearchValue] = useState("");
  const handleSearchEnter = () => {
    if (searchValue) {
      router.push(`/employer/recruitment-campaigns?search=${searchValue}`);
    }
  };
  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code.toLocaleLowerCase() === "enter" && handleSearchEnter) {
      handleSearchEnter();
    }
  };
  return (
    <div className="flex-1 relative bg-white">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
      <Input
        className="pl-10"
        placeholder={placeholder}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyUp={handleKeyUp}
      />
    </div>
  );
};

export default SearchInputCampainComponent;
