import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, ChevronLeft, ChevronRight, Info } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../../../components/ui/hover-card";
import { ScrollArea } from "../../../../components/ui/scroll-area";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../../components/ui/carousel";
import FilterSelect from "./FilterSelect";
import CarouselLocation from "./CarouselLocation";
import CarouselExp from "./CarouselExp";
import CarouselSalary from "./CarouselSalary";
import CarouselMajor from "./CarouselMajor";
type Props = {
  value: string;
  handleChange: (value: string) => void;
};
const componentMap: Record<string, React.FC<Props>> = {
  location: CarouselLocation,
  exp: CarouselExp,
  salary: CarouselSalary,
  major: CarouselMajor,
};
const JobBoardComponent = () => {
  const [filter, setFilter] = useState<string>("location");
  const [value, setValue] = useState<string>("");
  const handleChange = (value: string) => {
    setValue(value);
  };
  const Component = componentMap[filter];
  const handleFilter = (filter: string) => {
    setFilter(filter);
  };
  const jd = `<h3><strong style="background-color: rgb(255, 255, 255); color: rgb(38, 58, 77);">Mô tả công việc</strong></h3><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">Làm nhân viên Phòng Sale Marketing</span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Làm báo cáo khảo sát, lập bảng dự toán bước thiết kế cơ sở, thiết kế bản vẽ thi công căn cứ trên khối lượng đã bóc tách</span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Lập báo giá dự thầu, dự trù chi phí các dự án lĩnh vực cơ khí xây dựng</span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Lấy báo giá các đối tác, nhà cung cấp vật tư, thầu phụ để phục vụ công tác chào giá cho chủ đầu tư</span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Tham gia họp triển khai kiểm soát chi phí khi thi công</span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Phối hợp với các phòng ban trong công ty lập dự toán thi công phối hợp với các phòng ban kiểm soát dự toán thi công</span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Lập và Bóc tách khối lượng vật tư phục vụ công tác thi công tại hiện trường</span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Hoàn thiện hồ sơ thanh quyết toán, hồ sơ quản lý chất lượng, hồ sơ hoàn công</span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Thực hiện các công việc khác theo sự phân công của cấp quản lý</span></p><h3><strong style="background-color: rgb(255, 255, 255); color: rgb(38, 58, 77);">Yêu cầu ứng viên</strong></h3><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Tốt nghiệp Đại học ngành kinh tế xây dựng, ưu tiên trường Đại học Xây dựng, đại học Kiến trúc Hà nội hoặc các trường chính quy khác có ngành đào tạo tương đương </span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Có kinh nghiệm từ 1-2 năm Lập báo giá dự thầu</span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Thành thạo exel, word và phần mềm Auto card</span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Yêu cầu làm việc tại công trình khi cần thiết</span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Cẩn thận,tỉ mỉ,chăm chỉ trong công việc</span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Nhanh nhẹn,giao tiếp,ứng xử tốt,trung thực,nhiệt tình,hình thức ưa nhìn </span></p><h3><strong style="background-color: rgb(255, 255, 255); color: rgb(38, 58, 77);">Quyền lợi</strong></h3><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Lương cơ bản: Thu nhập theo năng lực và kinh nghiệm </span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Thu nhập trên 15 triệu</span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Phụ cấp đi công tác tỉnh theo ngày</span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Thưởng hấp dẫn theo chính sách công ty, các dịp Lễ Tết, đi du lịch 1 năm 1 lần</span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Được hưởng các chế độ theo quy định, được đóng Bảo hiểm đầy đủ, có ngày nghỉ phép</span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Môi trường làm việc năng động chuyên nghiệp</span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Cơ hội học hỏi và được phát triển thêm kỹ năng cần thiết</span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">+ Phụ cấp tiền điện thoại ,xăng xe  + Phụ cấp ăn trưa : Hơn 1 triệu</span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">+ Tiền làm ngoài giờ (nếu có)</span></p><p class="ql-align-justify"><br></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Thời gian thử việc: 1 tháng </span></p><h3><strong style="background-color: rgb(255, 255, 255); color: rgb(38, 58, 77);">Địa điểm làm việc</strong></h3><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Hà Nội: Tầng 5-số 109 Trần Quốc Hoàn, Cầu Giấy</span></p><h3><span style="background-color: rgb(255, 255, 255); color: rgb(38, 58, 77);">Thời gian làm việc</span></h3><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(33, 47, 63);">Thứ 2 - thứ 6: Từ 8h00 đến 17h00 Thứ bảy: Từ 8h00 đến 16h00 Nghỉ trưa: Nghỉ 1,5h</span></p><p><br></p>`;
  return (
    <div className="flex flex-col w-3/4 items-center pt-2 justify-center ">
      <div className="max-w-3/4 h-full">
        <div className="border-b pl-2 pr-2">
          <div className="mx-auto flex items-center justify-between w-full pt-2">
            <div className="flex items-center gap-2">
              <h1 className="lg:text-xl text-sm font-bold text-secondaryColor pl-1">
                Việc làm tốt nhất
              </h1>
            </div>
            <span className="lg:text-md text-sm pr-1 ">Xem tất cả</span>
          </div>
        </div>
        <div className="lg:flex lg:items-center justify-between w-full border-b ">
          <div className="lg:max-w-1/4">
            <div className="container mx-auto p-4">
              <div className="flex flex-wrap items-center gap-4">
                <FilterSelect filter={filter} handleFilter={handleFilter} />
              </div>
            </div>
          </div>
          <Carousel className="max-w-[700px] mr-20 ">
            <CarouselContent>
              <Component value={value} handleChange={handleChange} />
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        {/* Notification */}
        <div className="container mx-auto p-4">
          <div className="flex items-center gap-2 rounded-lg bg-blue-50 p-4 text-sm text-blue-600 ">
            <Info className="h-4 w-4" />
            <p
              title="Gợi ý: Di chuột vào tiêu đề việc làm để xem thêm thông tin chi
              tiết"
              className="line-clamp-1 text-ellipsis"
            >
              Gợi ý: Di chuột vào tiêu đề việc làm để xem thêm thông tin chi
              tiết
            </p>
          </div>
        </div>

        {/* Job Listings */}
        <div className="container mx-auto p-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <div className="p-4">
                  <div className="flex gap-4 items-center">
                    <div className="lg:h-16 lg:w-16 w-10 h-10 flex-shrink-0">
                      <div className="relative h-full w-full overflow-hidden rounded-lg bg-gray-100">
                        <Image
                          src="https://img.vietqr.io/image/bidv-96247020720003-compact.png?amount=50000.00&addInfo=PAY064d096059ea4b569932e21fe8ce16d3&accountName=ProjectX"
                          alt="Company logo"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <Link
                            href={`/jobs/${0}`}
                            className="text-xs md:text-lg font-semibold text-ellipsis line-clamp-2 hover:text-secondaryColor"
                          >
                            Chuyên Viên Kinh Doanh/ Tư Vấn Tài Chính
                          </Link>
                        </HoverCardTrigger>
                        <HoverCardContent className=" w-96  h-[500px]  rounded-md">
                          <div>
                            <div className="flex gap-4 ">
                              <div className="h-16 w-16 flex-shrink-0">
                                <div className="relative h-full w-full rounded-lg bg-gray-100">
                                  <Image
                                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-XQiivDBn4lbLgDbeMky8ZCoMG61VS3.png"
                                    alt="Company logo"
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              </div>
                              <div className="flex-1 ">
                                <h3 className="font-semibold hover:text-secondaryColor">
                                  Chuyên Viên Kinh Doanh/ Tư Vấn Tài Chính
                                </h3>
                                <p className="text-sm text-gray-600">
                                  CÔNG TY TNHH ABC
                                </p>
                                <div className="mt-4 flex flex-wrap gap-2">
                                  <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                                    Trên 16.8 triệu
                                  </span>
                                  <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                                    Hà Nội
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <ScrollArea className="h-4/6 w-full">
                            <div
                              style={{ whiteSpace: "pre-line" }}
                              dangerouslySetInnerHTML={{ __html: jd }}
                            />
                          </ScrollArea>
                          <div className="flex w-full gap-2 mt-2 shadow-md ">
                            <Link className="w-1/3" href={`/jobs/${i}`}>
                              <Button
                                className="w-full text-secondaryColor font-semibold border-secondaryColor hover:bg-secondaryColor hover:text-white"
                                variant={"outline"}
                              >
                                Ứng tuyển
                              </Button>
                            </Link>
                            <Button className="w-2/3 font-semibold hover:bg-white hover:text-secondaryColor hover:outline-secondaryColor border-collapse ">
                              Xem chi tiết
                            </Button>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                      <p className="text-xs md:text-md text-ellipsis line-clamp-1 text-gray-600">
                        CÔNG TY TNHH ABC
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1">
                      <span className="text-xs md:text-sm rounded-full bg-gray-100 px-3 py-1 ">
                        Trên 16.8 triệu
                      </span>
                      <span className="text-xs md:text-sm rounded-full bg-gray-100 px-3 py-1 ">
                        Hà Nội
                      </span>
                    </div>
                    <Heart className="md:h-5 md:w-5 h-4 w-4 text-secondaryColor  " />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className=" mx-auto p-3">
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "h-8 w-8 rounded-full hover:bg-secondaryColor hover:text-white text-secondaryColor border-secondaryColor"
              )}
            >
              <ChevronLeft className="h-5 w-5 " />
            </Button>
            <div className="flex items-center gap-1">
              <span className="text-secondaryColor">1</span>
              <span>/</span>
              <span>9 trang</span>
            </div>
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "h-8 w-8 rounded-full hover:bg-secondaryColor hover:text-white text-secondaryColor border-secondaryColor"
              )}
            >
              <ChevronRight className="h-5 w-5  " />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobBoardComponent;
