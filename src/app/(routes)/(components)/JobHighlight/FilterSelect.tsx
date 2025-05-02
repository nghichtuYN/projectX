import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ListFilter } from "lucide-react";
type Props = {
  filter: string;
  handleFilter: (filter: string) => void;
};
const FilterSelect = ({ filter, handleFilter }: Props) => {
  return (
    <Select onValueChange={handleFilter} value={filter}>
      <SelectTrigger className="max-w-64 min-w-36  ">
        <div className="flex items-center gap-2 text-sm text-gray-500 pr-2">
          <ListFilter className="w-4 h-4" />
          <span className="lg:block hidden">Lọc theo:</span>
        </div>
        <SelectValue placeholder="Địa điểm" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="location">Địa điểm</SelectItem>
        <SelectItem value="salary">Mức lương</SelectItem>
        <SelectItem value="exp">Kinh nghiệm</SelectItem>
        <SelectItem value="major">Ngành nghề</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default FilterSelect;
