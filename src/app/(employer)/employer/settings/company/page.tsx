"use client";
import React from "react";
import TabCreateCompany from "./(component)/TabCreateCompany";
import { useAuthStore } from "@/store/UserStore";
import CompanyInfo from "./(component)/CompanyInfo";

const CompanyPage = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="p-2">
      {!user?.verificationSubmitted ? <TabCreateCompany /> : <CompanyInfo />}
    </div>
  );
};

export default CompanyPage;
