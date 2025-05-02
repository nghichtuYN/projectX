import { Form } from "@/components/ui/form";
import { CompanyFormValues } from "./FormCreateCompany";
import { Dispatch, SetStateAction } from "react";
import LogoUpload from "./LogoUpload";
import TaxCode from "./TaxCode";
import CompanyName from "./CompanyName";
import Website from "./Website";
import ShortName from "./ShortName";
import ContactEmail from "./ContactEmail";
import ContactPhone from "./ContactPhone";
import MajorsComponent from "./Major";
import HeadQuarterAddress from "./HeadQuarterAddress";
import SizeCompany from "./SizeCompany";
import LocationsComponent from "@/app/(employer)/employer/recruitment-campaigns/[id]/create_job/(components)/Location/LocationsComponent";
import FoundedYear from "./FoundedYear";
import Introduction from "./Introduction";
import GPDKcomponent from "../GPDKcomponent";
import { Button } from "@/components/ui/button";
type Props = {
  form: any;
  onSubmit: (values: CompanyFormValues) => void;
  setLogoImage: Dispatch<SetStateAction<File[]>>;
  files: File[];
  removeItem: (field: keyof CompanyFormValues, value: string) => void
  setFiles: Dispatch<SetStateAction<File[]>>

};
const FormCompany = ({ form, onSubmit, setLogoImage,removeItem ,files,setFiles}: Props) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 border p-2"
      >
        <LogoUpload form={form} setLogoImage={setLogoImage} />
        <div className="grid grid-cols-2 gap-x-6 gap-y-3">
          <TaxCode form={form} />
          <CompanyName form={form} />
          <Website form={form} />
          <ShortName form={form} />
          <ContactEmail form={form} />
          <ContactPhone form={form} />
          <MajorsComponent form={form} removeItem={removeItem} />
          <HeadQuarterAddress form={form} />
          <SizeCompany form={form} />
          <LocationsComponent form={form} />

          <FoundedYear form={form} />
          <div className="col-span-2">
            <Introduction form={form} />
          </div>
          <div className="col-span-2">
            <GPDKcomponent form={form} files={files} setFiles={setFiles} />
          </div>
        </div>
        <Button
          type="submit"
          className="w-full font-semibold hover:bg-white hover:text-secondaryColor hover:outline-secondaryColor  text-white"
          // disabled={isLoading}
        >
          Lưu
        </Button>
      </form>
    </Form>
  );
};

export default FormCompany;
