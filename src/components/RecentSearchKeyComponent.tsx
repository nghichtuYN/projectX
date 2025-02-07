import React, { Dispatch, RefObject, SetStateAction } from "react";
import { Button } from "./ui/button";
import { X } from "lucide-react";

type Props = {
  clearHistory: () => void;
  inputRef: RefObject<HTMLInputElement | null>;
  history: string[];
  setSearch: Dispatch<SetStateAction<string>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  removeHistoryItem: (item: string) => void;
};
const RecentSearchKeyComponent = ({
  clearHistory,
  setOpen,
  inputRef,
  history,
  setSearch,
  removeHistoryItem,
}: Props) => {
  return (
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
        <div
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
        </div>
      ))}
    </div>
  );
};

export default RecentSearchKeyComponent;
