"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ArrowRight, Info, Landmark, Shield, Wallet } from "lucide-react";
import { useState } from "react";
import { useMutationHook } from "@/hooks/useMutationHook";
import { createOrder } from "@/services/order";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


const TopUpClient = () => {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("1");
  const router = useRouter();
  const formatCurrency = (value: string) => {
    if (!value) return "0 ₫";
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(Number.parseInt(value));
  };
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setAmount(value);
  };
  const onSuccess = (data: any) => {
    toast.success(`Thành công! Đơn hàng đã được tạo thành công!`);
    router.push(`/employer/order/${data.id}?type=top-up`);
  };
  const mutaion = useMutationHook((data) => createOrder(data), onSuccess);
  const handleMakeOrder = () => {
    mutaion.mutate({
      amountCash: amount,
      gateway: Number(paymentMethod),
    });
  };
  return (
    <div className="pt-14 pl-8 pr-8 w-full">
      <div className="container mx-auto px-4 py-6">
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
        <div>
          <h2 className="text-xl font-medium">
            <span className="text-secondaryColor text-xl font-normal">
              Nạp X TOKEN
            </span>{" "}
            |{" "}
            <span className="text-gray-800 text-xl font-medium">
              Nhập số tiền hoặc lựa chọn mệnh giá có sẵn
            </span>
          </h2>
          <p className="text-gray-700 mt-1 text-sm font-medium leading-5">
            Nạp X TOKEN là một cách để bạn có thể sở hữu và sử dụng các tính
            năng của ProjectX. Để nạp X TOKEN, bạn có hai cách:{" "}
          </p>
        </div>
        <div className="mt-3 flex items-start gap-2">
          <Card className="w-3/5 h-full">
            <CardHeader>
              <CardTitle>Nhập số tiền</CardTitle>
              <CardDescription>
                Vui lòng nhập số tiền bạn muốn nạp
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Số tiền</Label>
                <div className="relative">
                  <Input
                    id="amount"
                    type="text"
                    value={amount}
                    onChange={handleAmountChange}
                    className="text-lg pr-16"
                    placeholder="0"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    VNĐ
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[10000, 50000, 1000000].map((value) => (
                  <Button
                    key={value}
                    type="button"
                    variant="outline"
                    onClick={() => setAmount(value.toString())}
                    className={cn(
                      "text-sm",
                      Number.parseInt(amount) === value && "border-primary"
                    )}
                  >
                    {formatCurrency(value.toString())}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="overflow-hidden border-violet-200 dark:border-violet-800">
            <CardHeader className="bg-violet-50 dark:bg-violet-950/40">
              <div className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-violet-500" />
                <CardTitle>Phương thức thanh toán</CardTitle>
              </div>
              <CardDescription>
                Vui lòng chọn phương thức thanh toán
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <RadioGroup
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                className="space-y-4"
              >
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

                <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-violet-50 dark:hover:bg-violet-950/30 transition-colors cursor-pointer [&:has(:checked)]:bg-violet-50 dark:[&:has(:checked)]:bg-violet-950/30 [&:has(:checked)]:border-violet-300 dark:[&:has(:checked)]:border-violet-700">
                  <RadioGroupItem value="0" id="0" />
                  <Label
                    htmlFor="0"
                    className="flex items-center cursor-pointer flex-1"
                  >
                    <Wallet className="h-5 w-5 mr-3 text-violet-600 dark:text-violet-400" />
                    <div>
                      <p className="font-medium">Ví điện tử</p>
                      <p className="text-sm text-muted-foreground">
                        Thanh toán qua VNPay...
                      </p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                disabled={!amount || Number.parseInt(amount) < 10000}
                onClick={()=>handleMakeOrder()}
              >
                Tiếp tục <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TopUpClient;
