"use client";
import { Search } from "lucide-react";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { usePathname, useRouter } from "next/navigation";
type Props = {
  placeholder?: string;
  searchValue: string;
  filterBy: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  page: any;
};
const SearchInputCampainComponent = ({
  placeholder,
  searchValue,
  setSearchValue,
  page,
  filterBy,
}: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleSearchEnter = () => {
    const query = new URLSearchParams();
    query.set("search", searchValue);
    query.set("page", page);
    if (filterBy !== "all") {
      query.set("filter_by", filterBy);
    }
    const newUrl = query.toString()
      ? `${pathname}?${query.toString()}`
      : pathname;
    router.push(newUrl, { scroll: false });
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
        value={searchValue}
        onKeyUp={handleKeyUp}
      />
    </div>
  );
};

export default SearchInputCampainComponent;
