import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { BadgeDollarSign, CreditCard, Landmark, Wallet } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useQueryHook } from "@/hooks/useQueryHook";
import { getAllService } from "@/services/service";
import { Service } from "@/types/Services";

type Props = {
  form: any;
};

const PaymentMethod = ({ form }: Props) => {
  const serviceIds = form.getValues("serviceIds") as string[] | undefined; // 0: VnPay (mặc định)
  const { data: services } = useQueryHook<Service[]>(
    ["jobServices"],
    getAllService
  );
  const [totalAmount, setTotalAmount] = useState({
    token: 0,
    cash: 0,
  });

  useEffect(() => {
    if (services && serviceIds && serviceIds.length > 0) {
      // Tính tổng số tiền/token dựa trên dịch vụ đã chọn
      const selectedServices = services.filter((service) =>
        serviceIds.includes(service.id)
      );
      const tokenAmount = selectedServices.reduce(
        (sum, service) => sum + (service.xTokenPrice || 0),
        0
      );
      const cashAmount = selectedServices.reduce(
        (sum, service) => sum + (service.cashPrice || 0),
        0
      );

      setTotalAmount({
        token: tokenAmount,
        cash: cashAmount,
      });
    }
  }, [serviceIds, services, form]);

  if (!serviceIds || serviceIds.length === 0) {
    return null;
  }
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };
  const handlePaymentMethodChange = (value: string) => {
    form.setValue("paymentMethod", value, { shouldValidate: true });
    if (value !== "1") {
      form.setValue("gateway", "", { shouldValidate: true });
    }
  };

  const handleGatewayChange = (value: string) => {
    form.setValue("gateway", value, { shouldValidate: true });
  };

  return (
    <div className="container mx-auto">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Chọn Phương Thức Thanh Toán</CardTitle>
          <CardDescription>
            Vui lòng chọn phương thức thanh toán bạn muốn sử dụng
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup
            value={form.getValues("paymentMethod")}
            onValueChange={handlePaymentMethodChange}
            className="grid grid-cols-1 gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="0" id="xtoken" />
              <Label
                htmlFor="xtoken"
                className="flex items-center space-x-2 cursor-pointer p-3 rounded-md border border-gray-200 w-full"
              >
                <BadgeDollarSign className="h-5 w-5 text-blue-500" />
                <div className="flex-1">
                  <p className="font-medium">XToken</p>
                  <p className="text-sm text-gray-500">
                    Thanh toán bằng XToken
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-blue-600">
                    {totalAmount.token.toLocaleString()} Token
                  </p>
                </div>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1" id="cash" />
              <Label
                htmlFor="cash"
                className="flex items-center space-x-2 cursor-pointer p-3 rounded-md border border-gray-200 w-full"
              >
                <Wallet className="h-5 w-5 text-green-500" />
                <div className="flex-1">
                  <p className="font-medium">Tiền mặt</p>
                  <p className="text-sm text-gray-500">
                    Thanh toán bằng tiền mặt
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-green-600">
                    {formatCurrency(totalAmount.cash)}
                  </p>
                </div>
              </Label>
            </div>
          </RadioGroup>
          {form.getValues("paymentMethod") === "1" && (
            <div className="pt-4 border-t">
              <h3 className="text-sm font-medium mb-3">
                Chọn cổng thanh toán:
              </h3>
              <RadioGroup
                value={form.getValues("gateway")}
                onValueChange={handleGatewayChange}
                className="grid grid-cols-1 gap-4"
              >
                <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-violet-50 dark:hover:bg-violet-950/30 transition-colors cursor-pointer [&:has(:checked)]:bg-violet-50 dark:[&:has(:checked)]:bg-violet-950/30 [&:has(:checked)]:border-violet-300 dark:[&:has(:checked)]:border-violet-700">
                  <RadioGroupItem value="0" id="0" />
                  <Label
                    htmlFor="0"
                    className="flex items-center cursor-pointer flex-1"
                  >
                    <CreditCard className="h-5 w-5 mr-3 text-violet-600 dark:text-violet-400" />
                    <div>
                      <p className="font-medium">Ví điện tử</p>
                      <p className="text-sm text-muted-foreground">
                        Thanh toán qua VNPay...
                      </p>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-violet-50 dark:hover:bg-violet-950/30 transition-colors cursor-pointer [&:has(:checked)]:bg-violet-50 dark:[&:has(:checked)]:bg-violet-950/30 [&:has(:checked)]:border-violet-300 dark:[&:has(:checked)]:border-violet-700">
                  <RadioGroupItem value="1" id="1" />
                  <Label
                    htmlFor="1"
                    className="flex items-center cursor-pointer flex-1"
                  >
                    <Landmark className="h-5 w-5 mr-3 text-violet-600 dark:text-violet-400" />
                    <div>
                      <p className="font-medium">Chuyển khoản ngân hàng</p>
                      <p className="text-sm text-muted-foreground">
                        Chuyển khoản trực tiếp đến tài khoản của chúng tôi
                      </p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Hiển thị tổng tiền chi tiết */}
          <div className="pt-4 border-t">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium">Tổng thanh toán:</p>
              <p className="font-semibold text-lg">
                {form.getValues("paymentMethod") === "0"
                  ? `${totalAmount.token.toLocaleString()} Token`
                  : formatCurrency(totalAmount.cash)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentMethod;
