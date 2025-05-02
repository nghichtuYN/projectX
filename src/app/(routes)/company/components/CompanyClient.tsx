"use client";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import ListCompany from "./ListCompany";
import { useState } from "react";
import { useDebounce } from "use-debounce";

const CompanyClient = () => {
  const [search, setSearch] = useState<string>("");
  const [debounceSearch] = useDebounce(search, 500);
  const [pageSize, setPageSize] = useState(12);
  const handlePageSizeChange = () => {
    setPageSize((prev) => prev + 12);
  };
  return (
    <div className="flex flex-col items-center pb-8">
      <div className="w-full flex justify-center mx-auto py-8 bg-gradient-to-br from-fourthColor to-hoverColor">
        <div className="w-3/4">
          <p className="text-sm font-semibold">Danh sách công ty</p>
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-12">
            <div className="max-w-2xl">
              <h1 className="text-2xl font-medium leading-7 mt-3 text-secondaryColor mb-4">
                Khám phá 100.000+ công ty nổi bật
              </h1>
              <p className="text-black mb-8 text-sm font-normal">
                Tra cứu thông tin công ty và tìm kiếm nơi làm việc tốt nhất dành
                cho bạn
              </p>
              <div className="flex w-full max-w-xl bg-white rounded-md">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Nhập tên công ty"
                    className="pl-10 rounded-r-none border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
                <Button className="rounded-l-none bg-secondaryColor hover:bg-secondaryColor">
                  Tìm kiếm
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16 w-4/5">
        <h2 className="text-2xl font-bold text-center mb-10">
          DANH SÁCH CÁC CÔNG TY NỔI BẬT
        </h2>
        <ListCompany search={debounceSearch} pageSize={pageSize} />
      </div>
      <Button onClick={handlePageSizeChange}>Xem thêm</Button>
    </div>
  );
};

export default CompanyClient;
