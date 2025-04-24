import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
type Props = {
  keyWord: string;
  onChangeKeyWordVaule: (term: string) => void;
};
const SearchApllication = ({ keyWord, onChangeKeyWordVaule }: Props) => {
  return (
    <div className="w-1/3 pl-1 flex items-center  bg-white border">
      <Search className="h-4 w-4 text-muted-foreground " />
      <Input
        placeholder={"Tìm ứng viên"}
        defaultValue={keyWord}
        onChange={(e) => onChangeKeyWordVaule(e.target.value)}
        className="border-none focus-visible:ring-0 placeholder:font-medium"
      />
    </div>
  );
};

export default SearchApllication;
