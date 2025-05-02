"use client";

import { useRef } from "react";
import { Camera, Building, ImageIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Props = {
  form?: any;
  setLogoImage: React.Dispatch<React.SetStateAction<File[]>>;
  setBannerImage?: React.Dispatch<React.SetStateAction<File[]>>;
  preCover: string;
  setPreCover: React.Dispatch<React.SetStateAction<string>>;
};

const ImageUpload = ({
  form,
  setLogoImage,
  setBannerImage,
  preCover,
  setPreCover,
}: Props) => {
  const logoInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoImage((prev) => [file]);
      const reader = new FileReader();
      reader.onload = (event) => {
        form.setValue("logo", event.target?.result as string, {
          shouldValidate: true,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && setBannerImage) {
      setBannerImage((prev) => [file]);
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreCover(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerLogoInput = () => {
    logoInputRef.current?.click();
  };

  const triggerBannerInput = () => {
    bannerInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Combined Banner and Logo Upload */}
      <div className="w-full relative">
        {/* Banner Upload */}
        <div
          className={cn(
            "w-full h-40 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer group",
            form.getValues("banner") ? "border-none" : "hover:bg-gray-50"
          )}
          onClick={triggerBannerInput}
        >
          {preCover ? (
            <div className="w-full h-full relative">
              <img
                src={preCover || "/placeholder.svg"}
                alt="Banner preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                <div className="bg-gray-600 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center text-gray-500">
              <ImageIcon className="h-10 w-10 mb-2" />
              <p className="text-sm font-medium">Tải lên ảnh bìa</p>
              <p className="text-xs text-gray-400 mt-1">
                Khuyến nghị kích thước 1200 x 300 px
              </p>
            </div>
          )}

          <Input
            type="file"
            ref={bannerInputRef}
            onChange={handleBannerChange}
            accept="image/*"
            className="hidden"
          />
        </div>

        {/* Logo Upload - Positioned in the center of banner */}
        <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2">
          <div className="relative">
            <Avatar className="h-24 w-24 border-4 border-white bg-white shadow-md">
              <AvatarImage
                src={form.getValues("logo") || ""}
                alt="Company logo"
              />
              <AvatarFallback className="bg-gray-100">
                <Building className="h-12 w-12 text-gray-400" />
              </AvatarFallback>
            </Avatar>
            <div
              className="absolute bottom-0 right-0 bg-gray-600 rounded-full p-2 cursor-pointer hover:bg-gray-700 transition-colors"
              onClick={triggerLogoInput}
            >
              <Camera className="h-4 w-4 text-white" />
            </div>

            <Input
              type="file"
              ref={logoInputRef}
              onChange={handleLogoChange}
              accept="image/*"
              className="hidden"
            />
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="flex justify-center w-full mt-14">
        <p className="text-sm font-semibold">Logo</p>
      </div>
    </div>
  );
};

export default ImageUpload;
