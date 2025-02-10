"use client";
import EmployerSidebaHeaderComponent from "@/components/EmployerSidebaHeaderComponent";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MoveLeft } from "lucide-react";
import React from "react";
import TabsComponent from "@/components/TabsComponent";
import { redirect } from "next/navigation";
type Props = {
  id: string;
};
const CampaignDetailPage = ({ id }: Props) => {
  const aaa = async () => {
    return await new Promise((res, rej) => {
      res("Cặc");
    });
  };
  return (
    <>
      <EmployerSidebaHeaderComponent>
        <div className="flex w-full items-center gap-4">
          <Button
            onClick={() => redirect("/employer/recruitment-campaigns")}
            size={"sm"}
          >
            <MoveLeft />
            Quay lại
          </Button>
          <p className="text-sm font-semibold text-secondaryColor">
            Tên chiến dịch
          </p>
        </div>
      </EmployerSidebaHeaderComponent>
      <div className="pt-14 pl-8 pr-8">
        <div className="container  mx-auto p-4 space-y-4  bg-accent">
          <div className=" grid grid-cols-4 gap-4">
            <Card className="rounded-none ">
              <CardHeader>
                <CardDescription>Tổng số lượng CV ứng viên</CardDescription>
                <CardTitle>0</CardTitle>
              </CardHeader>
            </Card>
            <Card className="rounded-none">
              <CardHeader>
                <CardDescription>CV ứng tuyển</CardDescription>
                <CardTitle>0</CardTitle>
              </CardHeader>
            </Card>
            <Card className="rounded-none">
              <CardHeader>
                <CardDescription>CV mở liên hệ</CardDescription>
                <CardTitle>0</CardTitle>
              </CardHeader>
            </Card>
            <Card className="rounded-none">
              <CardHeader>
                <CardDescription>Create project</CardDescription>
                <CardTitle>0</CardTitle>
              </CardHeader>
            </Card>
          </div>
          <div>
            <TabsComponent />
          </div>
        </div>
      </div>
    </>
  );
};

export default CampaignDetailPage;
