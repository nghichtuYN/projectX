import React, { Dispatch, RefObject, SetStateAction } from "react";

type Props = {
  filteredResults: { id: number; name: string }[];
  setSearch: Dispatch<SetStateAction<string>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  inputRef: RefObject<HTMLInputElement | null>;
};
const FilterResultComponent = ({
  filteredResults,
  setSearch,
  setOpen,
  inputRef,
}: Props) => {
  return filteredResults?.length > 0 ? (
    filteredResults.map((item) => (
      <div
        key={item.id}
        onSelect={() => {
          setSearch(item.name);
          setOpen(false);
          inputRef.current?.focus();
        }}
        className="cursor-pointer px-3 py-2 hover:bg-gray-100"
      >
        {item.name}
      </div>
    ))
  ) : (
    <div  className="px-3 py-2">
      Không tìm thấy kết quả
    </div>
  );
};

export default FilterResultComponent;
