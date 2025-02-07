"use client";
import BreadCrumbComponent from "@/components/BreadCrumbComponent";
import SearchFilterDetailPage from "@/components/SearchFilterDetailPageComponent";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import DOMPurify from "dompurify";
import {
  Box,
  BriefcaseBusiness,
  CircleDollarSign,
  Clock,
  GraduationCap,
  Heart,
  Hourglass,
  MapPin,
  MapPinned,
  Shield,
  SquareArrowOutUpRight,
  User,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ApplicationDialogComponent from "@/components/ApplicationDialogComponent";

const JobDetailPage = () => {
  const jd = `<h3><strong style="background-color: rgb(255, 255, 255); color: rgb(38, 58, 77);">Mô tả công việc</strong></h3><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">Làm nhân viên Phòng Sale Marketing</span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Làm báo cáo khảo sát, lập bảng dự toán bước thiết kế cơ sở, thiết kế bản vẽ thi công căn cứ trên khối lượng đã bóc tách</span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Lập báo giá dự thầu, dự trù chi phí các dự án lĩnh vực cơ khí xây dựng</span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Lấy báo giá các đối tác, nhà cung cấp vật tư, thầu phụ để phục vụ công tác chào giá cho chủ đầu tư</span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Tham gia họp triển khai kiểm soát chi phí khi thi công</span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Phối hợp với các phòng ban trong công ty lập dự toán thi công phối hợp với các phòng ban kiểm soát dự toán thi công</span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Lập và Bóc tách khối lượng vật tư phục vụ công tác thi công tại hiện trường</span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Hoàn thiện hồ sơ thanh quyết toán, hồ sơ quản lý chất lượng, hồ sơ hoàn công</span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Thực hiện các công việc khác theo sự phân công của cấp quản lý</span></p><h3><strong style="background-color: rgb(255, 255, 255); color: rgb(38, 58, 77);">Yêu cầu ứng viên</strong></h3><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Tốt nghiệp Đại học ngành kinh tế xây dựng, ưu tiên trường Đại học Xây dựng, đại học Kiến trúc Hà nội hoặc các trường chính quy khác có ngành đào tạo tương đương </span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Có kinh nghiệm từ 1-2 năm Lập báo giá dự thầu</span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Thành thạo exel, word và phần mềm Auto card</span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Yêu cầu làm việc tại công trình khi cần thiết</span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Cẩn thận,tỉ mỉ,chăm chỉ trong công việc</span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Nhanh nhẹn,giao tiếp,ứng xử tốt,trung thực,nhiệt tình,hình thức ưa nhìn </span></p><h3><strong style="background-color: rgb(255, 255, 255); color: rgb(38, 58, 77);">Quyền lợi</strong></h3><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Lương cơ bản: Thu nhập theo năng lực và kinh nghiệm </span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Thu nhập trên 15 triệu</span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Phụ cấp đi công tác tỉnh theo ngày</span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Thưởng hấp dẫn theo chính sách công ty, các dịp Lễ Tết, đi du lịch 1 năm 1 lần</span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Được hưởng các chế độ theo quy định, được đóng Bảo hiểm đầy đủ, có ngày nghỉ phép</span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Môi trường làm việc năng động chuyên nghiệp</span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Cơ hội học hỏi và được phát triển thêm kỹ năng cần thiết</span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">+ Phụ cấp tiền điện thoại ,xăng xe  + Phụ cấp ăn trưa : Hơn 1 triệu</span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">+ Tiền làm ngoài giờ (nếu có)</span></p><p class="ql-align-justify"><br></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Thời gian thử việc: 1 tháng </span></p><h3><strong style="background-color: rgb(255, 255, 255); color: rgb(38, 58, 77);">Địa điểm làm việc</strong></h3><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">- Hà Nội: Tầng 5-số 109 Trần Quốc Hoàn, Cầu Giấy</span></p><h3><span style="background-color: rgb(255, 255, 255); color: rgb(38, 58, 77);">Thời gian làm việc</span></h3><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(33, 47, 63);">Thứ 2 - thứ 6: Từ 8h00 đến 17h00 Thứ bảy: Từ 8h00 đến 16h00 Nghỉ trưa: Nghỉ 1,5h</span></p><p><br></p>`;
  const [sanitizedHTML, setSanitizedHTML] = useState("");

  useEffect(() => {
    if (jd) {
      // Kiểm tra jd có tồn tại trước khi sanitize
      setSanitizedHTML(DOMPurify.sanitize(jd));
    }
  }, [jd]); // Chỉ chạy khi jd thay đổi
  return (
    <div className="lg:pt-3 items-center flex flex-col">
      <SearchFilterDetailPage />
      <div className="w-3/4">
        <BreadCrumbComponent />
        <div className="grid gap-5 pt-3  grid-cols-3">
          <div className="col-span-2 flex flex-col items-center gap-5">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-ellipsis line-clamp-2">
                  Nhân Viên Kế Toán Tổng Hợp (Nữ, Tối Thiểu Trên 1 Năm Kinh
                  Nghiệm) - Tại Hoàng Mai, HN (Lương 11 - 16 Triệu, Nghỉ Thứ 7 +
                  CN)
                </CardTitle>
                <CardDescription className="flex items-center gap-36 pt-2">
                  <span className="flex items-center gap-2">
                    <div className="rounded-3xl bg-secondaryColor p-2">
                      <CircleDollarSign className="w-6 h-6 text-white " />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-md text-black">Mức lương</p>
                      <span className="font-semibold text-black">
                        11-16 triệu
                      </span>
                    </div>
                  </span>
                  <span className="flex items-center gap-2">
                    <div className="rounded-3xl bg-secondaryColor p-2">
                      <MapPinned className="w-6 h-6 text-white " />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-md text-black">Địa điểm</p>
                      <span className="font-semibold text-black">Hà nội</span>
                    </div>
                  </span>
                  <span className="flex items-center gap-2">
                    <div className="rounded-3xl bg-secondaryColor p-2">
                      <Hourglass className="w-6 h-6 text-white " />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-md text-black">Kinh nghiệm</p>
                      <span className="font-semibold text-black">
                        11-16 triệu
                      </span>
                    </div>
                  </span>
                </CardDescription>
                <CardDescription className="pt-5">
                  <span className="bg-accent flex items-center gap-2 w-1/3">
                    <Clock className="w-4 h-4 text-secondaryColor" />
                    <p>Hạn nộp hồ sơ: 25/02/2025</p>
                  </span>
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex items-center gap-3">
                <div className="w-4/5">
                  <ApplicationDialogComponent />
                </div>
                <Button
                  variant="outline"
                  className="flex items-center font-semibold w-1/5"
                >
                  <Heart />
                  <p>Lưu tin</p>
                </Button>
              </CardFooter>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-lg">Chi tiết tuyển dụng</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="ql-editor"
                  dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
                />
              </CardContent>
              <CardFooter className="flex items-center gap-3">
                <ApplicationDialogComponent />

                <Button
                  variant="outline"
                  className="flex items-center font-semibold "
                >
                  <Heart />
                  <p>Lưu tin</p>
                </Button>
              </CardFooter>
            </Card>
          </div>
          <div className="col-span-1 flex flex-col gap-4">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="flex gap-4">
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
                    <h3 className="font-semibold hover:text-secondaryColor">
                      Tên công ty
                    </h3>
                  </div>
                </CardTitle>
                <CardDescription className="flex flex-col gap-2 ">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-2 w-1/3">
                      <Users className="h-4 w-4" />
                      <p>Quy mô: </p>
                    </span>
                    <p className="w-2/3 text-black text-sm font-medium ">
                      22-99 nhân viên
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-2 w-1/3">
                      <Box className="h-4 w-4" />
                      <p>Lĩnh vực:</p>
                    </span>
                    <p className="w-2/3 text-black text-sm font-medium ">
                      Bất động sản
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-2 w-1/3">
                      <MapPin className="h-4 w-4" />
                      <p>Địa điểm:</p>
                    </span>
                    <p className="text-sm font-medium w-2/3 text-black overflow-hidden text-ellipsis line-clamp-2">
                      Tầng 3, DVTM T3 - 29D Tại Khu C1, Đường Pháp Vân, Phường
                      Hoàng Liệt, Hoàng Mai, Thành phố Hà Nội
                    </p>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-center">
                <Link
                  className="flex items-center justify-center gap-2 text-secondaryColor font-semibold text-sm hover:underline"
                  href={"/"}
                >
                  Xem trang công ty{" "}
                  <SquareArrowOutUpRight className="w-5 h-5" />
                </Link>
              </CardFooter>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="flex gap-4">Thông tin chung</CardTitle>
                <CardDescription className="flex flex-col items-start gap-4 pt-2">
                  <span className="flex  items-center gap-2">
                    <div className="rounded-3xl bg-secondaryColor p-2">
                      <Shield className="w-6 h-6 text-white " />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-md text-black">Cấp bậc</p>
                      <span className="font-semibold text-black">
                        Nhân viên
                      </span>
                    </div>
                  </span>
                  <span className="flex items-center gap-2">
                    <div className="rounded-3xl bg-secondaryColor p-2">
                      <GraduationCap className="w-6 h-6 text-white " />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-md text-black">Học vấn</p>
                      <span className="font-semibold text-black">
                        Cao đăng trở lên
                      </span>
                    </div>
                  </span>
                  <span className="flex items-center gap-2">
                    <div className="rounded-3xl bg-secondaryColor p-2">
                      <Users className="w-6 h-6 text-white " />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-md text-black">Số lượng tuyển</p>
                      <span className="font-semibold text-black">2 người</span>
                    </div>
                  </span>
                  <span className="flex items-center gap-2">
                    <div className="rounded-3xl bg-secondaryColor p-2">
                      <BriefcaseBusiness className="w-6 h-6 text-white " />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-md text-black">Hình thức làm việc</p>
                      <span className="font-semibold text-black">
                        Toàn thời gian
                      </span>
                    </div>
                  </span>
                  <span className="flex items-center gap-2">
                    <div className="rounded-3xl bg-secondaryColor p-2">
                      <User className="w-6 h-6 text-white " />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-md text-black">Giới tính</p>
                      <span className="font-semibold text-black">Nữ</span>
                    </div>
                  </span>
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="flex gap-4">
                  Danh mục nghề liên quan
                </CardTitle>
              </CardHeader>
              <CardHeader>
                <CardTitle className="flex gap-4">Kỹ năng cần có</CardTitle>
              </CardHeader>
              <CardHeader>
                <CardTitle className="flex gap-4">Khu vực</CardTitle>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
