"use client";

import { useState, useRef, useEffect } from "react";

import { Input } from "../../../components/ui/input";
import SearchPopoverComponent from "./SearchPopoverComponent";
import { Search } from "lucide-react";

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
    <div className="">
      <div className="flex items-center rounded-3xl bg-accent ">
        <Search className="hidden md:block h-4 w-4 text-muted-foreground ml-1" />
        <Input
          ref={inputRef}
          placeholder={placeHolderInput}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setOpen(true)}
          className="border-none h-11 focus-visible:ring-0 placeholder:font-medium rounded-3xl "
        />
      </div>

      {open && (
        <SearchPopoverComponent
          commandRef={commandRef}
          search={search}
          clearHistory={clearHistory}
          setOpen={setOpen}
          inputRef={inputRef}
          history={history}
          setSearch={setSearch}
          removeHistoryItem={removeHistoryItem}
          filteredResults={filteredResults}
        />
      )}
    </div>
  );
}
