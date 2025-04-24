import { Card } from "@/components/ui/card";
import { listSizeCompany } from "@/data/SizeCompany";
import { getBusinessInfomation } from "@/queries/queries";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const CompanyInfo = () => {
  const { data: bussinesInfo } = getBusinessInfomation();
  console.log(`${bussinesInfo?.company?.logo}`);
  return (
    <Card className="grid grid-cols-2 gap-2 p-2 rounded-none">
      <div className="col-span-2 justify-between">
        <div className=" flex items-center gap-2">
          <Avatar className="w-14 h-14">
            <AvatarImage
              src={`${process.env.NEXT_PUBLIC_API_URL_IMAGE}${bussinesInfo?.company?.logo}`}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="text-sm font-semibold leading-6">
              {bussinesInfo?.company?.companyName}
            </p>
            <p className="text-sm font-medium leading-6 text-gray-600">
              {bussinesInfo?.company?.headQuarterAddress} |
              {
                listSizeCompany?.find(
                  (size) =>
                    Number(size.value) === Number(bussinesInfo?.company?.size)
                )?.label
              }
              nhân viên{" "}
            </p>
            {bussinesInfo?.company?.status === 0 && (
              <Badge className="bg-yellow-500 w-fit ">Đang chờ duyệt</Badge>
            )}
            {bussinesInfo?.company?.status === 1 && (
              <Badge className="bg-green-500 w-fit">Đã xác thực</Badge>
            )}
            {bussinesInfo?.company?.status === 2 && (
              <div className="">
                <Badge className="bg-red-500 w-fit">Bị từ chối</Badge>
                <div>
                  {bussinesInfo?.company?.status === 2 &&
                    !!bussinesInfo?.company.rejectReason && (
                      <div className="flex items-center gap-2 text-sm">
                        <p className="text-sm">Lý do từ chối:</p>
                        <p className="text-sm">
                          {bussinesInfo.company.rejectReason}
                        </p>
                      </div>
                    )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Separator className="my-4 col-span-2" />
      <div className=" grid grid-cols-2 w-full">
        <div>
          <p className="text-sm font-medium">Mã số thuế:</p>
        </div>
        <div>
          <p className="text-sm font-medium">
            {bussinesInfo?.company?.taxCode}
          </p>
        </div>
      </div>
      <div className=" grid grid-cols-2 w-full">
        <p className="text-sm font-medium">Website:</p>
        <p className="text-sm font-medium">
          {!!bussinesInfo?.company?.website
            ? bussinesInfo?.company?.website
            : "--"}
        </p>
      </div>
      <div className=" grid grid-cols-2 w-full">
        <p className="text-sm font-medium">Lĩnh vực hoạt động:</p>
        <div className="flex flex-col w-full">
          {bussinesInfo?.company?.majors.map((major) => (
            <p key={major.id} className="text-xs  gap-1 text-gray-500">
              {major.name}
            </p>
          ))}
        </div>
      </div>
      <div className=" grid grid-cols-2 w-full">
        <p className="text-sm font-medium">Quy mô:</p>
        <p className="text-xs text-gray-500">
          {
            listSizeCompany?.find(
              (size) =>
                Number(size.value) === Number(bussinesInfo?.company?.size)
            )?.label
          }{" "}
          nhân viên
        </p>
      </div>
      <div className=" grid grid-cols-2 w-full">
        <p className="text-sm font-medium">Email:</p>
        <p className="text-sm font-medium">
          {bussinesInfo?.company?.contactEmail}
        </p>
      </div>
      <div className=" grid grid-cols-2 w-full">
        <p className="text-sm font-medium">Số điện thoại:</p>
        <p className="text-sm font-medium">
          {bussinesInfo?.company?.contactPhone}
        </p>
      </div>
      <div className="flex items-center  col-span-2">
        <p className="w-1/4">Địa chỉ:</p>
        <p className="text-sm font-medium">
          {bussinesInfo?.company?.headQuarterAddress}
        </p>
      </div>
      <div className="flex items-start col-span-2">
        <p className="w-1/4 text-sm">Mô tả công ty:</p>
        <div
          className="whitespace-pre-line text-xs"
          dangerouslySetInnerHTML={{
            __html: bussinesInfo?.company?.introduction,
          }}
        />
      </div>
    </Card>
  );
};

export default CompanyInfo;
