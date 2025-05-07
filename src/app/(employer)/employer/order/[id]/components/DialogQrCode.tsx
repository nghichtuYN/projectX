import { Dispatch, SetStateAction, useState } from "react";

import { X, ZoomIn, ZoomOut } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  qrCode: string;
};
const DialogQrCode = ({ open, setOpen, qrCode }: Props) => {
  const [scale, setScale] = useState(1);

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale((prev) => Math.max(prev - 0.25, 0.5));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTitle className="sr-only"></DialogTitle>
      <DialogDescription className="sr-only"></DialogDescription>
      <DialogContent className="sm:max-w-[90vw] max-h-[90vh] p-0 border-none bg-transparent">
        <div className="relative flex items-center justify-center w-full h-full">
          <div
            className="relative overflow-auto bg-black/80 rounded-lg p-2 max-h-[90vh] max-w-[90vw]"
            style={{
              padding: scale > 1 ? "2rem" : "0.5rem",
            }}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full"
              onClick={() => setOpen(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Đóng</span>
            </Button>

            <div className="absolute bottom-2 right-2 z-10 flex space-x-1">
              <Button
                variant="ghost"
                size="icon"
                className="bg-black/50 hover:bg-black/70 text-white rounded-full"
                onClick={handleZoomOut}
                disabled={scale <= 0.5}
              >
                <ZoomOut className="h-4 w-4" />
                <span className="sr-only">Thu nhỏ</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="bg-black/50 hover:bg-black/70 text-white rounded-full"
                onClick={handleZoomIn}
                disabled={scale >= 3}
              >
                <ZoomIn className="h-4 w-4" />
                <span className="sr-only">Phóng to</span>
              </Button>
            </div>

            <div
              className="flex items-center justify-center min-h-[50vh]"
              style={{
                transform: `scale(${scale})`,
                transition: "transform 0.2s ease-in-out",
              }}
            >
              {/* Sử dụng thẻ img thay vì next/image để có thể hiển thị hình ảnh với kích thước đầy đủ */}
              <img
                src={qrCode || "/placeholder.svg"}
                alt={"QR"}
                className="max-h-[80vh] max-w-full object-contain"
                style={{
                  transition: "transform 0.2s ease-in-out",
                }}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogQrCode;
