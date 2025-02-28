"use client";
import React from "react";
import DropzoneComponent from "./(components)/DropzoneComponent";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartNoAxesCombined,
  FileHeart,
  MessageSquareText,
  Send,
} from "lucide-react";

const UpLoadCvPage = () => {
  const [files, setFiles] = React.useState<File[]>([]);
  const handleUploadFile = () => {
    //Call api
  };
  return (
    <div className=" items-center flex flex-col bg-accent pb-8">
      <div className="w-3/4 bg-white mt-4  rounded-lg">
        <div className="w-full bg-primaryColor rounded-lg">
          <section className=" mx-auto py-8 p-8 text-white rounded-t-lg bg-thirdColor">
            <p className="font-bold text-[20px]">
              Upload CV để các cơ hội việc làm tự tìm đến bạn
            </p>
            <span className="text-base">
              Giảm đến 50% thời gian cần thiết để tìm được một công việc phù hợp
            </span>
          </section>
        </div>
        <div className="p-8 text-sm flex flex-col gap-3">
          <div className="flex flex-col gap-3">
            <p>
              Bạn đã có sẵn CV của mình, chỉ cần tải CV lên, hệ thống sẽ tự động
              đề xuất CV của bạn tới những nhà tuyển dụng uy tín.
            </p>
            <p>
              Tiết kiệm thời gian, tìm việc thông minh, nắm bắt cơ hội và làm
              chủ đường đua nghề nghiệp của chính mình
            </p>
            <DropzoneComponent files={files} setFiles={setFiles} />
          </div>
          <div className="flex justify-center ">
            <Button onClick={handleUploadFile} className="font-semibold">
              Tải CV lên
            </Button>
          </div>
        </div>
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-3">
          <Card className="flex flex-col items-center justify-center">
            <CardHeader>
              <CardTitle className="flex justify-center">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200">
                  <FileHeart className=" text-green-500 font-semibold" />
                </div>
              </CardTitle>
              <CardDescription className="text-base font-semibold text-black">
                Nhận về các cơ hội tốt nhất
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center pl-8 pr-8">
              <p>
                CV của bạn sẽ được ưu tiên hiển thị với các nhà tuyển dụng đã
                xác thực. Nhận được lời mời với những cơ hội việc làm hấp dẫn từ
                các doanh nghiệp uy tín.
              </p>
            </CardContent>
          </Card>

          <Card className="flex flex-col items-center justify-center">
            <CardHeader>
              <CardTitle className="flex justify-center">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200">
                  <Send className="font-semibold text-blue-500" />
                </div>
              </CardTitle>
              <CardDescription className="text-base font-semibold text-black">
                Chia sẻ CV bất cứ nơi đâu
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center pl-8 pr-8">
              <p>
                Upload một lần và sử dụng đường link gửi tới nhiều nhà tuyển
                dụng.
              </p>
            </CardContent>
          </Card>

          <Card className="flex flex-col items-center justify-center">
            <CardHeader>
              <CardTitle className="flex justify-center">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200">
                  <ChartNoAxesCombined className="font-semibold text-orange-500" />
                </div>
              </CardTitle>
              <CardDescription className="text-base font-semibold text-black">
                Theo dõi số liệu, tối ưu CV
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center pl-8 pr-8">
              <p>
                Theo dõi số lượt xem CV. Biết chính xác nhà tuyển dụng nào trên
                TopCV đang quan tâm đến CV của bạn.
              </p>
            </CardContent>
          </Card>

          <Card className="flex flex-col items-center justify-center">
            <CardHeader>
              <CardTitle className="flex justify-center">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200">
                  <MessageSquareText className="font-semibold  text-red-500" />
                </div>
              </CardTitle>
              <CardDescription className="text-base font-semibold text-black">
                Kết nối nhanh chóng với nhà tuyển dụng
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center pl-8 pr-8">
              <p>
                Dễ dàng kết nối với các nhà tuyển dụng nào xem và quan tâm tới
                CV của bạn
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UpLoadCvPage;
