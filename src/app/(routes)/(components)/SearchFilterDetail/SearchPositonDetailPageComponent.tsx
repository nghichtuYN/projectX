"use client";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Input } from "../../../../components/ui/input";
import { Job } from "@/types/Jobs";
import SearchPopoverDetail from "./SearchPopoverDetail";

type Props = {
  search: string;
  handleSearch: (term: string) => void;
  jobs: Job[] | undefined;
  companyName: string | null;
  handeCompanyName: (term: string | null) => void;
};
const SearchPositonDetailPageComponent = ({
  search,
  handleSearch,
  jobs,
  companyName,
  handeCompanyName,
}: Props) => {
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
    if (!search?.trim()) return;

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

  return (
    <div className="w-4/6 pl-1 flex items-center border-r-2">
      <Search className="h-4 w-4 text-muted-foreground" />
      <Input
        ref={inputRef}
        onFocus={() => setOpen(true)}
        placeholder={placeHolderInput}
        defaultValue={search}
        onChange={(e) => handleSearch(e.target.value)}
        className="border-none focus-visible:ring-0 placeholder:font-medium"
      />
      {open && (
        <SearchPopoverDetail
          commandRef={commandRef}
          search={search}
          clearHistory={clearHistory}
          setOpen={setOpen}
          inputRef={inputRef}
          history={history}
          companyName={companyName}
          handeCompanyName={handeCompanyName}
          removeHistoryItem={removeHistoryItem}
          filteredResults={jobs}
        />
      )}
    </div>
  );
};

export default SearchPositonDetailPageComponent;
