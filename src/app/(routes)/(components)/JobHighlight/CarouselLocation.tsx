import { Badge } from "@/components/ui/badge";
import { CarouselItem } from "@/components/ui/carousel";
import { useQueryHook } from "@/hooks/useQueryHook";
import { cn } from "@/lib/utils";
import { getAllLocation } from "@/services/location";
import { ListLocations } from "@/types/locations";
type Props = {
  value: string;
  handleChange: (value: string) => void;
};
const CarouselLocation = ({ handleChange, value }: Props) => {
  const {
    data: locations,
  } = useQueryHook<ListLocations>(["LocationId"], () =>
    getAllLocation("", 1, 0)
  );
  return (
    <CarouselItem className="md:flex hidden md:justify-start gap-4">
      <Badge
        onClick={() => handleChange("")}
        className={cn(
          "p-2 text-sm rounded-3xl font-medium bg-white hover:bg-secondaryColor cursor-pointer hover:text-white",
          value === "" ? "bg-secondaryColor text-white" : "text-black"
        )}
      >
        Ngẫu Nhiên
      </Badge>
      {locations?.items.map((location) => (
        <Badge
          onClick={() => handleChange(location?.id)}
          key={location?.id}
          className={cn(
            "p-2 text-sm rounded-3xl font-medium bg-white hover:bg-secondaryColor cursor-pointer hover:text-white",
            value === location?.id
              ? "bg-secondaryColor text-white"
              : "text-black"
          )}
        >
          {location?.name}
        </Badge>
      ))}
    </CarouselItem>
  );
};

export default CarouselLocation;
