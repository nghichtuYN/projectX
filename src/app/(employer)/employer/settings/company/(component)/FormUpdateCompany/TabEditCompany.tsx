import { Pencil } from "lucide-react";
import FormUpdateCompany from "./FormUpdateCompany";

const TabEditCompany = () => {
  return (
    <>
      <div className="flex items-center gap-2">
        <Pencil className="w-5 h-5 text-secondaryColor" />
        <p className="text-lg font-bold">Xác thực lại công ty</p>
      </div>
      <div className="container flex flex-col  gap-4 mt-8 px-3">
        <FormUpdateCompany />
      </div>
    </>
  );
};

export default TabEditCompany;
