import React from "react";
import LogoUpload from "./FormCreateCompany/LogoUpload";
import FormCreateCompany from "./FormCreateCompany/FormCreateCompany";
import { Pencil } from "lucide-react";

const TabCreateCompany = () => {
  return (
    <>
      <div className="flex items-center gap-2 mb-2">
        <Pencil className="w-5 h-5 text-secondaryColor" />
        <p className="text-lg font-bold">Điền thông tin công ty</p>
      </div>
      <div className="container flex flex-col  gap-4 mt-8 px-3">
        <FormCreateCompany />
      </div>
    </>
  );
};

export default TabCreateCompany;
