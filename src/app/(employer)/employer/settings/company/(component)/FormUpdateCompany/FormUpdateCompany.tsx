import { getBusinessInfomation } from "@/queries/queries";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  CompanyFormValues,
  companySchema,
} from "../FormCreateCompany/FormCreateCompany";
import FormCompany from "../FormCreateCompany/FormCompany";
import { toast } from "sonner";
import { useMutationHook } from "@/hooks/useMutationHook";
import { UpdateBusinessVerify } from "@/services/company";
import { Badge } from "@/components/ui/badge";

const FormUpdateCompany = () => {
  const { data: bussinesInfo } = getBusinessInfomation();
  const [files, setFiles] = useState<File[]>([]);
  const [logoImage, setLogoImage] = useState<File[]>([]);
  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      companyName: "",
      taxCode: "",
      shortName: "",
      website: "",
      headQuarterAddress: "",
      logo: "",
      contactEmail: "",
      contactPhone: "",
      foundedYear: "",
      size: "",
      introduction: "",
      LocationId: "",
      major: [],
      RegistrationFile: "",
    },
  });
  const onSuccess = (data: any) => {
    toast.success("Cập nhật tin thành công");
  };
  const onError = (errors: any) => {
    console.log(errors);
  };
  const mutation = useMutationHook(
    (data: FormData) => UpdateBusinessVerify(data),
    onSuccess,
    onError
  );
  const onSubmit = (values: CompanyFormValues) => {
    const formData = new FormData();
    formData.append("companyName", values.companyName);
    formData.append("taxCode", values.taxCode);
    formData.append("shortName", values.shortName);
    formData.append("LocationId", values.LocationId);
    formData.append("website", values.website);
    formData.append("headQuarterAddress", values.headQuarterAddress);
    formData.append("contactEmail", values.contactEmail);
    formData.append("contactPhone", values.contactPhone);
    formData.append("foundedYear", values.foundedYear);
    formData.append("size", values.size);
    formData.append("introduction", values.introduction);
    formData.append("businessVerified", "true");
    values.major.forEach((major) => formData.append("majorIds[]", major));
    if (logoImage && logoImage.length > 0) {
      formData.append("logo", logoImage[0]);
    }
    if (files && files.length > 0) {
      files.forEach((file) => {
        formData.append("RegistrationFile", file);
      });
    } else if (values.RegistrationFile) {
      formData.append("RegistrationFile", values.RegistrationFile);
    }
    mutation.mutate(formData);
  };
  const removeItem = (field: keyof CompanyFormValues, value: string) => {
    const current = form.getValues(field) as string[];

    form.setValue(
      field,
      current.filter((item) => item !== value)
    );
  };
  useEffect(() => {
    if (bussinesInfo) {
      form.reset({
        companyName: bussinesInfo?.company?.companyName || "",
        taxCode: bussinesInfo?.company?.taxCode || "",
        shortName: bussinesInfo?.company?.shortName || "",
        website: bussinesInfo?.company?.website || "",
        headQuarterAddress: bussinesInfo?.company?.headQuarterAddress || "",
        logo:
          `${process.env.NEXT_PUBLIC_API_URL_IMAGE}${bussinesInfo?.company?.logo}` ||
          "",
        contactEmail: bussinesInfo?.company?.contactEmail || "",
        contactPhone: bussinesInfo?.company?.contactPhone || "",
        foundedYear: bussinesInfo?.company?.foundedYear.toString() || "",
        size: bussinesInfo?.company?.size.toString() || "",
        introduction: bussinesInfo?.company?.introduction || "",
        LocationId: bussinesInfo?.company?.location?.id || "",
        major: bussinesInfo?.company?.majors.map((major) => major.id) || [],
        RegistrationFile: bussinesInfo?.company?.registrationFile?.name || "",
      });
    }
  }, [bussinesInfo, form]);
  return (
    <div>
      {bussinesInfo?.company?.status === 0 && (
        <Badge className="bg-yellow-500 w-fit mb-2 ">Đang chờ duyệt</Badge>
      )}
      {bussinesInfo?.company?.status === 1 && (
        <Badge className="bg-green-500 w-fit mb-2">Đã xác thực</Badge>
      )}
      {bussinesInfo?.company?.status === 2 && (
        <div className="flex items-center gap-2 mb-2">
          <Badge className="bg-red-500 w-fit">Bị từ chối</Badge>
          <div>
            {bussinesInfo?.company?.status === 2 &&
              !!bussinesInfo?.company.rejectReason && (
                <div className="flex items-center gap-2 text-sm">
                  <p className="text-sm">Lý do từ chối:</p>
                  <p className="text-sm">{bussinesInfo.company.rejectReason}</p>
                </div>
              )}
          </div>
        </div>
      )}
      <FormCompany
        form={form}
        files={files}
        onSubmit={onSubmit}
        setFiles={setFiles}
        setLogoImage={setLogoImage}
        removeItem={removeItem}
      />
    </div>
  );
};

export default FormUpdateCompany;
