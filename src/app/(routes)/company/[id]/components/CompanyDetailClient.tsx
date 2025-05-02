"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronRight,
  Globe,
  Users,
  MapPin,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useParams } from "next/navigation";
import { getDetailCompany } from "@/queries/queries";
import { listSizeCompany } from "@/data/SizeCompany";
import { useState } from "react";
import { cn } from "@/lib/utils";

import { Separator } from "@/components/ui/separator";
import RatingComponent from "./RatingComponent";
import { ShareCard } from "./ShareCard";

const CompanyDetailClient = () => {
  const param = useParams();
  const id = param.id as string | undefined;
  const [lineCamp, setLineCamp] = useState(false);
  if (!id) {
    return <div>Campaign ID không hợp lệ</div>;
  }
  const { data: company, isLoading } = getDetailCompany(id);
  if (isLoading) {
    return <div>Loadding</div>;
  }
  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm mb-4 text-gray-700">
        <Link href="#" className="hover:underline">
          Danh sách Công ty
        </Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="text-gray-500">Thông tin {company?.companyName}</span>
      </nav>

      <div className="rounded-lg overflow-hidden border shadow-sm">
        <div className="relative bg-[url('/banner.png')] h-48 md:h-64">
          <div className="absolute bottom-0 left-8 transform translate-y-1/2 bg-white p-2 rounded-lg shadow-md w-32 h-32 flex items-center justify-center">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL_IMAGE}${company?.logo}`}
              alt="Viettel Logo"
              width={100}
              height={100}
              className="object-contain"
            />
          </div>
        </div>

        <div className="bg-secondaryColor text-white p-6 pt-20 md:pt-6 md:pl-48">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 uppercase">
                {company?.companyName}
              </h3>

              <div className="flex flex-col md:flex-row gap-4 md:items-center text-sm">
                {company?.isPro && (
                  <Badge className="bg-amber-400 text-black hover:bg-amber-500 w-fit">
                    Pro Company
                  </Badge>
                )}
                {company?.website && (
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 mr-2" />
                    <span>tuyendung.viettel.vn</span>
                  </div>
                )}
                {company?.size >= 0 && company && (
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    <span>
                      {
                        listSizeCompany?.find(
                          (size) => size.value === company?.size.toString()
                        )?.label
                      }{" "}
                      nhân viên
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="md:col-span-2">
          <div className="bg-secondaryColor text-white p-4 font-medium rounded-t-lg">
            Giới thiệu công ty
          </div>
          <div className="border border-gray-200 p-4 rounded-b-lg bg-white">
            <div
              className={cn(
                "whitespace-pre-line text-gray-700",
                !lineCamp && "line-clamp-[10]"
              )}
              dangerouslySetInnerHTML={{ __html: company?.introduction }}
            />
            <Button
              variant="link"
              className="text-secondaryColor p-0 mt-2 font-medium"
              onClick={() => setLineCamp(!lineCamp)}
            >
              {lineCamp ? (
                <div className="flex items-center gap-2">
                  Thu gọn <ChevronUp className="h-4 w-4 ml-1" />
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  Xem thêm <ChevronDown className="h-4 w-4 ml-1" />
                </div>
              )}
            </Button>
          </div>
        </div>

        {/* Contact Information */}
        <div className="md:col-span-1">
          <div className="bg-secondaryColor text-white p-4 font-medium rounded-t-lg">
            Thông tin liên hệ
          </div>
          <div className="border border-gray-200 p-4 rounded-b-lg bg-white">
            <div className="flex items-start mb-4">
              <MapPin className="h-5 w-5 text-secbg-secondaryColor mt-1 mr-2 flex-shrink-0" />
              <div>
                <h4 className="font-medium">Địa chỉ công ty</h4>
                <p className="text-gray-700 text-sm">
                  {company?.headQuarterAddress}
                </p>
              </div>
            </div>

            <Separator className="my-4" />
            <RatingComponent id={company?.id} />
            {/* Company Rating Section */}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="md:col-span-2"></div>
        <div className="md:col-span-1">
          <ShareCard companyName={company?.companyName} />
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailClient;
