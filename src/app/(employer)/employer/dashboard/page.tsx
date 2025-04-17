'use client'
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatsCards } from "./(component)/StatsCards";
import { Overview } from "./(component)/OverView";
import { TopPositions } from "./(component)/TopPositions";
import { RecentApplications } from "./(component)/RecentApplications";
import EmployerSidebaHeaderComponent from "@/components/EmployerSidebaHeaderComponent";
const DashBoardPage = () => {
  return (
    <>
      <EmployerSidebaHeaderComponent>
        <div className="flex w-full items-center ">
          <p className="text-lg font-semibold text-secondaryColor">
            Bảng điều khiển
          </p>
        </div>
      </EmployerSidebaHeaderComponent>
      <div className="flex min-h-screen w-full flex-col mt-14 pl-8 pr-8">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <StatsCards />
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="bg-white">
              <TabsTrigger value="overview">Tổng quan</TabsTrigger>
              <TabsTrigger value="analytics">Phân tích</TabsTrigger>
              <TabsTrigger value="reports">Báo cáo</TabsTrigger>
              <TabsTrigger value="notifications">Thông báo</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                  <CardHeader>
                    <CardTitle>Biểu đồ ứng tuyển</CardTitle>
                    <CardDescription>
                      Xem xu hướng ứng tuyển trong 30 ngày qua
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview />
                  </CardContent>
                </Card>
                <Card className="lg:col-span-3">
                  <CardHeader>
                    <CardTitle>Những vị trí có nhiều ứng viên nhất</CardTitle>
                    <CardDescription>
                      Các vị trí công việc của bạn được ứng tuyển nhiều nhất
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <TopPositions />
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-7">
                  <CardHeader>
                    <CardTitle>Recent Applications</CardTitle>
                    <CardDescription>
                      You received 24 applications in the last 7 days
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentApplications />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="analytics" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Advanced Analytics</CardTitle>
                  <CardDescription>
                    Detailed metrics and conversion rates for your job listings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] flex items-center justify-center border rounded-md">
                    <p className="text-muted-foreground">
                      Advanced analytics content will appear here
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reports" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Reports</CardTitle>
                  <CardDescription>
                    Download and schedule custom reports
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] flex items-center justify-center border rounded-md">
                    <p className="text-muted-foreground">
                      Reports content will appear here
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="notifications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>
                    Manage how you receive application alerts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] flex items-center justify-center border rounded-md">
                    <p className="text-muted-foreground">
                      Notification settings will appear here
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </>
  );
};

export default DashBoardPage;
