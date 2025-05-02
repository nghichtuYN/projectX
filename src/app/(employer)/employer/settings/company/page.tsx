"use client";
import React from "react";
import TabCreateCompany from "./(component)/TabCreateCompany";
import { useAuthStore } from "@/store/UserStore";
import TabEditCompany from "./(component)/FormUpdateCompany/TabEditCompany";
import CompanyInfo from "./(component)/CompanyInfo";

const CompanyPage = () => {
  const user = useAuthStore((state) => state.user);
  console.log(!user?.verificationSubmitted && !user?.recruiterVerified);
  return (
    <div className="p-2">
      {user?.verificationSubmitted && !user?.recruiterVerified && (
        <TabEditCompany />
      )}
      {!user?.verificationSubmitted && !user?.recruiterVerified && (
        <TabCreateCompany />
      )}
      {user?.verificationSubmitted && user?.recruiterVerified && (
        <CompanyInfo />
      )}
    </div>
  );
};

export default CompanyPage;
