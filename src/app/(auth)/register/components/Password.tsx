import FormFieldComponent from "../../(components)/FormFieldComponent";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Lock } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import IsShowPasswordComponent from "../../(components)/IsShowPasswordComponent";
type Props = {
  form: any;
  errors: any;
  isShowPassword: boolean;
  setIsShowPasswod: Dispatch<SetStateAction<boolean>>;
};
const Password = ({
  form,
  errors,
  isShowPassword,
  setIsShowPasswod,
}: Props) => {
  return (
    <FormFieldComponent
      control={form.control}
      name="password"
      icon={Lock}
      label="Mật khẩu"
      requrie={true}
    >
      {(field) => (
        <div className="relative">
          <Input
            className={cn(
              errors.password && "border-red-500 focus-visible:ring-red-500",
              "relative"
            )}
            placeholder="Nhập mật khẩu"
            type={isShowPassword ? "text" : "password"}
            {...field}
          />
          <IsShowPasswordComponent
            isShowPassword={isShowPassword}
            setIsShowPasswod={setIsShowPasswod}
          />
        </div>
      )}
    </FormFieldComponent>
  );
};

export default Password;
