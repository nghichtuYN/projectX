"use client";
import {
  ArrowLeft,
  Calendar,
  CreditCard,
  Clock,
  Briefcase,
  Building,
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
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { formatDateTime, getTimeSince } from "@/lib/utils";
import { useQueryHook } from "@/hooks/useQueryHook";
import {
  getOrderById,
  getOrderIdBusiness,
  getOrderIdJob,
} from "@/services/order";
import { OrderBusiness, OrderJobs, OrderTopUp, ServiceOrder } from "@/types/Order";
import { PaymentMethod } from "@/data/PaymentMethod";
import { useMutationHook } from "@/hooks/useMutationHook";
import {
  createPaymentSePayURl,
  createPaymentVNPayURl,
} from "@/services/payment";
import DialogQrCode from "./DialogQrCode";

const statusMap: Record<0 | 1 | 2, { label: string; className: string }> = {
  0: {
    label: "Highlight",
    className: "bg-yellow-500 text-black hover:bg-yellow-600",
  },
  1: { label: "Urgent", className: "bg-red-600 text-white hover:bg-red-700" },
  2: {
    label: "Hot",
    className: "bg-orange-500 text-white hover:bg-orange-600",
  },
};

const OrderClient = () => {
  const param = useParams();
  const searchParam = useSearchParams();
  const type = searchParam.get("type") || "";
  const id = param.id as string | undefined;
  const [open, setOpen] = useState(false);
  const [qrCode, setQrCode] = useState("");

  if (!id) {
    return <div>ID không hợp lệ</div>;
  }

  const getData = () => {
    if (type === "top-up") {
      return useQueryHook<OrderTopUp>(["order", id], () => getOrderById(id));
    } else if (type === "job") {
      return useQueryHook<OrderJobs>(["order", id], () => getOrderIdJob(id));
    }
    return useQueryHook<OrderBusiness>(["order", id], () =>
      getOrderIdBusiness(id)
    );
  };

  const isTopUp = type === "top-up";
  const isJob = type === "job";
  const isBusiness = !isTopUp && !isJob;

  const { data: orderData } = getData();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

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

  const getOrderStatus = () => {
    // Ví dụ logic trạng thái đơn hàng
    return (
      <Badge
        variant="outline"
        className="bg-green-50 text-green-700 hover:bg-green-50"
      >
        Thành công
      </Badge>
    );
  };

  const renderServices = () => {
    if (isJob && "services" in orderData) {
      const jobOrder = orderData as OrderJobs;

      return (
        <>
          <Separator className="my-4" />
          <div className="space-y-4">
            <h3 className="font-medium">Dịch vụ đã đặt</h3>
            {jobOrder.services.map((service: ServiceOrder) => {
              const status = statusMap[service.type];

              return (
                <div key={service.id} className="flex items-start gap-3">
                  <Briefcase className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">
                      Dịch vụ #{service.id.substring(0, 8)}
                    </p>
                    <div className="flex items-center gap-2">
                      <p>Loại:</p>
                      <Badge key={service.id} className={status.className}>
                        {status.label}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">
                      Trạng thái:{" "}
                      {service.isActive ? "Đang hoạt động" : "Chưa kích hoạt"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      );
    }
    return null;
  };

  // Render business package info
  const renderBusinessPackage = () => {
    if (isBusiness) {
      const businessOrder = orderData as OrderBusiness;
      const { purchasedPackage } = businessOrder;

      return (
        <>
          <Separator className="my-4" />
          <div className="space-y-4">
            <h3 className="font-medium">Gói doanh nghiệp đã đặt</h3>
            <div className="flex items-start gap-3">
              <Building className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">
                  {purchasedPackage.businessPackage.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {purchasedPackage.businessPackage.description}
                </p>
                <div className="mt-2">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm">Cấp độ:</p>
                    <p className="text-sm font-medium">
                      {purchasedPackage.businessPackage.level}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm">Thời hạn:</p>
                    <p className="text-sm font-medium">
                      {purchasedPackage.businessPackage.durationInDays} ngày
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm">Token hàng tháng:</p>
                    <p className="text-sm font-medium">
                      {purchasedPackage.businessPackage.monthlyXTokenRewards.toLocaleString()}{" "}
                      token
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm">Bắt đầu:</p>
                    <p className="text-sm font-medium">
                      {formatDateTime(purchasedPackage.startDate)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm">Kết thúc:</p>
                    <p className="text-sm font-medium">
                      {formatDateTime(purchasedPackage.endDate)}
                    </p>
                  </div>
                </div>
                <p className="mt-2 text-muted-foreground">
                  Trạng thái:{" "}
                  {purchasedPackage.isActive
                    ? "Đang hoạt động"
                    : "Chưa kích hoạt"}
                </p>
              </div>
            </div>
          </div>
        </>
      );
    }
    return null;
  };

  // Hiển thị thông tin token - chỉ cho OrderTopUp
  const renderTokenInfo = () => {
    if (isTopUp) {
      const topUpOrder = orderData as OrderTopUp;
      return (
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Token nhận được</p>
          <p className="text-xl font-semibold">
            {topUpOrder?.amountToken?.toLocaleString()} token
          </p>
        </div>
      );
    }
    return null;
  };

  // Hiển thị tóm tắt giao dịch
  const renderTransactionSummary = () => {
    if (isTopUp) {
      const topUpOrder = orderData as OrderTopUp;
      return (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Tóm tắt giao dịch</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Số tiền thanh toán</span>
              <span>{formatCurrency(topUpOrder?.amountCash)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Phí giao dịch</span>
              <span>{formatCurrency(0)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Token nhận được</span>
              <span>{topUpOrder?.amountToken?.toLocaleString()}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-medium">
              <span>Tổng cộng</span>
              <span>{formatCurrency(topUpOrder?.amountCash)}</span>
            </div>
          </CardContent>
        </Card>
      );
    } else if (isJob && "services" in orderData) {
      // Tóm tắt cho OrderJobs
      const jobOrder = orderData as OrderJobs;
      return (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Tóm tắt đơn hàng dịch vụ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Số tiền thanh toán</span>
              <span>{formatCurrency(jobOrder?.amountCash)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Số lượng dịch vụ</span>
              <span>{jobOrder?.services?.length || 0}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-medium">
              <span>Tổng cộng</span>
              <span>{formatCurrency(jobOrder?.amountCash)}</span>
            </div>
          </CardContent>
        </Card>
      );
    } else if (isBusiness) {
      // Tóm tắt cho OrderBusiness
      const businessOrder = orderData as OrderBusiness;
      const packagePrice =
        businessOrder.purchasedPackage.businessPackage.cashPrice;
      return (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Tóm tắt gói doanh nghiệp</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tên gói</span>
              <span>{businessOrder.purchasedPackage.businessPackage.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Cấp độ</span>
              <span>
                {businessOrder.purchasedPackage.businessPackage.level}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Thời hạn</span>
              <span>
                {businessOrder.purchasedPackage.businessPackage.durationInDays}{" "}
                ngày
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Token hàng tháng</span>
              <span>
                {businessOrder.purchasedPackage.businessPackage.monthlyXTokenRewards.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Giá gói</span>
              <span>{formatCurrency(packagePrice)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-medium">
              <span>Tổng cộng</span>
              <span>
                {formatCurrency(businessOrder.amount || packagePrice)}
              </span>
            </div>
          </CardContent>
        </Card>
      );
    }
    return null;
  };

  // Function to get the appropriate amount to display based on order type
  const getOrderAmount = () => {
    if (isTopUp) {
      return (orderData as OrderTopUp)?.amountCash;
    } else if (isJob) {
      return (orderData as OrderJobs)?.amountCash;
    } else {
      const businessOrder = orderData as OrderBusiness;
      return (
        businessOrder?.amount ||
        businessOrder?.purchasedPackage?.businessPackage?.cashPrice
      );
    }
  };

  if (!orderData) {
    return (
      <div className="container mx-auto py-8 px-4">Đang tải dữ liệu...</div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Button
          variant="ghost"
          size="sm"
          className="gap-1"
          // onClick={handleGoBack}
        >
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
                <CardTitle className="text-xl">
                  {isTopUp
                    ? "Thông tin nạp token"
                    : isJob
                    ? "Thông tin đặt dịch vụ"
                    : "Thông tin gói doanh nghiệp"}
                </CardTitle>
                {getOrderStatus()}
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
                    {formatCurrency(getOrderAmount())}
                  </p>
                </div>
                {renderTokenInfo()}
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

              {renderServices()}
              {renderBusinessPackage()}
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">In hóa đơn</Button>
              <Button onClick={handlePayment}>Tiếp tục thanh toán</Button>
            </CardFooter>
          </Card>
        </div>

        <div>{renderTransactionSummary()}</div>
      </div>
    </div>
  );
};
export default OrderClient;
