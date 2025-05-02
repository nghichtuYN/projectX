import { Card } from "@/components/ui/card";
import { listSizeCompany } from "@/data/SizeCompany";
import { getCompany } from "@/queries/queries";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormUpdate from "./FormUpdate";
export const companySchema = z.object({
  companyName: z.string().min(1, "Tên công ty không được để trống"),
  taxCode: z.string().min(1, "Mã số thuế không được để trống"),
  shortName: z.string().min(1, "Tên chi nhánh là bắt buộc"),
  website: z.string(),
  headQuarterAddress: z.string().min(1, "Địa chỉ không được để trống"),
  logo: z.string(),
  contactEmail: z
    .string()
    .nonempty("Email không được để trống")
    .email("Email không hợp lệ"),
  foundedYear: z.string().min(1, "Địa chỉ văn phòng là bắt buộc"),
  size: z.string().nonempty("Quy mô không được để trống"),
  introduction: z.string(),
  LocationId: z.string().nonempty("Thành phố không được để trống"),
  major: z.array(z.string()).min(1, "Phải có ít nhất một kỹ năng"),
  contactPhone: z
    .string()
    .regex(/^[0-9]{10,11}$/, "Số điện thoại không hợp lệ"),
});
export type CompanyFormUpdateValues = z.infer<typeof companySchema>;
const CompanyInfo = () => {
  const { data: bussinesInfo } = getCompany();
  const [cover, setCover] = useState<File[]>([]);
  const [preCover, setPreCover] = useState("");
  const [logoImage, setLogoImage] = useState<File[]>([]);
  const form = useForm<CompanyFormUpdateValues>({
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
    },
  });
  useEffect(() => {
    if (bussinesInfo) {
      form.reset({
        companyName: bussinesInfo?.companyName || "",
        taxCode: bussinesInfo?.taxCode || "",
        shortName: bussinesInfo?.shortName || "",
        website: bussinesInfo?.website || "",
        headQuarterAddress: bussinesInfo?.headQuarterAddress || "",
        logo:
          `${process.env.NEXT_PUBLIC_API_URL_IMAGE}${bussinesInfo?.logo}` || "",
        contactEmail: bussinesInfo?.contactEmail || "",
        contactPhone: bussinesInfo?.contactPhone || "",
        foundedYear: bussinesInfo?.foundedYear.toString() || "",
        size: bussinesInfo?.size.toString() || "",
        introduction: bussinesInfo?.introduction || "",
        LocationId: bussinesInfo?.location?.id || "",
        major: bussinesInfo?.majors.map((major) => major.id) || [],
      });
      setPreCover(
        `${process.env.NEXT_PUBLIC_API_URL_IMAGE}${bussinesInfo?.cover}`
      );
    }
  }, [bussinesInfo, form]);
  const removeItem = (field: keyof CompanyFormUpdateValues, value: string) => {
    const current = form.getValues(field) as string[];

    form.setValue(
      field,
      current.filter((item) => item !== value)
    );
  };
  const onSubmit = (values: CompanyFormUpdateValues) => {};
  return (
    <Card className="grid grid-cols-2 gap-2 p-2 rounded-none">
      <div className="col-span-2 justify-between">
        <div className=" flex items-center gap-2">
          <Avatar className="w-14 h-14">
            <AvatarImage
              src={`${process.env.NEXT_PUBLIC_API_URL_IMAGE}${bussinesInfo?.logo}`}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="text-sm font-semibold leading-6">
              {bussinesInfo?.companyName}
            </p>
            <p className="text-sm font-medium leading-6 text-gray-600">
              {bussinesInfo?.headQuarterAddress} |
              {
                listSizeCompany?.find(
                  (size) => Number(size.value) === Number(bussinesInfo?.size)
                )?.label
              }
              nhân viên{" "}
            </p>
            {bussinesInfo?.status === 0 && (
              <Badge className="bg-yellow-500 w-fit ">Đang chờ duyệt</Badge>
            )}
          </div>
        </div>
      </div>

      <Separator className="my-4 col-span-2" />
      <div className="col-span-2">
        <FormUpdate
          preCover={preCover}
          setBannerImage={setCover}
          setPreCover={setPreCover}
          form={form}
          onSubmit={onSubmit}
          removeItem={removeItem}
          setLogoImage={setLogoImage}
        />
      </div>
    </Card>
  );
};

export default CompanyInfo;
