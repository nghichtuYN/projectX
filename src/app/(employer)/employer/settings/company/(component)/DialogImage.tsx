import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image, { StaticImageData } from "next/image";
type Props = {
  image: string | StaticImageData;
};
const DialogImage = ({ image }: Props) => {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="relative border w-44 h-32 rounded-lg">
          <Image
            src={image}
            alt="Minh họa giấy phép kinh doanh"
            fill
            className="w-full bg-yellow-50 rounded-lg object-fill"
          />
        </div>
      </DialogTrigger>
      <DialogContent className="h-fit max-w-2xl  p-0">
        <DialogHeader className="sr-only">
          <DialogTitle className="sr-only">
            Minh họa giấy phép kinh doanh
          </DialogTitle>
        </DialogHeader>
        <div className="relative w-full max-w-[672px] aspect-square">
          <Image
            src={image}
            alt="Minh họa giấy phép kinh doanh"
            fill
            className="w-full h-full border rounded-lg bg-yellow-50 object-contain"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogImage;
