"use client";
import React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Globe, Home, Linkedin, LucideIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "./ui/scroll-area";
type Props = {
  content: { maniContent: string; icon: LucideIcon };
};
const CVPreviewDialogComponent = ({ content }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size="sm"
          className="flex items-center gap-2"
        >
          {content.maniContent}
          {content && <content.icon className="h-4 w-4" />}
        </Button>
        {/* <Button variant="outline">{content}</Button> */}
      </DialogTrigger>
      <DialogContent className="max-w-6xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Mẫu CV Trang trọng
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left side - CV Preview */}
          {/* <div className="bg-[#f5f9fc] col-span-2 p-6 rounded-lg  "> */}
            <ScrollArea className="max-h-[80vh] w-full bg-[#f5f9fc] col-span-2 p-6 rounded-lg">
              <div className="bg-[#e8f3fa] p-4 rounded-lg flex flex-wrap gap-4 text-sm mb-6">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>(024) 6680 5588</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>hotro@topcv.vn</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span>https://fb.com/topcv.vn</span>
                </div>
                <div className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  <span>Số 10, đường 10, TopCV</span>
                </div>
              </div>

              <div className="flex gap-6 mb-8">
                <div className="flex-1">
                  <h1 className="text-4xl font-bold text-[#4d9cd9] mb-2">
                    Nguyễn Văn A
                  </h1>
                  <h2 className="text-xl mb-4">Nhân viên kinh doanh</h2>
                  <p className="text-gray-600">
                    Áp dụng những kinh nghiệm về kỹ năng bán hàng và sự hiểu
                    biết về thị trường để trở thành một nhân viên bán hàng
                    chuyên nghiệp, mang đến nhiều giá tr�� cho khách hàng. Từ đó
                    giúp Công ty tăng số lượng khách hàng và mở rộng tập khách
                    hàng.
                  </p>
                </div>
                <Avatar className="w-32 h-32">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>NA</AvatarFallback>
                </Avatar>
              </div>

              {/* Work Experience */}
              <div className="mb-8">
                <h3 className="text-xl text-[#4d9cd9] font-bold mb-4">
                  KINH NGHIỆM LÀM VIỆC
                </h3>
                <div className="relative border-l-2 border-gray-200 pl-6 space-y-6">
                  <div className="relative">
                    <div className="absolute -left-[25px] top-1 w-4 h-4 bg-[#4d9cd9] rounded-full" />
                    <div>
                      <div className="flex justify-between mb-2">
                        <div>
                          <div className="font-bold">Nhân viên bán hàng</div>
                          <div className="text-gray-600">Công ty TOPCV</div>
                        </div>
                        <div className="text-gray-600">03/2015 - Hiện tại</div>
                      </div>
                      <p className="text-gray-600">
                        - Hỗ trợ viết bài quảng cáo sản phẩm qua kênh facebook,
                        các forum,...
                        <br />- Giới thiệu, tư vấn sản phẩm, giải đáp các vấn đề
                        thắc mắc của khách hàng qua điện thoại và email.
                      </p>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[25px] top-1 w-4 h-4 bg-[#4d9cd9] rounded-full" />
                    <div>
                      <div className="flex justify-between mb-2">
                        <div>
                          <div className="font-bold">Nhân viên bán hàng</div>
                          <div className="text-gray-600">Cửa hàng TOPCV</div>
                        </div>
                        <div className="text-gray-600">06/2014 - 02/2015</div>
                      </div>
                      <p className="text-gray-600">
                        - Bán hàng trực tiếp tại cửa hàng cho người nước ngoài
                        và người Việt.
                        <br />- Quảng bá sản phẩm thông qua các ấn phẩm truyền
                        thông: banner, poster, tờ rơi...
                        <br />- Lập báo cáo sản lượng bán ra hàng ngày.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div className="mb-8">
                <h3 className="text-xl text-[#4d9cd9] font-bold mb-4">
                  HỌC VẤN
                </h3>
                <div className="bg-white rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <div>
                      <div className="font-bold">Đại học TOPCV</div>
                      <div className="text-gray-600">Quản trị Doanh nghiệp</div>
                    </div>
                    <div className="text-gray-600">10/2010 - 05/2014</div>
                  </div>
                  <p className="text-gray-600">
                    Tốt nghiệp loại Giỏi, điểm trung bình 8.0
                  </p>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-8">
                <h3 className="text-xl text-[#4d9cd9] font-bold mb-4">
                  CÁC KỸ NĂNG
                </h3>
                <div className="bg-white rounded-lg p-4 space-y-4">
                  <div>
                    <h4 className="font-bold mb-2">Tin học văn phòng TOPCV</h4>
                    <p className="text-gray-600">
                      - Sử dụng thành thạo các công cụ Word, Excel, Power Point
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Tiếng Anh</h4>
                    <p className="text-gray-600">
                      - Khả năng giao tiếp Tiếng Anh trôi chảy
                    </p>
                  </div>
                </div>
              </div>

              {/* Certificates */}
              <div>
                <h3 className="text-xl text-[#4d9cd9] font-bold mb-4">
                  CHỨNG CHỈ
                </h3>
                <div className="bg-white rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <div className="font-bold">Giải nhất Tài năng TOPCV</div>
                    <div className="text-gray-600">2013</div>
                  </div>
                </div>
              </div>
            </ScrollArea>
            {/* Contact Info */}
          {/* </div> */}

          {/* Right side - Create CV Options */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-green-600 mb-6">
              Bạn muốn tạo CV từ?
            </h3>
            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full justify-start text-left h-auto py-4 px-6"
              >
                <div>
                  <div className="font-medium">Nội dung gợi ý bởi TopCV</div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start text-left h-auto py-4 px-6"
              >
                <div>
                  <div className="font-medium flex items-center gap-2">
                    Tải CV từ máy tính hoặc
                    <Linkedin className="h-5 w-5 text-[#0077b5]" />
                  </div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start text-left h-auto py-4 px-6"
              >
                <div>
                  <div className="font-medium">Khôi phục dữ liệu chưa lưu</div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start text-left h-auto py-4 px-6"
              >
                <div>
                  <div className="font-medium">Tạo CV từ đầu</div>
                </div>
              </Button>

              <Button className="w-full bg-green-500 hover:bg-green-600 mt-8">
                Tạo CV
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CVPreviewDialogComponent;
