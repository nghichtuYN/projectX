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
import TabsComponent from "@/app/(employer)/employer/recruitment-campaigns/[id]/(components)/TabsComponent";
import { useParams, useRouter } from "next/navigation";
import { getDetailCampaigns } from "@/queries/queries";

const CampaignDetailPage = () => {
  const param = useParams();
  const router = useRouter();
  const id = param.id as string | undefined;
  if (!id) {
    return <div>Campaign ID không hợp lệ</div>;
  }
  const { data: campaign } = getDetailCampaigns(id);

  return (
    <>
      <EmployerSidebaHeaderComponent>
        <div className="flex w-full items-center gap-4">
          <Button
            onClick={() => router.push("/employer/recruitment-campaigns")}
            size={"sm"}
          >
            <MoveLeft />
            Quay lại
          </Button>
          <p className="text-sm font-semibold text-secondaryColor">
            {campaign?.name}
          </p>
        </div>
      </EmployerSidebaHeaderComponent>
      <div className="pt-14 pl-8 pr-8 w-full">
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
