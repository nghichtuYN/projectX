import { Form } from "@/components/ui/form";
import React, { Dispatch, SetStateAction } from "react";
import LogoUpload from "./FormCreateCompany/LogoUpload";
import TaxCode from "./FormCreateCompany/TaxCode";
import CompanyName from "./FormCreateCompany/CompanyName";
import Website from "./FormCreateCompany/Website";
import ShortName from "./FormCreateCompany/ShortName";
import ContactEmail from "./FormCreateCompany/ContactEmail";
import ContactPhone from "./FormCreateCompany/ContactPhone";
import MajorsComponent from "./FormCreateCompany/Major";
import HeadQuarterAddress from "./FormCreateCompany/HeadQuarterAddress";
import SizeCompany from "./FormCreateCompany/SizeCompany";
import LocationsComponent from "../../../recruitment-campaigns/[id]/create_job/(components)/Location/LocationsComponent";
import FoundedYear from "./FormCreateCompany/FoundedYear";
import Introduction from "./FormCreateCompany/Introduction";
import { Button } from "@/components/ui/button";
import { CompanyFormUpdateValues } from "./CompanyInfo";
import ImageUpload from "./ImageUpload";
type Props = {
  form: any;
  onSubmit: (values: CompanyFormUpdateValues) => void;
  setLogoImage: Dispatch<SetStateAction<File[]>>;
  removeItem: (field: keyof CompanyFormUpdateValues, value: string) => void;
  setBannerImage: Dispatch<SetStateAction<File[]>>;
  preCover: string;
  setPreCover: React.Dispatch<React.SetStateAction<string>>;
};
const FormUpdate = ({
  form,
  onSubmit,
  setLogoImage,
  removeItem,
  preCover,
  setPreCover,
  setBannerImage,
}: Props) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 border p-2 w-full"
      >
        <ImageUpload
          form={form}
          setLogoImage={setLogoImage}
          setBannerImage={setBannerImage}
          setPreCover={setPreCover}
          preCover={preCover}
        />
        <div className="grid grid-cols-2 gap-x-6 gap-y-3">
          <Website form={form} />
          <ContactEmail form={form} />
          <ContactPhone form={form} />
          <MajorsComponent form={form} removeItem={removeItem} />
          <HeadQuarterAddress form={form} />
          <LocationsComponent form={form} />
          <div className="col-span-2">
            <Introduction form={form} />
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

export default FormUpdate;
