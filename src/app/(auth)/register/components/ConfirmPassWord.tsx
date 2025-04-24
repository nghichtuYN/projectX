import FormFieldComponent from "../../(components)/FormFieldComponent";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Lock } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import IsShowPasswordComponent from "../../(components)/IsShowPasswordComponent";
type Props = {
  form: any;
  errors: any;
  isShowConfirmPassword: boolean;
  setIsShowConfirmPasswod: Dispatch<SetStateAction<boolean>>;
};
const ConfirmPassWord = ({
  form,
  errors,
  isShowConfirmPassword,
  setIsShowConfirmPasswod,
}: Props) => {
  return (
    <FormFieldComponent
      control={form.control}
      name="confirmPassword"
      icon={Lock}
      label="Xác nhận mật khẩu"
      requrie={true}
    >
      {(field) => (
        <div className="relative">
          <Input
            className={cn(
              errors.password && "border-red-500 focus-visible:ring-red-500",
              "relative"
            )}
            placeholder="Nhập lại mật khẩu"
            type={isShowConfirmPassword ? "text" : "password"}
            {...field}
          />
          <IsShowPasswordComponent
            isShowPassword={isShowConfirmPassword}
            setIsShowPasswod={setIsShowConfirmPasswod}
          />
        </div>
      )}
    </FormFieldComponent>
  );
};

export default ConfirmPassWord;
