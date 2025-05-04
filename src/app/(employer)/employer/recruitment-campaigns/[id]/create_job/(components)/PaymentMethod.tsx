import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Landmark, Shield, Wallet } from "lucide-react";
import { Label } from "@/components/ui/label";
type Props = {
  form: any;
};
const PaymentMethod = ({form}:Props) => {
  return (
    <Card className="overflow-hidden border-violet-200 dark:border-violet-800">
      <CardHeader className="bg-violet-50 dark:bg-violet-950/40">
        <div className="flex items-center">
          <Shield className="h-5 w-5 mr-2 text-violet-500" />
          <CardTitle>Phương thức thanh toán</CardTitle>
        </div>
        <CardDescription>Vui lòng chọn phương thức thanh toán</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <RadioGroup
          value={form?.watch("paymentMethod")}
          onValueChange={(value)=>form.setValue("paymentMethod",value)}
          className="space-y-4"
        >
          <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-violet-50 dark:hover:bg-violet-950/30 transition-colors cursor-pointer [&:has(:checked)]:bg-violet-50 dark:[&:has(:checked)]:bg-violet-950/30 [&:has(:checked)]:border-violet-300 dark:[&:has(:checked)]:border-violet-700">
            <RadioGroupItem value="bank-transfer" id="bank-transfer" />
            <Label
              htmlFor="bank-transfer"
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
            <RadioGroupItem value="e-wallet" id="e-wallet" />
            <Label
              htmlFor="e-wallet"
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
        {/* <Button
          className="w-full"
          disabled={!amount || Number.parseInt(amount) < 10000}
          // onClick={() => setStep(2)}
        >
          Tiếp tục <ArrowRight className="ml-2 h-4 w-4" />
        </Button> */}
      </CardFooter>
    </Card>
  );
};

export default PaymentMethod;
