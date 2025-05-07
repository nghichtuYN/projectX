"use client";
import {
  CalendarDays,
  CreditCard,
  Gift,
  Info,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getAllBusinessPackage } from "@/queries/queries";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import DialogSelectGateway from "./DialogSelectGateway";

const ServiceClient = () => {
  const { data: businessPackages } = getAllBusinessPackage();
  const [gateway, setGateway] = useState("0");
  const [selected, selectedPackage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handlePurchase = (id: string) => {
    setIsDialogOpen(true);
    selectedPackage(id);
  };
  return (
    <div className="pt-14 pl-8 pr-8 w-full">
      <div className="container mx-auto px-4 py-6">
        {/* Alert Banner */}
        <Alert className="border-l-4 border-l-blue-500 bg-white mb-6">
          <div className="flex gap-2">
            <Info className="w-6 h-6 text-blue-600" />
            <AlertTitle className="text-blue-600 font-bold text-base">
              Lưu ý quan trọng
            </AlertTitle>
          </div>
          <AlertDescription className="text-gray-700 text-sm">
            Nhằm tránh rủi ro mạo danh và lừa đảo, ProjectX khuyến nghị Quý
            khách hàng không chuyển khoản vào bất cứ tài khoản cá nhân nào và
            chỉ thực hiện thanh toán vào các tài khoản chính thức của chúng tôi
          </AlertDescription>
        </Alert>

        {/* Main Title */}
        <div className="mb-4">
          <h2 className="text-xl font-medium text-secondaryColor">
            X JOBS TRIAL |{" "}
            <span className="text-gray-800">ĐĂNG TIN TUYỂN DỤNG</span>
          </h2>
          <p className="text-gray-700 mt-1">
            Trải nghiệm công hưởng sức mạnh công nghệ tạo ra hiệu quả đột phá
            cho tin tuyển dụng của Doanh nghiệp với chi phí tối ưu
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {businessPackages?.map((bp) => (
            <Card
              key={bp?.id}
              className="w-full max-w-md border-2 hover:shadow-lg transition-shadow"
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl font-bold">
                      {bp?.name}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {bp?.description}
                    </CardDescription>
                  </div>
                  {bp?.level === 0 && (
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200"
                    >
                      Cơ bản
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="flex items-center gap-2 text-sm">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Giá:</span>
                  <span className="font-semibold text-lg ml-auto">
                    {formatCurrency(bp?.cashPrice)} đ
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Thời hạn:</span>
                  <span className="font-medium ml-auto">
                    {bp?.durationInDays} ngày ({bp?.durationInDays / 30} tháng)
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Gift className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    Phần thưởng hàng tháng:
                  </span>
                  <span className="font-medium ml-auto">
                    {bp?.monthlyXTokenRewards} X Token
                  </span>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Mã gói:</span>
                    <span className="font-mono text-xs">
                      {bp?.id.substring(0, 8)}...
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <Button
                  className="w-full"
                  onClick={() => handlePurchase(bp?.id)}
                  size="lg"
                >
                  Mua ngay
                </Button>
              </CardFooter>
            </Card>
          ))}
          <DialogSelectGateway
            id={selected}
            gateway={gateway}
            onOpenChange={setIsDialogOpen}
            setGateway={setGateway}
            open={isDialogOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default ServiceClient;
