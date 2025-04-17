"use client";
import React from "react";
import EmployerSidebaHeaderComponent from "@/components/EmployerSidebaHeaderComponent";
import FormCreateJobComponent from "./(components)/FormCreateJobComponent";
import { useParams } from "next/navigation";
import { getDetailCampaigns } from "@/queries/queries";

const CreateJobPage = () => {
  const param = useParams();
  const id = param.id as string | undefined;
  if (!id) {
    return <div>Campaign ID không hợp lệ</div>;
  }
  const { data: campaign } = getDetailCampaigns(id);
  return (
    <>
      <EmployerSidebaHeaderComponent>
        <div className="flex w-full items-center ">
          <p className="text-lg font-semibold text-secondaryColor">
            Tạo tin tuyển dụng chiến dịch: {campaign?.name}
          </p>
        </div>
      </EmployerSidebaHeaderComponent>
      <div className="mt-14 pl-8 pr-8 w-full">
        <p className="text-lg font-semibold p-3">Điền thông tin tuyển dụng </p>
        <div className="p-3">
          <FormCreateJobComponent />
        </div>
      </div>
    </>
  );
};

export default CreateJobPage;
