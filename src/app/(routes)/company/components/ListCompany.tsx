import React from "react";
import CompanyCard from "./CompanyCard";
import { getAllCompany } from "@/queries/queries";
type Props = {
  search: string;
  pageSize: number;
};
const ListCompany = ({ search, pageSize }: Props) => {
  const { data: companies } = getAllCompany(search, pageSize, 1);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {companies && companies?.items?.map((company) => (
        <CompanyCard
          key={company?.id}
          id={company?.id}
          logo={`${process.env.NEXT_PUBLIC_API_URL_IMAGE}${company?.logo}`}
          image={
            `${process.env.NEXT_PUBLIC_API_URL_IMAGE}/${company?.cover}` ||
            "./default.png"
          }
          name={company?.companyName}
          description={company?.introduction}
          bgColor="bg-red-500"
        />
      ))}
    </div>
  );
};

export default ListCompany;
