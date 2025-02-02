import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Heart,
  ChevronLeft,
  ChevronRight,
  Info,
  ListFilter,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
const JobBoardComponent = () => {
  return (
    <section className="bg-accent flex flex-col items-center">
      <div className="min-h-screen   w-3/4">
        <header className="border-b">
          <div className="container mx-auto flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-secondaryColor">
                Việc làm tốt nhất
              </h1>
            </div>
            <span>Xem tất cả</span>
          </div>
        </header>
        <div className="lg:flex  lg:items-center border-b ">
          <div className="lg:w-1/4">
            <div className="container mx-auto p-4">
              <div className="flex flex-wrap items-center gap-4">
                <Select>
                  <SelectTrigger className="max-w-64 min-w-36  ">
                    <div className="flex items-center gap-2 text-sm text-gray-500 pr-2">
                      <ListFilter className="w-4 h-4" />
                      <span className="lg:block hidden">Lọc theo:</span>
                    </div>
                    <SelectValue placeholder="Địa điểm" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hanoi">Hà Nội</SelectItem>
                    <SelectItem value="hcm">Hồ Chí Minh</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="lg:w-3/4 flex lg:justify-end ">
            <div className=" flex gap-2  overflow-hidden">
              <Button variant="secondary" className="rounded-full font-medium ">
                Ngẫu Nhiên
              </Button>
              <Button
                variant="default"
                className="rounded-full font-medium  bg-primaryColor"
              >
                Hà Nội
              </Button>
              <Button variant="ghost" className="rounded-full font-medium ">
                Hồ Chí Minh
              </Button>
              <Button variant="ghost" className="rounded-full font-medium ">
                Miền Bắc
              </Button>
              <Button variant="ghost" className="rounded-full font-medium ">
                Miền Nam
              </Button>
            </div>
          </div>
        </div>

        {/* Notification */}
        <div className="container mx-auto p-4">
          <div className="flex items-center gap-2 rounded-lg bg-blue-50 p-4 text-sm text-blue-600">
            <Info className="h-4 w-4" />
            <p>
              Gợi ý: Di chuột vào tiêu đề việc làm để xem thêm thông tin chi
              tiết
            </p>
          </div>
        </div>

        {/* Job Listings */}
        <div className="container mx-auto p-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="p-4">
                  <div className="flex gap-4">
                    <div className="h-16 w-16 flex-shrink-0">
                      <div className="relative h-full w-full overflow-hidden rounded-lg bg-gray-100">
                        <Image
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-XQiivDBn4lbLgDbeMky8ZCoMG61VS3.png"
                          alt="Company logo"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold hover:text-green-600">
                        Chuyên Viên Kinh Doanh/ Tư Vấn Tài Chính
                      </h3>
                      <p className="text-sm text-gray-600">CÔNG TY TNHH ABC</p>
                    </div>
                      <Heart className="h-4 w-4 text-secondaryColor" />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                      Trên 16.8 triệu
                    </span>
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                      Hà Nội
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="container mx-auto p-4">
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "h-8 w-8 rounded-full hover:bg-secondaryColor hover:text-white"
              )}
            >
              <ChevronLeft className="h-4 w-4 " />
            </Button>
            <div className="flex items-center gap-1">
              <span className="text-green-600">1</span>
              <span>/</span>
              <span>9 trang</span>
            </div>
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "h-8 w-8 rounded-full hover:bg-secondaryColor hover:text-white"
              )}
            >
              <ChevronRight className="h-4 w-4 " />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobBoardComponent;
