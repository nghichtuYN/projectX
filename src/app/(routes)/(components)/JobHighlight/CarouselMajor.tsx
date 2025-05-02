import { Badge } from "@/components/ui/badge";
import { CarouselItem } from "@/components/ui/carousel";
import { chunkArray, cn } from "@/lib/utils";
import { getAllMajors } from "@/queries/queries";
import React from "react";
type Props = {
  value: string;
  handleChange: (value: string) => void;
};
const CarouselMajor = ({ handleChange, value }: Props) => {
  const { data: majors } = getAllMajors("", 0, 1, true);
  const majorChunks = chunkArray(majors?.items || [], 4);
  return (
    <>
      {majorChunks.map((chunk, index) => (
        <CarouselItem
          key={index}
          className="md:flex hidden md:justify-start gap-4"
        >
          {index === 0 && (
            <Badge
              onClick={() => handleChange("")}
              className={cn(
                " text-sm rounded-3xl font-medium bg-white hover:bg-secondaryColor cursor-pointer hover:text-white",
                value === "" ? "bg-secondaryColor text-white" : "text-black"
              )}
            >
              Ngẫu Nhiên
            </Badge>
          )}
          {chunk.map((major) => (
            <Badge
              onClick={() => handleChange(major?.id)}
              key={major?.id}
              className={cn(
                " text-sm rounded-3xl font-medium bg-white hover:bg-secondaryColor cursor-pointer hover:text-white",
                value === major?.id
                  ? "bg-secondaryColor text-white"
                  : "text-black"
              )}
            >
              {major?.name}
            </Badge>
          ))}
        </CarouselItem>
      ))}
    </>
  );
};

export default CarouselMajor;
