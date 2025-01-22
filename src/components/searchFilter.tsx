import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
const SearchFilter = () => {
  return (
    <div className="container mx-auto px-32 py-8 bg-searchBackground">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="relative md:col-span-5">
          <Input
            type="text"
            placeholder="Position, company name"
            className="w-full pl-4 pr-12 h-12 rounded-lg bg-white"
          />
          <Button className="absolute right-0 top-0 h-full px-6 bg-red-500 hover:bg-red-600 rounded-l-none">
            <Search className="h-5 w-5" />
            <span className="ml-2">Search</span>
          </Button>
        </div>

        <Select>
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hanoi">Ha Noi</SelectItem>
            <SelectItem value="hcm">Ho Chi Minh</SelectItem>
            <SelectItem value="danang">Da Nang</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fresher">Fresher</SelectItem>
            <SelectItem value="junior">Junior</SelectItem>
            <SelectItem value="senior">Senior</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Major" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="frontend">Frontend</SelectItem>
            <SelectItem value="backend">Backend</SelectItem>
            <SelectItem value="fullstack">Fullstack</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Contract Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fulltime">Full Time</SelectItem>
            <SelectItem value="parttime">Part Time</SelectItem>
            <SelectItem value="contract">Contract</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" className="w-full bg-white">
          Reset filter
        </Button>
      </div>
    </div>
  );
};

export default SearchFilter;
