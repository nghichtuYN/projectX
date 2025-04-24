"use client";

import { useState, useRef, useEffect } from "react";

import { Input } from "../../../../components/ui/input";
import SearchPopoverComponent from "./SearchPopoverComponent";
import { Search } from "lucide-react";
import { useDebounce } from "use-debounce";
import { Job } from "@/types/Jobs";
type Props = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  jobs: Job[];
  companyName: string | null;
  setCompanyName: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function SearchPositionComponent({
  search,
  setSearch,
  jobs,
  setCompanyName,
  companyName,
}: Props) {
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const commandRef = useRef<HTMLDivElement>(null);
  const placeHolderInput = "Vị trí tuyển dụng, tên công ty";
  const [searchTerm] = useDebounce(search, 3000);

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
    if (!searchTerm.trim()) return;

    setHistory((prevHistory) => {
      const updatedHistory = [
        searchTerm,
        ...prevHistory.filter((item) => item !== searchTerm),
      ].slice(0, 5);

      if (JSON.stringify(updatedHistory) !== JSON.stringify(prevHistory)) {
        localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
      }

      return updatedHistory;
    });
  }, [searchTerm]);

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

  return (
    <>
      <div className="flex items-center rounded-3xl bg-white ">
        <Search className="h-4 w-4 text-muted-foreground block xl:hidden" />
        <Input
          ref={inputRef}
          placeholder={placeHolderInput}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setOpen(true)}
          className="border-none h-11 focus-visible:ring-0 placeholder:font-medium rounded-3xl placeholder:overflow-hidden placeholder:text-ellipsis"
        />
      </div>

      {open && (
        <SearchPopoverComponent
          companyName={companyName}
          setCompanyName={setCompanyName}
          commandRef={commandRef}
          search={search}
          clearHistory={clearHistory}
          setOpen={setOpen}
          inputRef={inputRef}
          history={history}
          // setSearch={setSearch}
          removeHistoryItem={removeHistoryItem}
          filteredResults={jobs}
        />
      )}
    </>
  );
}
