"use client";
import React from "react";
import TabCreateCompany from "./(component)/TabCreateCompany";
import { Pencil } from "lucide-react";

const CompanyPage = () => {
  return (
    <div className="p-2">
      <div className="flex items-center gap-2 mb-2">
        <Pencil className="w-5 h-5 text-secondaryColor" />
        <p className="text-lg font-bold">Điền thông tin công ty</p>
      </div>
      <TabCreateCompany />
    </div>
  );
};

export default CompanyPage;
