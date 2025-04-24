import { Job } from "@/types/Jobs";
import { useRouter } from "next/navigation";
import React, { Dispatch, RefObject, SetStateAction } from "react";

type Props = {
  filteredResults: Job[] | undefined;
  setSearch?: Dispatch<SetStateAction<string>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  inputRef: RefObject<HTMLInputElement | null>;
};
const FilterResultComponent = ({
  filteredResults,
  setSearch,
  setOpen,
  inputRef,
}: Props) => {
  const router = useRouter();
  return filteredResults && filteredResults?.length > 0 ? (
    filteredResults?.map((item) => (
      <div
        key={item?.id}
        onClick={() => {
          setOpen(false);
          inputRef.current?.focus();
          router.push(`/jobs/${item?.id}`);
        }}
        className="cursor-pointer px-3 py-2 hover:bg-gray-100"
      >
        {item?.title}
      </div>
    ))
  ) : (
    <div className="px-3 py-2">Không tìm thấy kết quả</div>
  );
};

export default FilterResultComponent;
