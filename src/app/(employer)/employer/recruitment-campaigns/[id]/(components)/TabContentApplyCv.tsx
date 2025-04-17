import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import React from "react";
import * as XLSX from "xlsx";

type TabContentApplyCvProps = {
  keyWord: string;
  quickFilter: string;
  label: string;
  onChangeKeyWordVaule: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeQuickFilterValue: (value: string) => void;
  onChangeLabelValue: (value: string) => void;
};
const TabContentApplyCv = ({
  keyWord,
  quickFilter,
  label,
  onChangeKeyWordVaule,
  onChangeLabelValue,
  onChangeQuickFilterValue,
}: TabContentApplyCvProps) => {
  const handleExport = () => {
    const data = [
      { name: "John Doe", email: "john@example.com" },
      { name: "Jane Doe", email: "jane@example.com" },
    ];
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "CV List");
    XLSX.writeFile(workbook, "CV_List.xlsx");
  };
  return (
    <div className="flex items-center gap-2 pt-2 pl-2 pr-2 w-full">
      <div className="w-2/3 flex  items-center gap-2  ">
        <div className="w-1/3 pl-1 flex items-center  bg-white border">
          <Search className="h-4 w-4 text-muted-foreground " />
          <Input
            placeholder={"Tìm ứng viên"}
            value={keyWord}
            onChange={onChangeKeyWordVaule}
            className="border-none focus-visible:ring-0 placeholder:font-medium"
          />
        </div>
        <Select onValueChange={onChangeQuickFilterValue} defaultValue="all">
          <SelectTrigger className="w-1/3">
            <SelectValue placeholder="Hiển thị tất cả" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Hiển thị tất cả</SelectItem>
            <SelectItem value="notViewed">Chỉ hiển thị CV chưa xem</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={onChangeLabelValue}>
          <SelectTrigger className="w-1/3">
            <SelectValue placeholder="Tất cả nhãn" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="is_not_label">Chưa gắn nhãn</SelectItem>
            <SelectItem value="1">Ưu tiền</SelectItem>
            <SelectItem value="2">Hiển thị tất cả</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-end w-1/3">
        <Button
          variant={"outline"}
          className="boder border-secondaryColor rounded-3xl text-secondaryColor pr-6"
          onClick={handleExport}
        >
          Xuất danh sách CV
        </Button>
      </div>
    </div>
  );
};

export default TabContentApplyCv;
