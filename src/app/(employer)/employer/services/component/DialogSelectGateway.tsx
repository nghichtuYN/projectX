"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Landmark, Wallet } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useMutationHook } from "@/hooks/useMutationHook";
import { bussinesUpgrade } from "@/services/business";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
  id: string;
  gateway: string;
  setGateway: Dispatch<SetStateAction<string>>;
  open?: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
};
const DialogSelectGateway = ({
  gateway,
  setGateway,
  open,
  onOpenChange,
  id,
}: Props) => {
  const router = useRouter();
  const onSuccess = (data: any) => {
    toast.success("Tạo đơn hàng thành công");
    onOpenChange(false);
    setGateway("0");
    router.push(`/employer/order/${data.orderId}?type=business`);
  };
  const mutation = useMutationHook(
    (data: { packageId: string; gateway: number }) => bussinesUpgrade(data),
    onSuccess
  );
  const handleConfirm = () => {
    mutation.mutate({
      packageId: id,
      gateway: Number(gateway),
    });
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Chọn phương thức thanh toán</DialogTitle>
          <DialogDescription>
            Vui lòng chọn phương thức thanh toán phù hợp với bạn
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <RadioGroup
            value={gateway}
            onValueChange={(value) => setGateway(value)}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-violet-50 dark:hover:bg-violet-950/30 transition-colors cursor-pointer [&:has(:checked)]:bg-violet-50 dark:[&:has(:checked)]:bg-violet-950/30 [&:has(:checked)]:border-violet-300 dark:[&:has(:checked)]:border-violet-700">
              <RadioGroupItem value="0" id="payment-ewallet" />
              <Label
                htmlFor="payment-ewallet"
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
            <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-violet-50 dark:hover:bg-violet-950/30 transition-colors cursor-pointer [&:has(:checked)]:bg-violet-50 dark:[&:has(:checked)]:bg-violet-950/30 [&:has(:checked)]:border-violet-300 dark:[&:has(:checked)]:border-violet-700">
              <RadioGroupItem value="1" id="payment-bank" />
              <Label
                htmlFor="payment-bank"
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
        <DialogFooter className="flex space-x-2 gap-2 sm:space-x-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange && onOpenChange(false)}
          >
            Hủy
          </Button>
          <Button type="button" onClick={handleConfirm}>
            Xác nhận
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogSelectGateway;
