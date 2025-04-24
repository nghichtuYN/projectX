import React, { useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
type Props = {
  form: any;
  setLogoImage: React.Dispatch<React.SetStateAction<File[]>>;
};
const AvatarComponent = ({ form, setLogoImage }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoImage((prev) => [file]);
      const reader = new FileReader();
      reader.onload = (event) => {
        form.setValue("profilePicture", event.target?.result as string, {
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
    <div className="flex items-center gap-4">
      <p className="text-sm font-medium">Avatar</p>
      <div>
        <Avatar className=" border">
          <AvatarImage
            src={form.getValues("profilePicture") || ""}
            alt="Avatar"
          />
          <AvatarFallback>HD</AvatarFallback>
        </Avatar>
      </div>
      <span
        onClick={triggerFileInput}
        className="bg-gray-50 hover:bg-gray-200 text-black text-sm p-2 rounded-md"
      >
        Đổi avatar
      </span>
      <Input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};

export default AvatarComponent;
