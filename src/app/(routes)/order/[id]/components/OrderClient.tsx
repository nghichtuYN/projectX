'use client'
import { ArrowLeft, Calendar, CreditCard, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useParams, useRouter } from "next/navigation";
import { formatCurrency, formatDateTime, getTimeSince } from "@/lib/utils";
import { useQueryHook } from "@/hooks/useQueryHook";
import { getOrderById } from "@/services/order";
import { OrderTopUp } from "@/types/Order";
import { PaymentMethod } from "@/data/PaymentMethod";
import { useMutationHook } from "@/hooks/useMutationHook";
import {
  createPaymentSePayURl,
  createPaymentVNPayURl,
} from "@/services/payment";
import { useState } from "react";
import DialogQrCode from "@/app/(employer)/employer/order/[id]/components/DialogQrCode";
const OrderClient = () => {
  const param = useParams();
  const router = useRouter();
  const id = param.id as string | undefined;
  if (!id) {
    return <div>ID không hợp lệ</div>;
  }
  const [open, setOpen] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const { data: orderData } = useQueryHook<OrderTopUp>(["order", id], () =>
    getOrderById(id)
  );

  const onSuccesSePay = (data: any) => {
    setQrCode(data.paymentQRCode);
    setOpen(true);
  };

  const onSuccesVNPay = (data: any) => {
    window.open(data.paymentUrl, "_blank");
  };

  const mutation = useMutationHook(
    (data: { orderId: string }) => createPaymentVNPayURl(data),
    onSuccesVNPay
  );

  const mutationSePay = useMutationHook(
    (data: { orderId: string }) => createPaymentSePayURl(data),
    onSuccesSePay
  );

  const handlePayment = () => {
    if (orderData?.gateway === 1) {
      mutationSePay.mutate({
        orderId: orderData?.id,
      });
    } else {
      mutation.mutate({
        orderId: orderData?.id,
      });
    }
  };
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Button variant="ghost" size="sm" className="gap-1">
          <ArrowLeft className="h-4 w-4" />
          Quay lại
        </Button>
        <DialogQrCode open={open} setOpen={setOpen} qrCode={qrCode} />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Thông tin đơn hàng</CardTitle>
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 hover:bg-green-50"
                >
                  Thành công
                </Badge>
              </div>
              <CardDescription>
                Mã đơn hàng: {orderData?.id.substring(0, 8)}...
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Số tiền</p>
                  <p className="text-xl font-semibold">
                    {formatCurrency(orderData?.amountCash)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    Token nhận được
                  </p>
                  <p className="text-xl font-semibold">
                    {orderData?.amountToken.toLocaleString()} token
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CreditCard className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Phương thức thanh toán</p>
                    <p className="text-muted-foreground">
                      {
                        PaymentMethod.find(
                          (payment) => payment.value === orderData?.gateway
                        )?.labels
                      }
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Ngày tạo</p>
                    <p className="text-muted-foreground">
                      {formatDateTime(orderData?.created)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {getTimeSince(orderData?.created)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Cập nhật lần cuối</p>
                    <p className="text-muted-foreground">
                      {formatDateTime(orderData?.modified)}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">In hóa đơn</Button>
              <Button onClick={handlePayment}>Tiếp tục thanh toán</Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tóm tắt giao dịch</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Số tiền thanh toán
                </span>
                <span>{formatCurrency(orderData?.amountCash)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phí giao dịch</span>
                <span>{formatCurrency(0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Token nhận được</span>
                <span>{orderData?.amountToken.toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Tổng cộng</span>
                <span>{formatCurrency(orderData?.amountCash)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderClient;
