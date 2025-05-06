import { FormUpdateInfo } from "./CardUpdateInfo";
import FormFieldComponent from "@/app/(auth)/(components)/FormFieldComponent";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
type Props = {
  form: any;
  onSubmit: (values: FormUpdateInfo) => void;
};
const FormInfo = ({ form, onSubmit }: Props) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
        <FormFieldComponent
          control={form.control}
          name="fullName"
          icon={null}
          label="Họ và tên"
          requrie={true}
        >
          {(field) => <Input placeholder="Nhập họ và tên" {...field} />}
        </FormFieldComponent>
        <FormFieldComponent
          control={form.control}
          name="phone"
          icon={null}
          label="Số điện thoại"
          requrie={true}
        >
          {(field) => <Input placeholder="Nhập số điện thoại" {...field} />}
        </FormFieldComponent>
        <FormFieldComponent
          control={form.control}
          name="email"
          icon={null}
          label="Email"
          requrie={true}
        >
          {(field) => <Input placeholder="Nhập email" readOnly disabled {...field} />}
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

export default FormInfo;
