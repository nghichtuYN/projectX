import { FormChangePasswordValue } from "./CardChangePassword";
import FormFieldComponent from "@/app/(auth)/(components)/FormFieldComponent";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
type Props = {
  form: any;
  onSubmit: (values: FormChangePasswordValue) => void;
};
const FormChangePassword = ({ form, onSubmit }: Props) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
        <FormFieldComponent
          control={form.control}
          name="email"
          icon={null}
          label="Email"
          requrie={true}
        >
          {(field) => (
            <Input placeholder="Nhập email" readOnly disabled {...field} />
          )}
        </FormFieldComponent>
        <FormFieldComponent
          control={form.control}
          name="currentPassword"
          icon={null}
          label="Mật khẩu hiện tại"
          requrie={true}
        >
          {(field) => (
            <Input
              placeholder="Nhập mật khẩu hiện tại"
              type="password"
              {...field}
            />
          )}
        </FormFieldComponent>
        <FormFieldComponent
          control={form.control}
          name="newPassword"
          icon={null}
          label="Mật khẩu mới"
          requrie={true}
        >
          {(field) => (
            <Input placeholder="Nhập mật khẩu mới" type="password" {...field} />
          )}
        </FormFieldComponent>
        <FormFieldComponent
          control={form.control}
          name="confirmPassword"
          icon={null}
          label="Nhập lại mật khẩu"
          requrie={true}
        >
          {(field) => (
            <Input
              placeholder="Nhập lại mật khẩu mới"
              type="password"
              {...field}
            />
          )}
        </FormFieldComponent>
        <Button
          type="submit"
          className="bg-secondaryColor hover:bg-primaryColor text-white w-full"
        >
          Lưu
        </Button>
      </form>
    </Form>
  );
};

export default FormChangePassword;
