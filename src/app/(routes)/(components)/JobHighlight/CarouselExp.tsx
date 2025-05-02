import { Badge } from "@/components/ui/badge";
import { CarouselItem } from "@/components/ui/carousel";
import { Experiences } from "@/data/Expericence";
import { chunkArray, cn } from "@/lib/utils";
type Props = {
  value: string;
  handleChange: (value: string) => void;
};
const CarouselExp = ({ handleChange, value }: Props) => {
  const expChunks = chunkArray(Experiences || [], 6);
  return (
    <>
      {expChunks.map((chunk, index) => (
        <CarouselItem
          key={index}
          className="md:flex hidden md:justify-start gap-4"
        >
          {chunk.map((exp) => (
            <Badge
              onClick={() => handleChange(exp?.value)}
              key={exp?.value}
              className={cn(
                "p-2 text-sm rounded-3xl font-medium bg-white hover:bg-secondaryColor cursor-pointer hover:text-white",
                value === exp?.value
                  ? "bg-secondaryColor text-white"
                  : "text-black"
              )}
            >
              {exp?.label} 
            </Badge>
          ))}
        </CarouselItem>
      ))}
    </>
  );
};

export default CarouselExp;
