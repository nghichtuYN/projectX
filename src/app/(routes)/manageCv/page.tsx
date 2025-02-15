"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Upload } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const ManageCvPage = () => {
  return (
    <div className="lg:pt-3 items-center flex flex-col">
      <div className="w-3/4">
        <div className="grid gap-5 pt-3  grid-cols-3">
          <div className="col-span-2 flex flex-col items-center gap-5">
            <Card className="w-full ">
              <CardHeader >
                <CardTitle className="text-lg flex items-center justify-between">
                  <p>CV đã tạo trên ProjectX</p>
                  <Button onClick={()=>redirect("/templateCv")} className="flex items-center gap-2 rounded-xl">
                    <Plus />
                    Tạo mới
                  </Button>
                </CardTitle>
                <CardDescription />
              </CardHeader>
              <CardContent className="p-2 flex flex-col items-center justify-center">
                <div className="h-16 w-16 flex-shrink-0">
                  <div className="relative h-full w-full overflow-hidden rounded-lg bg-gray-100">
                    <Image
                      src="https://github.com/shadcn.png"
                      alt="Company logo"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                Bạn chưa tạo CV nào
              </CardContent>
            </Card>
            <Card className="w-full ">
              <CardHeader >
                <CardTitle className="text-lg flex items-center justify-between">
                  <p>CV đã tải lên ProjectX</p>
                  <Button className="flex items-center gap-2 rounded-xl">
                    <Upload />
                    Tải CV lên
                  </Button>
                </CardTitle>
                <CardDescription />
              </CardHeader>
              <CardContent className="p-2 flex flex-col items-center justify-center">
                <div className="h-16 w-16 flex-shrink-0">
                  <div className="relative h-full w-full overflow-hidden rounded-lg bg-gray-100">
                    <Image
                      src="https://github.com/shadcn.png"
                      alt="Company logo"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                Bạn chưa tạo CV nào
              </CardContent>
            </Card>
           
          </div>
          <div className="col-span-1 flex flex-col gap-4">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="flex gap-4">
                  <div className="h-16 w-16 flex-shrink-0 rounded-3xl">
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
                </Link>
              </CardFooter>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="flex gap-4">Thông tin chung</CardTitle>
                <CardDescription className="flex flex-col items-start gap-4 pt-2"></CardDescription>
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

export default ManageCvPage;
