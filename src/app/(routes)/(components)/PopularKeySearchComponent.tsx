import { TrendingUp } from "lucide-react";
import React from "react";
import { ScrollArea } from "../../../components/ui/scroll-area";
type Props = {
  PopularKeySearch: string[];
  setSearch?: React.Dispatch<React.SetStateAction<string>>;
};

const PopularKeySearchComponent = ({ PopularKeySearch }: Props) => {
  return (
    <div className="mt-2 ml-3 ">
      <div>
        <p className="text-lg">Từ khóa phổ biến</p>
      </div>
      <div className="h-5/6">
        <ScrollArea className="h-full">
          {PopularKeySearch?.map((keySearch, index) => (
            <div
              className="flex gap-5 pt-3 lowercase hover:bg-accent"
              key={index}
            >
              <TrendingUp color="brown" size={22} /> {keySearch}
            </div>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
};

export default PopularKeySearchComponent;
