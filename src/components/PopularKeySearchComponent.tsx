import { TrendingUp } from "lucide-react";
import React from "react";
import { ScrollArea } from "./ui/scroll-area";
type Props = {
  PopularKeySearch: string[];
};

const PopularKeySearchComponent = ({ PopularKeySearch }: Props) => {
  return (
    <div className="mt-2 ml-3 ">
      <p className="text-lg">Từ khóa phổ biến</p>
      <ScrollArea className="h-3/4">
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
  );
};

export default PopularKeySearchComponent;
