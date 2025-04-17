"use client";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
type Props = {
  placeholder?: string;
  searchValue: string;
  filterBy: string;
  page: any;
};
const SearchInputCampainComponent = ({
  placeholder,
  searchValue,
  page,
  filterBy,
}: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParam=useSearchParams()
  const [search, setSearch] = useState("");
  useEffect(() => {
    setSearch(searchValue);
  }, [searchValue]);
  const handleSearchEnter = () => {
    const query = new URLSearchParams(searchParam);
    if (search !== searchValue || searchValue === "") {
      query.set("search", search);
      query.set("page", "1");
    } else {
      query.set("search", search);
      query.set("page", page);
    }

    const newUrl = query.toString()
      ? `${pathname}?${query.toString()}`
      : pathname;
    router.replace(newUrl, { scroll: false });
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
        onChange={(e) => setSearch(e.target.value)}
        defaultValue={search}
        onKeyUp={handleKeyUp}
      />
    </div>
  );
};

export default SearchInputCampainComponent;
