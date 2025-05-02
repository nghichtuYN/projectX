import { Badge } from "@/components/ui/badge";
import { CarouselItem } from "@/components/ui/carousel";
import { Salaries } from "@/data/Salary";
import { chunkArray, cn } from "@/lib/utils";
type Props = {
  value: string;
  handleChange: (value: string) => void;
};
const CarouselSalary = ({ handleChange, value }: Props) => {
  const majorChunks = chunkArray(Salaries || [], 6);
  return (
    <>
      {majorChunks.map((chunk, index) => (
        <CarouselItem
          key={index}
          className="md:flex hidden md:justify-start gap-4"
        >

          {chunk.map((salary) => (
            <Badge
              onClick={() => handleChange(salary?.value)}
              key={salary?.value}
              className={cn(
                "p-2 text-sm rounded-3xl font-medium bg-white hover:bg-secondaryColor cursor-pointer hover:text-white",
                value === salary?.value
                  ? "bg-secondaryColor text-white"
                  : "text-black"
              )}
            >
              {salary?.label} 
            </Badge>
          ))}
        </CarouselItem>
      ))}
    </>
  );
};

export default CarouselSalary;
