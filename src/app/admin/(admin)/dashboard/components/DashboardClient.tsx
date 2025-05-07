"use client";

import { useState } from "react";
import {
  BriefcaseIcon,
  Building2Icon,
  CalendarIcon,
  DollarSignIcon,
  DownloadIcon,
  MenuIcon,
  PieChartIcon,
  SearchIcon,
  Settings,
  UsersIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const DashboardClient = () => {
  return (
    <div className="pt-14 pl-8 pr-8 w-full">
      <div className="container w-full  mx-auto p-4 space-y-4  bg-accent">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Thống kê doanh thu</h1>
          <div className="flex items-center gap-2">
            <Select defaultValue="month">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Chọn thời gian" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Hôm nay</SelectItem>
                <SelectItem value="week">Tuần này</SelectItem>
                <SelectItem value="month">Tháng này</SelectItem>
                <SelectItem value="quarter">Quý này</SelectItem>
                <SelectItem value="year">Năm nay</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <DownloadIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Tổng doanh thu
              </CardTitle>
              <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,250,000,000 VNĐ</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-500">+12.5%</span> so với tháng
                trước
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Việc làm đã đăng
              </CardTitle>
              <BriefcaseIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-500">+8.2%</span> so với tháng
                trước
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Công ty đăng ký
              </CardTitle>
              <Building2Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">256</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-500">+5.3%</span> so với tháng
                trước
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Ứng viên mới
              </CardTitle>
              <UsersIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3,567</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-500">+15.7%</span> so với tháng
                trước
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <Tabs defaultValue="revenue" className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="revenue">Doanh thu</TabsTrigger>
              <TabsTrigger value="jobs">Việc làm</TabsTrigger>
              <TabsTrigger value="companies">Công ty</TabsTrigger>
            </TabsList>
            <Select defaultValue="line">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Loại biểu đồ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="line">Biểu đồ đường</SelectItem>
                <SelectItem value="bar">Biểu đồ cột</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <TabsContent value="revenue" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Doanh thu theo thời gian</CardTitle>
                <CardDescription>
                  Thống kê doanh thu theo tháng trong năm 2025
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { month: "Tháng 1", revenue: 850000000 },
                        { month: "Tháng 2", revenue: 920000000 },
                        { month: "Tháng 3", revenue: 980000000 },
                        { month: "Tháng 4", revenue: 1100000000 },
                        { month: "Tháng 5", revenue: 1250000000 },
                        { month: "Tháng 6", revenue: 1180000000 },
                        { month: "Tháng 7", revenue: 1300000000 },
                        { month: "Tháng 8", revenue: 1400000000 },
                        { month: "Tháng 9", revenue: 1350000000 },
                        { month: "Tháng 10", revenue: 1450000000 },
                        { month: "Tháng 11", revenue: 1500000000 },
                        { month: "Tháng 12", revenue: 1600000000 },
                      ]}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <XAxis dataKey="month" />
                      <YAxis
                        tickFormatter={(value) =>
                          `${(value / 1000000000).toFixed(1)}B`
                        }
                      />
                      <Tooltip
                        formatter={(value) => [
                          `${value.toLocaleString()} VNĐ`,
                          "Doanh thu",
                        ]}
                      />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#8884d8"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="jobs" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Việc làm đã đăng</CardTitle>
                <CardDescription>
                  Thống kê việc làm đã đăng theo tháng trong năm 2025
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { month: "Tháng 1", jobs: 85 },
                        { month: "Tháng 2", jobs: 92 },
                        { month: "Tháng 3", jobs: 98 },
                        { month: "Tháng 4", jobs: 110 },
                        { month: "Tháng 5", jobs: 125 },
                        { month: "Tháng 6", jobs: 118 },
                        { month: "Tháng 7", jobs: 130 },
                        { month: "Tháng 8", jobs: 140 },
                        { month: "Tháng 9", jobs: 135 },
                        { month: "Tháng 10", jobs: 145 },
                        { month: "Tháng 11", jobs: 150 },
                        { month: "Tháng 12", jobs: 160 },
                      ]}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip
                        formatter={(value) => [`${value}`, "Việc làm"]}
                      />
                      <Bar
                        dataKey="jobs"
                        fill="#82ca9d"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="companies" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Công ty đăng ký</CardTitle>
                <CardDescription>
                  Thống kê công ty đăng ký theo tháng trong năm 2025
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { month: "Tháng 1", companies: 18 },
                        { month: "Tháng 2", companies: 22 },
                        { month: "Tháng 3", companies: 25 },
                        { month: "Tháng 4", companies: 30 },
                        { month: "Tháng 5", companies: 35 },
                        { month: "Tháng 6", companies: 32 },
                        { month: "Tháng 7", companies: 38 },
                        { month: "Tháng 8", companies: 42 },
                        { month: "Tháng 9", companies: 40 },
                        { month: "Tháng 10", companies: 45 },
                        { month: "Tháng 11", companies: 48 },
                        { month: "Tháng 12", companies: 52 },
                      ]}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value}`, "Công ty"]} />
                      <Line
                        type="monotone"
                        dataKey="companies"
                        stroke="#ff7300"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Revenue breakdown */}
        <div className="grid gap-6 md:grid-cols-2 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Doanh thu theo gói dịch vụ</CardTitle>
              <CardDescription>
                Phân tích doanh thu theo các gói dịch vụ
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Gói dịch vụ</TableHead>
                    <TableHead>Số lượng</TableHead>
                    <TableHead className="text-right">Doanh thu</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Gói Cơ bản</TableCell>
                    <TableCell>1,245</TableCell>
                    <TableCell className="text-right">
                      250,000,000 VNĐ
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Gói Nâng cao</TableCell>
                    <TableCell>856</TableCell>
                    <TableCell className="text-right">
                      425,000,000 VNĐ
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Gói Doanh nghiệp
                    </TableCell>
                    <TableCell>432</TableCell>
                    <TableCell className="text-right">
                      575,000,000 VNĐ
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Doanh thu theo ngành nghề</CardTitle>
              <CardDescription>
                Phân tích doanh thu theo các ngành nghề
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ngành nghề</TableHead>
                    <TableHead>Việc làm</TableHead>
                    <TableHead className="text-right">Doanh thu</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">
                      Công nghệ thông tin
                    </TableCell>
                    <TableCell>456</TableCell>
                    <TableCell className="text-right">
                      380,000,000 VNĐ
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Tài chính - Ngân hàng
                    </TableCell>
                    <TableCell>325</TableCell>
                    <TableCell className="text-right">
                      290,000,000 VNĐ
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Marketing</TableCell>
                    <TableCell>287</TableCell>
                    <TableCell className="text-right">
                      215,000,000 VNĐ
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Khác</TableCell>
                    <TableCell>166</TableCell>
                    <TableCell className="text-right">
                      365,000,000 VNĐ
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Recent transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Giao dịch gần đây</CardTitle>
            <CardDescription>
              Danh sách các giao dịch thanh toán gần đây
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Công ty</TableHead>
                  <TableHead>Gói dịch vụ</TableHead>
                  <TableHead>Ngày</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Số tiền</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Công ty ABC</TableCell>
                  <TableCell>Gói Doanh nghiệp</TableCell>
                  <TableCell>05/05/2025</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                      Thành công
                    </span>
                  </TableCell>
                  <TableCell className="text-right">25,000,000 VNĐ</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Công ty XYZ</TableCell>
                  <TableCell>Gói Nâng cao</TableCell>
                  <TableCell>04/05/2025</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                      Thành công
                    </span>
                  </TableCell>
                  <TableCell className="text-right">15,000,000 VNĐ</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Công ty DEF</TableCell>
                  <TableCell>Gói Cơ bản</TableCell>
                  <TableCell>03/05/2025</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800">
                      Đang xử lý
                    </span>
                  </TableCell>
                  <TableCell className="text-right">5,000,000 VNĐ</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Công ty GHI</TableCell>
                  <TableCell>Gói Doanh nghiệp</TableCell>
                  <TableCell>02/05/2025</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                      Thành công
                    </span>
                  </TableCell>
                  <TableCell className="text-right">25,000,000 VNĐ</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Công ty JKL</TableCell>
                  <TableCell>Gói Nâng cao</TableCell>
                  <TableCell>01/05/2025</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-red-100 text-red-800">
                      Thất bại
                    </span>
                  </TableCell>
                  <TableCell className="text-right">15,000,000 VNĐ</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardClient;
