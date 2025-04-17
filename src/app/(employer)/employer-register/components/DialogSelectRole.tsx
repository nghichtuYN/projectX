import React from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import business from "@/../public/images/business.png";
import freelance from "@/../public/images/freelance.png";
import { Button } from "@/components/ui/button";
type Props = {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setRole: (role: string) => void;
};
const DialogSelectRole = ({
  isDialogOpen,
  setIsDialogOpen,
  setRole,
}: Props) => {
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        className="sm:max-w-[550px] md:max-w-[650px] p-0 overflow-hidden rounded-lg [&>button]:hidden"
      >
        <div className="flex flex-col w-full">
          <div className="p-6 text-center border-b">
            <DialogTitle className="text-2xl font-medium mb-2">
              Chào bạn,Bạn hãy dành ra vài giây để xác nhận thông tin dưới đây
              nhé ! 👋
            </DialogTitle>
            <DialogDescription className="sr-only"></DialogDescription>
          </div>

          <div className="p-6">
            <p className="text-center text-gray-800 mb-8 px-4">
              Để tối ưu tốt nhất cho trải nghiệm của bạn với ProjectX,
              <br />
              vui lòng lựa chọn nhóm phù hợp nhất với bạn.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-8 mb-8">
              {/* Recruiter */}
              <div className="flex flex-col w-1/2 items-center">
                <div className="w-40 h-40 rounded-full bg-blue-50 overflow-hidden mb-4 relative">
                  <Image
                    src={business}
                    alt="Nhà tuyển dụng"
                    width={160}
                    height={160}
                    className=" object-scale-down"
                  />
                </div>
                <Button
                  onClick={() => setRole("Business")}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-6 rounded-full transition-colors"
                >
                  Tôi là nhà tuyển dụng công ty
                </Button>
              </div>

              <div className="flex flex-col w-1/2 items-center">
                <div className="w-40 h-40 rounded-full bg-blue-50 overflow-hidden mb-4 relative">
                  <Image
                    src={freelance}
                    alt="Ứng viên tìm việc"
                    width={160}
                    height={160}
                    className="object-cover"
                  />
                </div>
                <Button
                  onClick={() => setRole("FreelanceRecruiter")}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-6 rounded-full transition-colors"
                >
                  Tôi là nhà tuyển dụng tự do
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogSelectRole;
