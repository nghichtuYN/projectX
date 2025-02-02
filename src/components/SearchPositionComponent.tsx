"use client";

import { useState, useRef, useEffect } from "react";
import { Command } from "@/components/ui/command";
import { Input } from "@/components/InputComponent";
import { CommandList } from "cmdk";
import { cn } from "@/lib/utils";

import SelectTypeSearchComponent from "./SelectTypeSearchComponent";
import { PopularKeySearch } from "@/lib/PopularKeySearch";
import PopularKeySearchComponent from "./PopularKeySearchComponent";
import RecentSearchKeyComponent from "./RecentSearchKeyComponent";
import FilterResultComponent from "./FilterResultComponent";
import JobInterestComponent from "./JobInterestComponent";

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
                      <PopularKeySearchComponent
                        PopularKeySearch={PopularKeySearch}
                      />
                    ) : (
                      <RecentSearchKeyComponent
                        clearHistory={clearHistory}
                        setOpen={setOpen}
                        inputRef={inputRef}
                        history={history}
                        setSearch={setSearch}
                        removeHistoryItem={removeHistoryItem}
                      />
                    )
                  ) : (
                    <FilterResultComponent
                      filteredResults={filteredResults}
                      setSearch={setSearch}
                      setOpen={setOpen}
                      inputRef={inputRef}
                    />
                  )}
                </div>

                <div className="lg:w-3/5 mt-2">
                  <JobInterestComponent />
                </div>
              </div>
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
}
