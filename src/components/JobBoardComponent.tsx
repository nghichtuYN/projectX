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
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import DOMPurify from "dompurify";

const JobBoardComponent = () => {
  const jd = `<h3><strong style="background-color: rgb(255, 255, 255); color: rgb(38, 58, 77);">Mô tả công việc</strong></h3><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">Làm nhân viên Phòng Sale Marketing</span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Làm báo cáo khảo sát, lập bảng dự toán bước thiết kế cơ sở, thiết kế bản vẽ thi công căn cứ trên khối lượng đã bóc tách</span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Lập báo giá dự thầu, dự trù chi phí các dự án lĩnh vực cơ khí xây dựng</span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Lấy báo giá các đối tác, nhà cung cấp vật tư, thầu phụ để phục vụ công tác chào giá cho chủ đầu tư</span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Tham gia họp triển khai kiểm soát chi phí khi thi công</span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Phối hợp với các phòng ban trong công ty lập dự toán thi công phối hợp với các phòng ban kiểm soát dự toán thi công</span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Lập và Bóc tách khối lượng vật tư phục vụ công tác thi công tại hiện trường</span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Hoàn thiện hồ sơ thanh quyết toán, hồ sơ quản lý chất lượng, hồ sơ hoàn công</span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Thực hiện các công việc khác theo sự phân công của cấp quản lý</span></p><h3><strong style="background-color: rgb(255, 255, 255); color: rgb(38, 58, 77);">Yêu cầu ứng viên</strong></h3><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Tốt nghiệp Đại học ngành kinh tế xây dựng, ưu tiên trường Đại học Xây dựng, đại học Kiến trúc Hà nội hoặc các trường chính quy khác có ngành đào tạo tương đương </span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Có kinh nghiệm từ 1-2 năm Lập báo giá dự thầu</span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Thành thạo exel, word và phần mềm Auto card</span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Yêu cầu làm việc tại công trình khi cần thiết</span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Cẩn thận,tỉ mỉ,chăm chỉ trong công việc</span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Nhanh nhẹn,giao tiếp,ứng xử tốt,trung thực,nhiệt tình,hình thức ưa nhìn </span></p><h3><strong style="background-color: rgb(255, 255, 255); color: rgb(38, 58, 77);">Quyền lợi</strong></h3><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Lương cơ bản: Thu nhập theo năng lực và kinh nghiệm </span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Thu nhập trên 15 triệu</span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Phụ cấp đi công tác tỉnh theo ngày</span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Thưởng hấp dẫn theo chính sách công ty, các dịp Lễ Tết, đi du lịch 1 năm 1 lần</span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Được hưởng các chế độ theo quy định, được đóng Bảo hiểm đầy đủ, có ngày nghỉ phép</span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Môi trường làm việc năng động chuyên nghiệp</span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Cơ hội học hỏi và được phát triển thêm kỹ năng cần thiết</span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">+ Phụ cấp tiền điện thoại ,xăng xe  + Phụ cấp ăn trưa : Hơn 1 triệu</span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">+ Tiền làm ngoài giờ (nếu có)</span></p><p class="ql-align-justify"><br></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Thời gian thử việc: 1 tháng </span></p><h3><strong style="background-color: rgb(255, 255, 255); color: rgb(38, 58, 77);">Địa điểm làm việc</strong></h3><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Hà Nội: Tầng 5-số 109 Trần Quốc Hoàn, Cầu Giấy</span></p><h3><span style="background-color: rgb(255, 255, 255); color: rgb(38, 58, 77);">Thời gian làm việc</span></h3><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(33, 47, 63);">Thứ 2 - thứ 6: Từ 8h00 đến 17h00 Thứ bảy: Từ 8h00 đến 16h00 Nghỉ trưa: Nghỉ 1,5h</span></p><p><br></p>`;
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
              <Card key={i}>
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
                    <div className="flex-1 relative">
                      {" "}
                      {/* Thêm relative ở đây để HoverCardContent có thể sử dụng absolute */}
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <h3 className="font-semibold hover:text-green-600">
                            Chuyên Viên Kinh Doanh/ Tư Vấn Tài Chính
                          </h3>
                        </HoverCardTrigger>
                        <HoverCardContent className="ml-20 w-96 h-[500px] end-3  overflow-y-scroll  absolute rounded-md">
                          <div className="">
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
                                <h3 className="font-semibold hover:text-green-600">
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
                            <div
                              className="ql-editor overflow-y-scroll pt-11"
                              dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(jd),
                              }}
                            />
                          </div>
                        </HoverCardContent>
                      </HoverCard>
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
