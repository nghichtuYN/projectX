import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import TittleComponent from "./TittleComponent";
import AddressComponent from "./AddressComponent";
import EducationLevelComponent from "./EducationLevelComponent";
import JobTypeComponent from "./JobTypes/JobTypesComponent";
import JobLevelComponent from "./JobLevels/JobLevelsComponent";
import ContractTypeComponent from "./ContractType/ContractsTypeComponent";
import SkillComponent from "./Skill/SkillsComponent";
import SalaryComponent from "./SalaryComponent";
import DescriptionComponent from "./DescriptionComponent";
import ExperienceComponent from "./ExperienceComponent";
import JDComponent from "./JDComponent";
import MajorsComponent from "./Major/MajorsComponent";
import LocationsComponent from "./Location/LocationsComponent";
import QuantityComponent from "./QuantityComponent";
import { UseMutationResult } from "@tanstack/react-query";
import { JobFormValues, jobSchema } from "./FormCreateJobComponent";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import HighLightStart from "./HighLightStart";
import HighLightEnd from "./HighLightEnd";
import TabContentApplyCv from "../../(components)/TabApllicaton/TabContentApplyCv";
import { usePathname } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import LabelComponent from "./Labels/LabelComponent";
import PaymentMethod from "./PaymentMethod";
type Props = {
  form: any;
  removeItem: (field: keyof JobFormValues, value: string) => void;
  mutation: UseMutationResult<any, unknown, any, unknown>;
  onSubmit: (values: z.infer<typeof jobSchema>) => void;
  title: string;
  content: string;
};
const FormJob = ({
  form,
  removeItem,
  mutation,
  onSubmit,
  content,
  title,
}: Props) => {
  const pathName = usePathname();
  console.log(form.getValues("labels"))
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="w-full shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex justify-between">
              {title}
              <Button
                type="submit"
                size="lg"
                className="px-8"
                disabled={mutation?.isPending}
              >
                {mutation?.isPending ? (
                  <>
                    <Loader2 className="animate-spin mr-2 w-4 h-4" />
                    Đang xử lý...{" "}
                  </>
                ) : (
                  content
                )}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion
              type="multiple"
              defaultValue={["item-1", "item-3"]}
              className="w-full space-y-4"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <h3 className="text-lg font-medium">Thông tin cơ bản</h3>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <TittleComponent form={form} />
                      <AddressComponent form={form} />
                      <div className="flex items-center gap-2 w-full">
                        <HighLightStart form={form} />
                        <HighLightEnd form={form} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <LocationsComponent form={form} />
                      <MajorsComponent form={form} />
                      <QuantityComponent form={form} />
                      <ExperienceComponent form={form} />
                      <div className="col-span-2">
                        <EducationLevelComponent form={form} />
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  <h3 className="text-lg font-medium">Chi tiết công việc</h3>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <DescriptionComponent form={form} />
                      <JDComponent form={form} />
                    </div>
                    <div className="space-y-4">
                      <SalaryComponent form={form} />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <JobTypeComponent form={form} removeItem={removeItem} />
                        <JobLevelComponent
                          form={form}
                          removeItem={removeItem}
                        />
                        <SkillComponent form={form} removeItem={removeItem} />
                        <ContractTypeComponent
                          form={form}
                          removeItem={removeItem}
                        />
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>
                  <h3 className="text-lg font-medium">
                    Nâng cấp tin tuyển dụng
                  </h3>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <LabelComponent form={form} removeItem={removeItem} />
                    {form.getValues("labels").length >0 && (
                      <PaymentMethod form={form} />
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
              {pathName.includes("edit_job") && (
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    <h3 className="text-lg font-medium">Danh sách ứng viên</h3>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="border">
                      <TabContentApplyCv />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
            {/* <div className="space-y-4"></div> */}
          </CardContent>
        </Card>
      </form>
    </Form>
  );
};

export default FormJob;
