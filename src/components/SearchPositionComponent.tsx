"use client";

import { useState, useRef, useEffect } from "react";
import { Command, CommandItem } from "@/components/ui/command";
import { Input } from "@/components/InputComponent";
import { CommandList } from "cmdk";
import { cn } from "@/lib/utils";

import SelectTypeSearchComponent from "./SelectTypeSearchComponent";
import { PopularKeySearch } from "@/lib/PopularKeySearch";
import { TrendingUp, X } from "lucide-react";
import JobCardComponent from "./JobCardComponent";
import { Button } from "./ui/button";

const searchData = [
  { id: 1, name: "iPhone 15 Pro" },
  { id: 2, name: "MacBook Pro M3" },
  { id: 3, name: "iPad Air 2024" },
  { id: 4, name: "Apple Watch Ultra 2" },
  { id: 5, name: "AirPods Pro 2" },
];

export default function SearchPositionComponent() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const commandRef = useRef<HTMLDivElement>(null);
  const placeHolderInput = "Vị trí tuyển dụng, tên công ty";
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        commandRef.current &&
        !commandRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    const storedHistory = JSON.parse(
      localStorage.getItem("searchHistory") || "[]"
    );
    setHistory(storedHistory);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!search.trim()) return;

    setHistory((prevHistory) => {
      const updatedHistory = [
        search,
        ...prevHistory.filter((item) => item !== search),
      ].slice(0, 5);

      if (JSON.stringify(updatedHistory) !== JSON.stringify(prevHistory)) {
        localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
      }

      return updatedHistory;
    });
  }, [search]);

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("searchHistory");
  };

  const removeHistoryItem = (item: string) => {
    const updatedHistory = history.filter((h) => h !== item);
    setHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    setOpen(true);
  };

  const filteredResults = searchData.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className=" pr-6">
      <Input
        ref={inputRef}
        placeholder={placeHolderInput}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setOpen(true)}
        className="w-full  h-11 rounded-3xl bg-accent md:p-2 "
      />

      {open && (
        <div
          ref={commandRef}
          className={cn(
            "absolute top-full left-0 w-full mt-2 ",
            " bg-white border shadow-lg rounded-3xl z-30 h-[475px] overflow-y-visible"
          )}
        >
          <Command className="rounded-3xl">
            <CommandList>
              <div className="lg:flex h-[475px] overflow-y-scroll lg:overflow-y-hidden">
                <div className="lg:w-2/5 border-r">
                  <SelectTypeSearchComponent />
                  <hr />
                  {search === "" ? (
                    history?.length < 1 ? (
                      <div className="mt-2 ml-3">
                        <p className="text-lg">Từ khóa phổ biến</p>
                        {PopularKeySearch?.map((keySearch, index) => (
                          <div
                            className="flex gap-5 pt-3 lowercase hover:bg-accent"
                            key={index}
                          >
                            <TrendingUp color="brown" size={22} /> {keySearch}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div>
                        <div className="flex justify-between items-center p-2 text-sm text-gray-500">
                          Từ khóa tìm kiếm gần đây
                          <span
                            onClick={() => {
                              clearHistory();
                              setOpen(true);
                            }}
                            className=" bg-white text-center text-red-500 py-2 "
                          >
                            Xóa tất cả
                          </span>
                        </div>
                        {history.map((item) => (
                          <CommandItem
                            key={item}
                            onSelect={() => {
                              setSearch(item);
                              inputRef.current?.focus();
                            }}
                            className="flex justify-between cursor-pointer px-3 py-2 hover:bg-gray-100"
                          >
                            {item}
                            <Button
                              className="bg-white border-none outline-none shadow-none text-gray-500 hover:text-red-500 hover:bg-white"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeHistoryItem(item);
                              }}
                            >
                              <X />
                            </Button>
                          </CommandItem>
                        ))}
                      </div>
                    )
                  ) : filteredResults?.length > 0 ? (
                    filteredResults.map((item) => (
                      <CommandItem
                        key={item.id}
                        onSelect={() => {
                          setSearch(item.name);
                          setOpen(false);
                          inputRef.current?.focus();
                        }}
                        className="cursor-pointer px-3 py-2 hover:bg-gray-100"
                      >
                        {item.name}
                      </CommandItem>
                    ))
                  ) : (
                    <CommandItem disabled className="px-3 py-2">
                      Không tìm thấy kết quả
                    </CommandItem>
                  )}
                </div>

                {/* Cột Kết quả tìm kiếm */}
                <div className="lg:w-3/5 mt-2">
                  <p className="text-lg ml-2">Việc làm có thể bạn quan tâm</p>
                  <div className="md:h-[475px] m-3 md:overflow-y-scroll">
                    <JobCardComponent
                      companyImage="a"
                      jD="aaaaaaaaaaa"
                      jobSalary="12222222"
                      posistion="Leader"
                    />
                    <JobCardComponent
                      companyImage="a"
                      jD="aaaaaaaaaaa"
                      jobSalary="12222222"
                      posistion="Leader"
                    />
                    <JobCardComponent
                      companyImage="a"
                      jD="aaaaaaaaaaa"
                      jobSalary="12222222"
                      posistion="Leader"
                    />
                    <JobCardComponent
                      companyImage="a"
                      jD="aaaaaaaaaaa"
                      jobSalary="12222222"
                      posistion="Leader"
                    />
                    <JobCardComponent
                      companyImage="a"
                      jD="aaaaaaaaaaa"
                      jobSalary="12222222"
                      posistion="Leader"
                    />
                    <JobCardComponent
                      companyImage="a"
                      jD="aaaaaaaaaaa"
                      jobSalary="12222222"
                      posistion="Leader"
                    />
                    <JobCardComponent
                      companyImage="a"
                      jD="aaaaaaaaaaa"
                      jobSalary="12222222"
                      posistion="Leader"
                    />
                  </div>
                </div>
              </div>
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
}
