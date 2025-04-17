import { companyExample } from "@/data/companyExample";
import React from "react";
import CompanyComponent from "./CompanyComponent";

const ListCompanyComponent = () => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {companyExample?.map((company) => (
        <CompanyComponent key={company.id} company={company} />
      ))}
    </div>
  );
};

export default ListCompanyComponent;
