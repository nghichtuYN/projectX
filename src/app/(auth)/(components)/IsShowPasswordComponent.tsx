import { Eye, EyeOff } from "lucide-react";
import React from "react";
type Props = {
  isShowPassword: boolean;
  setIsShowPasswod: (value: React.SetStateAction<boolean>) => void;
};
const IsShowPasswordComponent = ({
  isShowPassword,
  setIsShowPasswod,
}: Props) => {
  return (
    <>
      {!isShowPassword ? (
        <EyeOff
          size={18}
          className="absolute text-secondaryColor top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
          onClick={() => setIsShowPasswod(true)}
        />
      ) : (
        <Eye
          onClick={() => setIsShowPasswod(false)}
          size={18}
          className="absolute text-secondaryColor top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
        />
      )}
    </>
  );
};

export default IsShowPasswordComponent;
