import React, { Dispatch, RefObject, SetStateAction } from "react";
import { cn } from "@/lib/utils";

import SelectTypeSearchComponent from "./SelectTypeSearchComponent";
import { PopularKeySearch } from "@/data/PopularKeySearch";
import PopularKeySearchComponent from "./PopularKeySearchComponent";
import RecentSearchKeyComponent from "./RecentSearchKeyComponent";
import FilterResultComponent from "./FilterResultComponent";
import JobInterestComponent from "./JobInterestComponent";
import { ScrollArea } from "../../../components/ui/scroll-area";
type Props = {
  clearHistory: () => void;
  inputRef: RefObject<HTMLInputElement | null>;
  history: string[];
  setSearch: Dispatch<SetStateAction<string>>;
  removeHistoryItem: (item: string) => void;
  filteredResults: { id: number; name: string }[];
  setOpen: Dispatch<SetStateAction<boolean>>;
  search: string;
  commandRef: RefObject<HTMLDivElement | null>;
};
const SearchPopoverComponent = ({
  commandRef,
  search,
  clearHistory,
  setOpen,
  inputRef,
  history,
  setSearch,
  removeHistoryItem,
  filteredResults,
}: Props) => {
  return (
    <>
      <div
        ref={commandRef}
        className={cn(
          "absolute top-full left-0 w-full mt-2 ",
          " bg-white border shadow-lg rounded-2xl z-30 h-[475px] overflow-y-visible"
        )}
      >
        <div className="rounded-3xl">
          <ScrollArea>
            <div className="lg:flex h-[475px] overflow-y-scroll lg:overflow-y-hidden">
              <div className="lg:w-2/5 flex flex-col border-r">
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
          </ScrollArea>
        </div>
      </div>
    </>
  );
};

export default SearchPopoverComponent;
