"use client";

import type React from "react";

import { useRef } from "react";
import { Camera, Building } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
type Props = {
  form?: any;
  setLogoImage: React.Dispatch<React.SetStateAction<File[]>>;
};
export default function LogoUpload({ form, setLogoImage }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <Avatar className="h-20 w-20 border border-gray-200 bg-gray-100">
          <AvatarImage src={form.getValues("logo") || ""} alt="Company logo" />
          <AvatarFallback className="bg-gray-100">
            <Building className="h-12 w-12 text-gray-400" />
          </AvatarFallback>
        </Avatar>
        <div
          className="absolute bottom-0 right-0 bg-gray-600 rounded-full p-2 cursor-pointer hover:bg-gray-700 transition-colors"
          onClick={triggerFileInput}
        >
          <Camera className="h-4 w-4 text-white" />
        </div>

        <Input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>
      <p className="text-sm font-semibold mt-2">Logo công ty</p>
    </div>
  );
}
