"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Upload } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const ManageCvPage = () => {
  return (
    <div className="lg:pt-3 items-center flex flex-col">
      <div className="w-3/4">
        <div className="grid gap-5 pt-3  grid-cols-3">
          <div className="col-span-2 flex flex-col items-center gap-5">
            <Card className="w-full ">
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  <p>CV đã tạo trên ProjectX</p>
                  <Button
                    onClick={() => redirect("/create-cv")}
                    className="flex items-center gap-2 rounded-xl"
                  >
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
              <CardHeader>
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
                        className="rounded-full"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-2">
                    <p className="text-sm font-normal hover:text-secondaryColor">
                      Chào bạn trở lại,
                    </p>
                    <h3 className="font-semibold hover:text-secondaryColor">
                      Hoàng Đặng
                    </h3>
                    <div className="w-full bg-accent text-xs font-normal p-1">
                      Tài khoản đã xác thực
                    </div>
                  </div>
                </CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCvPage;
